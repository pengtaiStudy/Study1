const socket = io();
//io function automaticaaly look for the server running socket.io

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    console.log(input);
    //event, message, function -> sending 3 things.
    //we can send whatever we want. It doesn't have to only be string.
    socket.emit("enter_room", { payload: input.value }, () =>{
        console.log("server is done!");
    });
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);