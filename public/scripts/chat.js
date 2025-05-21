const chatBox = document.getElementById("chatBox");

function sendMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value;
  if (!msg) return;
  const bubble = document.createElement("div");
  bubble.innerText = `${localStorage.getItem("username")}: ${msg}`;
  chatBox.appendChild(bubble);
  input.value = "";
}
