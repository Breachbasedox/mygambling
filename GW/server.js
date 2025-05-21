const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));

const authRoutes = require("./routes/auth");
const gemRoutes = require("./routes/gems");
const gameRoutes = require("./routes/games");
const adminRoutes = require("./routes/admin");

app.use("/api/auth", authRoutes);
app.use("/api/gems", gemRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/admin", adminRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bloxmoon is live on http://localhost:${PORT}`);
});
