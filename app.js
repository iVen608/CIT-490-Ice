const express = require("express");
const cors = require("cors");
const path = require('path');

const port = process.env.port || 3000;

const app = express();

app.listen(port, () => {console.log(`Listening on ${port}`)});

app.use(express.static(path.resolve(__dirname, './project/build')));

app.get("/api-docs", (req, res) => {
    res.set("Access-Control-Allow-Origin", "https://http://localhost:3000/")
    res.json({ message: "API-DOC View" });
  });

app.get('home', (req, res) => {
res.sendFile(path.resolve(__dirname, './project/public', 'index.html'));
});