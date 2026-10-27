const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
// Socket connection
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("chat-message", (msg) => {
    console.log("Message:", msg);
    io.emit("chat-message", msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
