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

router.post("/claim", (req, res) => {
  const { username } = req.body;
  const now = Date.now();
  const users = getUsers();

  if (!users[username]) return res.status(400).send("Invalid user");

  const last = users[username].lastClaim || 0;
  if (now - last < 86400000) {
    return res.status(403).json({ message: "Already claimed today" });
  }

  users[username].gems += 50;
  users[username].lastClaim = now;
  saveUsers(users);

  res.json({ message: "Claimed 50 gems", gems: users[username].gems });
});

module.exports = router;
