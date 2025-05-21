const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dbPath = path.join(__dirname, "../data/users.json");

function getUsers() {
  return JSON.parse(fs.readFileSync(dbPath));
}

function saveUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

router.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username required" });

  let users = getUsers();
  if (!users[username]) {
    users[username] = { gems: 0, lastClaim: 0 };
    saveUsers(users);
  }

  res.json({ username, gems: users[username].gems });
});

module.exports = router;
