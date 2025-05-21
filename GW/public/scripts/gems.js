function claimGems() {
  fetch("/api/gems/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: localStorage.getItem("username") })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    document.getElementById("balance").innerText = "Gems: " + data.gems;
  });
}
