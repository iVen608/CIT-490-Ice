const jwt = require("jsonwebtoken");

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
  
  const checkKeys = function(obj, keys, i){
    const keyArray = Object.keys(obj);
    console.log(keyArray);
    console.log(keys);
    if(keyArray.length !== keys.length + i){
      console.log("missing keys length");
      return false;
    }
    keys.forEach(key => {
      if(!keyArray.includes(key)){
        console.log("Missing key:" + key)
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
module.exports = {checkEmpty, checkKeys, validateFloat, verifyToken}