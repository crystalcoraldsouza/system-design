import express from "express";
import { client } from "./client.js";
const app = express();
const PORT = 3005;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req, res) => res.json({ message: "Root is groot" }));
app.get("/customers", (req, res) => {
  client.getAll({}, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(response);
    }
  });
});

app.get("/customers", (req, res) => {
  client.getAll({}, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(response);
    }
  });
});

app.post("/create", (req, res) => {
  const { id, name, age, address } = req.body;
  client.insert({ id, name, age, address }, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(response);
    }
  });
});
app.post("/update", (req, res) => {
  const { id, name, age, address } = req.body;

  const updateCustomer = {
    id: id,
    name: name,
    age: age,
    address: address,
  };
  client.update(updateCustomer, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(response);
    }
  });
});
app.post("/remove", (req, res) => {
  client.remove({ id: req.body.customer_id }, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(response);
    }
  });
});
//more routes can be added here similarly for update and delete operations
app.listen(PORT, () => console.log(`Client Started at port ${PORT}`));
