const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/users.json");

function getUsers() {
  return JSON.parse(fs.readFileSync(dbPath));
}

function saveUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

router.post("/coinflip", (req, res) => {
  const { username, bet } = req.body;
  const users = getUsers();

  if (!users[username] || users[username].gems < bet) {
    return res.status(400).json({ error: "Not enough gems" });
  }

  const win = Math.random() < 0.5;
  users[username].gems += win ? bet : -bet;
  saveUsers(users);

  res.json({ result: win ? "win" : "lose", gems: users[username].gems });
});

router.post("/dice", (req, res) => {
  const { username, bet } = req.body;
  const users = getUsers();

  if (!users[username] || users[username].gems < bet) {
    return res.status(400).json({ error: "Not enough gems" });
  }

  const roll = Math.ceil(Math.random() * 6);
  const win = roll === 6;

  if (win) users[username].gems += bet * 5;
  else users[username].gems -= bet;

  saveUsers(users);
  res.json({ roll, result: win ? "win" : "lose", gems: users[username].gems });
});

module.exports = router;
