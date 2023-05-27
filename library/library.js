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

module.exports = {checkEmpty, checkKeys, validateFloat}