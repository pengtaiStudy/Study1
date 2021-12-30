import express from "express";
import SocketIO from "socket.io";
import http from "http";
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
const wsServer = SocketIO(httpServer);
//const wss = new WebSocket.Server({ server });
//=> be able to use both http and websocket , not mandatory
//If you want to use only ws, then "const wss = new WebSocket.Server();"

wsServer.on("connection", (socket) => {
    //done is the second argument from front-end.
    socket.on("enter_room", (msg, done) => {
        console.log(msg);  //payload : input.value
        setTimeout(() =>{
            done();  // server is done! 을 출력하는 function -> frontend console 창에서 확인가능
        }, 10000); 
    });
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
       
       
