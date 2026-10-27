const express = require("express");
const app = express();
app.use(express.json());

let data = "Initial Data";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Get the data from the server
app.get("/getData", (req, res) => {
  res.send({
    data,
  });
});

//We can use put /post to update this is just showcase of it
app.get("/updateData", (req, res) => {
  data = "Updated data";
  res.send({
    data,
  });
});

app.listen(3000, () => console.log("App running on port 3000"));
