const mongo = require("../connect");
const mongodb = require("mongodb");
const lib = require("../library/library");

async function getAllRoutes(req, res){
    try{
        const searchQuery = req.query.search;
        const _db = await mongo.connect().db('ice').collection("routes").find();
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

async function getSingleRoutes(req, res){
    try{
        const _db = await mongo.connect().db('ice').collection("routes").find();
        const result = await _db.toArray();
        const filtered = result.filter(route => route._id.toString() == req.params.id);
        res.status(200).json(filtered);
    }catch(err){
        res.sendStatus(404);
    }
}

async function postRoutes(req, res) {
    try{
        const callIn = {
            name: req.body.name,
            stops: req.body.stops
        }
        console.log(callIn)
        const checkKeysResponse = lib.checkKeys(callIn, ["name","stops"], 0);
        if(checkKeysResponse === false){
            throw Error("Missing keys");
        }
        const _db = await mongo.connect().db('ice').collection("routes");
        _db.insertOne(callIn).then(result => res.sendStatus(204)).catch(err => {res.sendStatus(404); console.log(err)});
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    } 
}

async function postCheckin(req, res){
    try{
        const object_id = new mongodb.ObjectId(req.params.id);
        console.log(req.body)
        const _routeDel = await mongo.connect().db('ice').collection("route_deliveries");
        const _deliveries = await mongo.connect().db('ice').collection("deliveries");
        const res1 =  await _routeDel.insertOne(req.body);
        req.body.delivered.forEach(element => {
            _deliveries.insertOne({customer_id: element._id, delivered: element.delivered, delivered2: element.delivered2});
        });
        /*const checkKeysResponse = lib.checkKeys(callIn, ["name","stops"], 0);
        if(checkKeysResponse === false){
            throw Error("Missing keys");
        }
        const _db = await mongo.connect().db('ice').collection("routes");
        _db.insertOne(callIn).then(result => res.sendStatus(204)).catch(err => {res.sendStatus(404); console.log(err)});*/
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }  
}

async function updateRoutes(req, res) {
    try{
        console.log(req.body);
        console.log(req.params.id);
        const object_id = new mongodb.ObjectId(req.params.id);
        const checkKeysResponse = lib.checkKeys(req.body, ["name","stops"], 0);
        if(checkKeysResponse === false){
            throw Error("Missing keys");
        }
        const _db = await mongo.connect().db('ice').collection("routes");
        _db.updateOne({_id: object_id}, {$set: {
            name: req.body.name,
            stops: req.body.stops
        }}).then(result => res.sendStatus(201)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(400);
    } 
}

async function deleteRoutes(req, res) {
    try{
        const object_id = new mongodb.ObjectId(req.params.id);
        const _db = await mongo.connect().db('ice').collection("routes");
        _db.deleteOne({_id: object_id}).then(result => res.sendStatus(204)).catch(err => res.sendStatus(404));
    }catch(err){
      console.log(err)
      res.sendStatus(400);
    } 
}

module.exports = {getAllRoutes, getSingleRoutes, postRoutes, updateRoutes, deleteRoutes, postCheckin}