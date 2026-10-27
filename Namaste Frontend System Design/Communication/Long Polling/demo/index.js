const express = require("express");
const app = express();
app.use(express.json());

let data = "Initial";

const waitingClientList = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  if (data !== req.query.lastData) {
    res.json({ data });
  } else {
    waitingClientList.push(res);
  }
});
app.get("/updateData", (req, res) => {
  data = req.query.data;
  while (waitingClientList.length > 0) {
    const client = waitingClientList.pop();
    client.json({ data });
  }
  res.json({ success: "Data updated successfully" });
});

app.listen(3000, () => console.log("App running on port 3000"));
