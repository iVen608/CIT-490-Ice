const mongo = require("../connect");
const mongodb = require("mongodb");
const lib = require("../library/library");

async function getAllCustomers(req, res){
    const _db = await mongo.connect().db('ice').collection("customers").find();
    const result = await _db.toArray();
    res.status(200).json(result);
};

async function getSingleCustomer(req, res){
    const _db = await mongo.connect().db('ice').collection("customers").find();
    const result = await _db.toArray();
    const filtered = result.filter(customer => customer._id.toString() == req.params.id);
    res.status(200).json(filtered);
}

async function postCustomer(req, res) {
    try{
      const checkEmptyResponse = lib.checkEmpty(req.body, ["ice2", "price2", "rami", "equipment", "job", "po"]);
      if(checkEmptyResponse === false){
        console.log("err");
        throw Error("Empty response");
        
      }
      //res.sendStatus(200);
      const _db = await mongo.connect().db('ice').collection("customers");
      _db.insertOne(req.body).then(result => res.sendStatus(204)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(404);
    } 
}

async function updateCustomer(req, res) {
    try{
        const object_id = new mongodb.ObjectId(req.params.id);
        const checkEmptyResponse = lib.checkEmpty(req.body, ["ice2", "price2", "rami", "equipment", "job", "po"]);
        if(checkEmptyResponse === false){
            console.log("err");
            throw Error("Empty response");
            
        }
        //res.sendStatus(200);
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
        //res.sendStatus(200);
        const _db = await mongo.connect().db('ice').collection("customers");
        _db.deleteOne({_id: object_id}).then(result => res.sendStatus(204)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(400);
    } 
}

module.exports = {getAllCustomers, getSingleCustomer, postCustomer, deleteCustomer, updateCustomer}