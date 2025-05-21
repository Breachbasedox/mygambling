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

router.post("/give", (req, res) => {
  const { adminKey, username, amount } = req.body;
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(403).send("Invalid admin key");
  }

  const users = getUsers();
  if (!users[username]) return res.status(404).send("User not found");

  users[username].gems += amount;
  saveUsers(users);

  res.json({ message: "Gems added", gems: users[username].gems });
});

module.exports = router;
