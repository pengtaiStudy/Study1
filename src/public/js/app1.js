//This socket means the connection to the server.
const backSocket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}


function handleOpen() {
    console.log("Connected to Server ✅");  // window + ; for inserting emoji.
}

backSocket.addEventListener("open", handleOpen);

backSocket.addEventListener("message",(message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

backSocket.addEventListener("close", () =>{
    console.log("Diconnected from Server ❌");
});


function handleSubmit(event) {
    event.preventDefault();
    const input =messageForm.querySelector("input");
    backSocket.send(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You : ${input.value}`;
    messageList.append(li);
    input.value="";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    backSocket.send(makeMessage("nickname", input.value));
    input.value="";
};

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);


/*
setTimeout(()=> {
    backSocket.send("hello from the browser!");
}, 10000);
*/