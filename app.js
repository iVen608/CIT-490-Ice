const express = require("express");
const path = require('path');

const port = process.env.port || 3000;

const app = express();

app.listen(port, () => {console.log(`Listening on ${port}`)});

app.use(express.static(path.resolve(__dirname, '../project/build')));
