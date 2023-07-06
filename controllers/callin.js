const mongo = require("../connect");
const mongodb = require("mongodb");
const lib = require("../library/library");

async function getAllCallIns(req, res){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        const searchQuery = req.query.search;
        const _db = await mongo.connect().db('ice').collection("callin").find();
        const result = await _db.toArray();
        console.log(searchQuery);
        if(searchQuery){
            const filter = result.filter(v =>  {
            if(v['name']){
                return v['name'].toString().toLowerCase().includes(searchQuery);
            }else{
                return false;
            }
            });
            res.status(200).json(filter);
        }else{
            console.log(result);
            res.status(200).json(result);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
};

async function getSingleCallIn(req, res){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        const _db = await mongo.connect().db('ice').collection("callin").find();
        const result = await _db.toArray();
        const filtered = result.filter(customer => customer._id.toString() == req.params.id);
        res.status(200).json(filtered);
    }catch(err){
        res.sendStatus(404);
    }
}

async function postCallIn(req, res) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        const callIn = {
            name: req.body.name,
            address: req.body.address,
            customer_id: req.body.customer_id,
            callDate: req.body.callDate,
            serviceDate: req.body.serviceDate,
            instructions: req.body.instructions || "",
            completed: false,
        }
        console.log(callIn)
        const checkEmptyResponse = lib.checkEmpty(callIn, ["instructions"]);
        const checkKeysResponse = lib.checkKeys(callIn, ["name","address","customer_id","callDate","serviceDate", "instructions", "completed"], 0);

        if(checkEmptyResponse === false){
            throw Error("Empty response");
            
        }else if(checkKeysResponse === false){
            throw Error("Missing keys");
        }
        const _db = await mongo.connect().db('ice').collection("callin");
        _db.insertOne(callIn).then(result => res.sendStatus(204)).catch(err => {res.sendStatus(404); console.log(err)});
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    } 
}

async function updateCallIn(req, res) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        console.log(req.body.instructions);
        const object_id = new mongodb.ObjectId(req.params.id);
        const checkEmptyResponse = lib.checkEmpty(req.body, ["instructions"]);
        const checkKeysResponse = lib.checkKeys(req.body, ["name","address","customer_id","callDate","serviceDate","instructions", "completed"], 0);
        if(checkEmptyResponse === false){
            throw Error("Empty response");
            
        }else if(checkKeysResponse === false){
            throw Error("Missing keys");
        }
        const _db = await mongo.connect().db('ice').collection("callin");
        _db.updateOne({_id: object_id}, {$set: {
            name: req.body.name,
            address: req.body.address,
            customer_id: req.body.customer_id,
            callDate: req.body.callDate,
            serviceDate: req.body.serviceDate,
            instructions: req.body.instructions,
            completed: req.body.completed
        }}).then(result => res.sendStatus(201)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(400);
    } 
}

async function deleteCallIn(req, res) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verification = lib.verifyToken(token);
        if(!verification){
            throw Error("Verification failed");
        }
        const object_id = new mongodb.ObjectId(req.params.id);
        const _db = await mongo.connect().db('ice').collection("callin");
        _db.deleteOne({_id: object_id}).then(result => res.sendStatus(204)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(400);
    } 
}

module.exports = {getAllCallIns, getSingleCallIn, postCallIn, updateCallIn, deleteCallIn}