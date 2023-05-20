const express = require("express");
const cors = require("cors");
const path = require('path');
const mongo = require("./connect");

const port = process.env.port || 4000;

const app = express();
app.listen(port, () => {console.log(`Listening on ${port}`)});

app.use(cors(
  {origin: ["http://localhost:3000", "https://cit490front.onrender.com"]}
));

app.get("/api-docs", async (req, res) => {
    //res.set("Access-Control-Allow-Origin", "http://localhost:3000")
    const _db = await mongo.connect().db().collection("customers").find();
    const result = await _db.toArray();
    res.status(200).json(result);
  });

app.get('home', (req, res) => {
res.sendFile(path.resolve(__dirname, './project/public', 'index.html'));
});

mongo.initialize();