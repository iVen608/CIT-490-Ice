const express = require("express");
const cors = require("cors");
const path = require('path');
const mongo = require("./connect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require ("./routes/router");

const port = process.env.port || 4000;

const app = express();
app.listen(port, () => {console.log(`Listening on ${port}`)});

app.use(cors(
  {origin: ["http://localhost:3000", "https://cit490front.onrender.com"], credentials: true, }
));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", router);

mongo.initialize();