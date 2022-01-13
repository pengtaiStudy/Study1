const socket = io();
//io function automaticaaly look for the server running socket.io

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;

function addMessage(message){
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You:${input.value}`);
    });
    input.value="";
}


function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nickname", input.value);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
<<<<<<< HEAD
    console.log(input);
    //event, message, function -> sending 3 things.
    //we can send whatever we want. It doesn't have to only be string.
    socket.emit("enter_room", { payload: input.value }, () =>{
        console.log("server is done!");
    });
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
=======
    //event, message, function -> sending 3 things.
    //we can send whatever we want. It doesn't have to only be string.
    const value = input.value;
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} arrived!`);
})

socket.on("bye", (left, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${left} left!`);
})

//socket.on("new_message",(msg)=> {addMessage(msg)});
socket.on("new_message",addMessage);

socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector("ul");
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    })
});
>>>>>>> 786cfd39bbfa8774044d4c19d919e49084050ee0
