function playCoinflip() {
  const bet = parseInt(document.getElementById("bet").value);
  fetch("/api/games/coinflip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: localStorage.getItem("username"), bet })
  })
  .then(res => res.json())
  .then(data => {
    alert("Result: " + data.result);
    document.getElementById("balance").innerText = "Gems: " + data.gems;
  });
}

function playDice() {
  const bet = parseInt(document.getElementById("bet").value);
  fetch("/api/games/dice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: localStorage.getItem("username"), bet })
  })
  .then(res => res.json())
  .then(data => {
    alert("You rolled a " + data.roll + ". " + data.result);
    document.getElementById("balance").innerText = "Gems: " + data.gems;
  });
}
