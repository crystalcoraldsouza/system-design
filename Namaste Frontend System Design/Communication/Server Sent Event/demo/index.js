const express = require("express");
const { join } = require("node:path");
const app = express();
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
app.get("/sse", (req, res) => {
  // Required headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  // Send initial event
  res.write(`data: Connected to SSE\n\n`);
  // Send data every 5 sec
  const intervalId = setInterval(() => {
    const time = new Date().toLocaleTimeString();
    res.write(`data: Server Time: ${time}\n\n`);
  }, 5000);
  // Handle client disconnect
  req.on("close", () => {
    console.log("Client disconnected");
    clearInterval(intervalId);
    res.end();
  });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
