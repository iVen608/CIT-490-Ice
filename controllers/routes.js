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

async function getDeliveredRoutes(req, res){
    try{
        const searchQuery = req.query.search;
        const _db = await mongo.connect().db('ice').collection("route_deliveries").find();
        const result = await _db.toArray();
        console.log(result);
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

async function getSingleDeliveredRoutes(req, res){
    try{
        const _db = await mongo.connect().db('ice').collection("route_deliveries").find();
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
        const _date = new Date()
        var checkIn = {
            name: req.body.name,
            date: _date,
            route_id: req.body.route_id,
            delivered: req.body.delivered,
            callins: req.body.callins
        }
        console.log(checkIn);
        const object_id = new mongodb.ObjectId(req.params.id);
        const _db = await mongo.connect().db('ice');
        const _routeDel = _db.collection("route_deliveries");
        const _deliveries = _db.collection("deliveries");
        
        for(var stop of checkIn.delivered){
            const response = await _deliveries.insertOne({customer_id: stop._id, date: _date, delivered: stop.delivered, delivered2: stop.delivered2});
            if(response.acknowledged){
                stop.invoice_id = response.insertedId.toString();
            }
        }
        const _callinDB = _db.collection("callin");
        for (var call of checkIn.callins){
            const call_id = new mongodb.ObjectId(call._id);
            await _callinDB.updateOne({_id: call_id}, {$set: {completed: true}});
            const response = await _deliveries.insertOne({customer_id: call.customer_id, delivered: call.delivered, delivered2: call.delivered2});
            if(response.acknowledged){
                call.invoice_id = response.insertedId.toString();
            }
        }
        await _routeDel.insertOne(checkIn);
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

module.exports = {getAllRoutes, getDeliveredRoutes, getSingleRoutes, getSingleDeliveredRoutes, postRoutes, updateRoutes, deleteRoutes, postCheckin}