let username = localStorage.getItem("username");

if (!username) {
  username = prompt("Enter your username:");
  localStorage.setItem("username", username);
}

fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username })
})
.then(res => res.json())
.then(data => {
  document.getElementById("welcome").innerText = "Welcome, " + data.username;
  document.getElementById("balance").innerText = "Gems: " + data.gems;
});
