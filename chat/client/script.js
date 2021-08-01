const socket = io();
var user;
socket.on("id", (id) => {
  user = id;
});

socket.on("msg", (msg) => {
  console.log(msg);
  loadMessage(msg);
});

socket.on("newUser", (user) => {
    div = document.createElement("div");
    div.innerHTML = `<strong>${user}</strong> has joined the room.`;
    div.classList.add("center");
    document.querySelector(".msgs").appendChild(div);
    document
      .querySelector(".msgs")
      .scrollBy(0, document.querySelector(".msgs").scrollHeight);
});

const loadMessage = ({ sender, message }) => {
  div = document.createElement("div");
  div.innerHTML = message;
  if (sender == user){
      div.classList.add("right");
    }
    else{
        div.innerHTML = `<strong>${sender}</strong> ` + div.innerHTML
    }
  document.querySelector(".msgs").appendChild(div);
  document
    .querySelector(".msgs")
    .scrollBy(0, document.querySelector(".msgs").scrollHeight);
};


init = true;
document.querySelector(".input").addEventListener("submit", function () {
  if (init) {
    user = this.msg.value;
    document.querySelector("[sender]").innerHTML = user;
    this.msg.setAttribute("placeholder", "Write your message...");
    this.msg.value = "";
    socket.emit('newUser',user)
    init = false;
    return;
  }
  msg = { sender: user, message: this.msg.value };
  // loadMessage(msg)
  socket.emit("msg", msg);
  this.msg.value = "";
});
