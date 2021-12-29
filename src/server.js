import express from "express";
import WebSocket from "ws";
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

const handleListen = () => console.log(`Listening on http://localhost:3000`)

const server = http.createServer(app);   // create server
const wss = new WebSocket.Server({ server });
//=> be able to use both http and websocket , not mandatory
//If you want to use only ws, then "const wss = new WebSocket.Server();"


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

server.listen(3000, handleListen);

