const express = require("express");
const cors = require("cors");
const path = require('path');
const mongo = require("./connect");
const bodyParser = require("body-parser");

const port = process.env.port || 4000;

const app = express();
app.listen(port, () => {console.log(`Listening on ${port}`)});

app.use(cors(
  {origin: ["http://localhost:3000", "https://cit490front.onrender.com"]}
));

app.use(bodyParser.json());

app.get("/api-docs", async (req, res) => {
    //res.set("Access-Control-Allow-Origin", "http://localhost:3000")
    const _db = await mongo.connect().db('ice').collection("customers").find();
    const result = await _db.toArray();
    res.status(200).json(result);
  });

app.get("/customer/:id", async (req, res) => {
  //res.set("Access-Control-Allow-Origin", "http://localhost:3000")
  const _db = await mongo.connect().db('ice').collection("customers").find();
  const result = await _db.toArray();
  const filtered = result.filter(customer => customer._id.toString() == req.params.id);
  res.status(200).json(filtered);
});

app.post("/customer/", async (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
  /*const _db = await mongo.connect().db('ice').collection("customers");
  _db.insertOne(req.body).then(result => res.sendStatus(201)).catch(err => res.sendStatus(400));*/
})

mongo.initialize();