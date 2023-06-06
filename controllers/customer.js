const mongo = require("../connect");
const mongodb = require("mongodb");
const lib = require("../library/library");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (token) => {
    try{
        console.log(token);
        jwt.verify(token, process.env.SECRETKEY);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

async function getAllCustomers(req, res){
    try{
        const verification = verifyToken(req.cookies.Name);
        if(!verification){
            throw Error("Verification failed");
        }
        const searchQuery = req.query.search;
        const _db = await mongo.connect().db('ice').collection("customers").find();
        const result = await _db.toArray();
        //console.log(searchQuery);
        if(searchQuery){
            const filter = result.filter(v =>  {
            if(v['name']){
                return v['name'].toString().toLowerCase().includes(searchQuery);
            }else{
                return false;
            }
            });
            res.header("Access-Control-Allow-Credentials", true).status(200).json(filter);
        }else{
            //console.log(result);
            res.status(200).json(result);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
};

async function getSingleCustomer(req, res){
    try{
        const _db = await mongo.connect().db('ice').collection("customers").find();
        const result = await _db.toArray();
        const filtered = result.filter(customer => customer._id.toString() == req.params.id);
        res.status(200).json(filtered);
    }catch(err){
        res.sendStatus(404);
    }
}

async function postCustomer(req, res) {
    try{
        const checkEmptyResponse = lib.checkEmpty(req.body, ["ice2", "price2", "rami", "equipment", "job", "po"]);
        const checkKeysResponse = lib.checkKeys(req.body, ["name","address","ice1","ice2","price1","price2","tax","delivery","po","job","rami","equipment"], 0);
        const validateFloatResponse = lib.validateFloat(req.body, ["ice1", "ice2", "price1", "price2"]);
        if(checkEmptyResponse === false){
            throw Error("Empty response");
            
        }else if(checkKeysResponse === false){
            throw Error("Missing keys");
        }else if(validateFloatResponse === false){
            throw Error("Incorrect data type for float fields");
        }
        const _db = await mongo.connect().db('ice').collection("customers");
        _db.insertOne(req.body).then(result => res.sendStatus(204)).catch(err => res.sendStatus(404));
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    } 
}

async function updateCustomer(req, res) {
    try{
        const object_id = new mongodb.ObjectId(req.params.id);
        const checkEmptyResponse = lib.checkEmpty(req.body, ["ice2", "price2", "rami", "equipment", "job", "po"]);
        const checkKeysResponse = lib.checkKeys(req.body, ["name","address","ice1","ice2","price1","price2","tax","delivery","po","job","rami","equipment"], 1);
        const validateFloatResponse = lib.validateFloat(req.body, ["ice1", "ice2", "price1", "price2"]);
        if(checkEmptyResponse === false){
            throw Error("Empty response");
            
        }else if(checkKeysResponse === false){
            throw Error("Missing keys");
        }else if(validateFloatResponse === false){
            throw Error("Incorrect data type for float fields");
        }
        const _db = await mongo.connect().db('ice').collection("customers");
        _db.updateOne({_id: object_id}, {$set: {
            name: req.body.name,
            address: req.body.address,
            ice1: req.body.ice1,
            ice2: req.body.ice2,
            price1: req.body.price1,
            price2: req.body.price2,
            tax: req.body.tax,
            delivery: req.body.delivery,
            po: req.body.po,
            job: req.body.job,
            rami: req.body.rami,
            equipment: req.body.equipment
        }}).then(result => res.sendStatus(201)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(400);
    } 
}

async function deleteCustomer(req, res) {
    try{
        const object_id = new mongodb.ObjectId(req.params.id);
        const checkEmptyResponse = lib.checkEmpty(req.body, ["ice2", "price2", "rami", "equipment", "job", "po"]);
        if(checkEmptyResponse === false){
            console.log("err");
            throw Error("Empty response");
            
        }
        const _db = await mongo.connect().db('ice').collection("customers");
        _db.deleteOne({_id: object_id}).then(result => res.sendStatus(204)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(400);
    } 
}

module.exports = {getAllCustomers, getSingleCustomer, postCustomer, deleteCustomer, updateCustomer}