import express from "express";
import {Server} from "socket.io";
import http from "http";
import { instrument } from "@socket.io/admin-ui";
//express supports http, but not ws.

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
//http version
//app.get("/", (req,res) =>res.render("home"));

//ws version
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);   // create server
const wsServer = new Server(httpServer, {
    cors: {
        origin : ["https://admin.socket.io"],
        credentials : true,
    },
});

instrument(wsServer, {
    auth :false,
});
//const wss = new WebSocket.Server({ server });
//=> be able to use both http and websocket , not mandatory
//If you want to use only ws, then "const wss = new WebSocket.Server();"
function publicRooms() {
    const {
      sockets: {
        adapter: { sids, rooms },
      },
    } = wsServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
      if (sids.get(key) === undefined) {
        publicRooms.push(key);
      }
    });
    return publicRooms;
  }

function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}
  
wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anon";
    socket.onAny((event) => {
    console.log(`Socket Event : ${event}`);
    })
    //done is the second argument from front-end.
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName)
        done();
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
        wsServer.sockets.emit("room_change", publicRooms());
    });

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) =>
            socket.to(room).emit("bye", socket.nickname, countRoom(room) -1)
            );
    });

    socket.on("disconnect", () =>{
        wsServer.sockets.emit("room_change", publicRooms());
    });

    socket.on("new_message", (msg, room, done)=> {
        socket.to(room).emit("new_message", `${socket.nickname} :${msg}`);
        done();
    })

    socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

/*
const sockets = [];
wss.on("connection", (frontSocket) => {
    sockets.push(frontSocket);
    frontSocket["nickname"] = "Anon";
    console.log("Connected to Browser ✔ ");
    frontSocket.on("close", () =>
    console.log("Disconnected from the Browser❌"));
    frontSocket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch(message.type) {
            case "new_message" :
                sockets.forEach( (aSocket) => aSocket.send(`${frontSocket.nickname} : ${message.payload}`));
                case "nickname" :
                    frontSocket["nickname"] = message.payload;
                }
            });
        });
        */
       
const handleListen = () => console.log(`Listening on http://localhost:3000`)
httpServer.listen(3000, handleListen);
       
<<<<<<< HEAD
       
=======
       
>>>>>>> 786cfd39bbfa8774044d4c19d919e49084050ee0
