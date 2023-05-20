const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
let _db;
const uri = process.env.MONGODB;

async function initialize(){
    const client = new MongoClient(uri);
    try {
         await client.connect();
         _db = client;
    } catch (e) {
        console.error(e);
    }
}

function connect(){
    if(_db){
        return _db;
    } else {
        console.log("Not connect!");
    }
}

module.exports = {initialize, connect}