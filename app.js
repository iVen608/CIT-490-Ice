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

const checkEmpty = function(obj, optionalKeys){
  var ret = true;
  Object.keys(obj).forEach(key => {
    if(obj[key] === '' && !optionalKeys.includes(key)){
      console.log(`[${key}] is empty`);
      ret = false;
    }
  })
  return ret;
}

const checkKeys = function(obj, keys){
  const keyArray = Object.keys(obj);
  if(keyArray.length() !== keys.length()){
    return false;
  }
  keys.forEach(key => {
    if(!keyArray.includes(key)){
      return false;
    }
  });
  return true;
}

const validateFloat = function(obj, keys){
  keys.forEach(key => {
    try{
      if(obj[key] === ""){ //ice2 optional case
        return true;
      }
      if(parseFloat(obj[key]) !== NaN){
        return true;
      }
    }catch(err){
      return false;
    }
  })
}

app.post("/customer/", async (req, res) => {
  try{
    
    console.log(req.body);
    const checkEmptyResponse = checkEmpty(req.body, ["ice2", "price2", "rami", "equipment", "job", "po"]);
    console.log(checkEmptyResponse);
    if(checkEmptyResponse === false){
      console.log("err");
      throw Error("Empty response");
      
    }
    res.sendStatus(200);
    /*const _db = await mongo.connect().db('ice').collection("customers");
  _ db.insertOne(req.body).then(result => res.sendStatus(201)).catch(err => res.sendStatus(400));*/
  }catch(err){
    console.log(err)
    res.sendStatus(400);
  }
  
})

mongo.initialize();