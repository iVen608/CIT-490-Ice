const mongo = require("../connect");
const mongodb = require("mongodb");
const lib = require("../library/library");

const { all } = require("axios");
require('dotenv').config();
const optional_parameters = ["ice2", "price2", "rami", "equipment", "job", "po", "special"];
const all_parameters = ["name","address", "city", "zip","ice1","ice2","price1","price2","tax","delivery","po","job","rami","equipment", "special"];
const float_parameters = ["ice1", "ice2", "price1", "price2"];


async function getAllCustomers(req, res){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
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
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        const _db = await mongo.connect().db('ice').collection("customers").find();
        const result = await _db.toArray();
        const filtered = result.filter(customer => customer._id.toString() == req.params.id);
        res.status(200).json(filtered);
    }catch(err){
        res.sendStatus(404);
    }
}

async function getCustomerHistory(req, res){
    try{
        const token = req.headers.authorization.split(' ')[1];
        console.log("a")
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        console.log("b")
        const count = req.query.count;
        const customer_id = req.params.id;
        const _db = await mongo.connect().db('ice').collection("deliveries").find( {"customer_id": customer_id}).toArray();
        const sorted = _db.sort((a,b) => {
            const date_a = new Date(a.d);
            const date_b = new Date(b.d);
            if(date_a > date_b){
                return 1;
            }else if(date_a < date_b){
                return -1;
            }
            return 0;
        });
        console.log(count);
        const requestedDeliveries = sorted.reverse().slice(0, count);
        console.log(requestedDeliveries);
        res.status(200).json(requestedDeliveries);
    }catch(err){
        res.sendStatus(404);
    }
}

async function postCustomer(req, res) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        console.log(req.headers)
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        const checkEmptyResponse = lib.checkEmpty(req.body, optional_parameters);
        const checkKeysResponse = lib.checkKeys(req.body, all_parameters, 0);
        const validateFloatResponse = lib.validateFloat(req.body, float_parameters);
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
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        const object_id = new mongodb.ObjectId(req.params.id);
        const checkEmptyResponse = lib.checkEmpty(req.body, optional_parameters);
        const checkKeysResponse = lib.checkKeys(req.body, all_parameters, 1);
        const validateFloatResponse = lib.validateFloat(req.body, float_parameters);
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
            city: req.body.city,
            zip: req.body.zip,
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
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        const object_id = new mongodb.ObjectId(req.params.id);
        const _db = await mongo.connect().db('ice').collection("customers");
        _db.deleteOne({_id: object_id}).then(result => res.sendStatus(204)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(400);
    } 
}

module.exports = {getAllCustomers, getSingleCustomer, getCustomerHistory, postCustomer, deleteCustomer, updateCustomer}