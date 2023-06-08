const mongo = require("../connect");
const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const lib = require("../library/library");
const jwt = require("jsonwebtoken");

async function login (req, res) {
    const _db = await mongo.connect().db('ice').collection("user").find( {"user": req.body.username}).toArray();
    bcrypt.compare(req.body.password, _db[0].pass, (error, result) => {
        if(result){
            const token = jwt.sign({
                name: req.body.name, pass: req.body.pass 
            }, process.env.SECRETKEY, {expiresIn: "24h"});
            res.status(200).json(token);
        }else if (error){
            res.sendStatus(400);
            console.log(error);
        }else {
            res.sendStatus(400);
        }
    })
}

function logout (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    console.log(jwt.verify(token, process.env.SECRETKEY))
    res.json({"submitted" : true}).status(200);
}

async function signup (req, res) {
    const _db = await mongo.connect().db('ice').collection("user");
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        _db.insertOne({
            'user': req.body.username,
            'pass': hash
        }).then(result => res.sendStatus(204)).catch(err => res.sendStatus(404));
    })
}

module.exports = {login, logout, signup}