import jwt from 'jwt-decode';

export function getJWT(){
    try{
    const token = window.localStorage.getItem("token");
    const decoded = jwt(token);
    const currentTime = new Date().getTime() / 1000
    if(decoded.exp < currentTime){
        return false;
        
    }else {
        return token;
    }
    }catch(error){
        console.log(error);
        return false;
    }
}

export function sortFunction(array, key, order){
    order = order === "ascend" ? 1 : -1;
    const sorted = array.sort((x,y) => {
        if(!parseFloat(x[key]) && x[key] !== ""){
            console.log("x")
            if(x[key] > y[key]){
                return 1;
            }else if(x[key] < y[key]){
                return -1;
            }
            return 0;
        }else if(!isNaN(Date.parse(x[key]))){
            const _x = new Date(x[key]);
            const _y = new Date(y[key]);
            if(_x > _y){
                return 1;
            }else if(_x < _y){
                return -1;
            }
        }else if(Array.isArray(x[key])){
            const _x = x[key].length
            const _y = y[key].length
            return _x - _y;
        }
        else{
            const _x = parseFloat(x[key]) || 0;
            const _y = parseFloat(y[key]) || 0;
            return _x - _y;
            
        }
        
        
    })
    if(order === -1){
        const reverse = sorted.reverse();
        console.log(reverse)
        return reverse;
    }
    return sorted;
}

export function filterArrayFunction(array, key, value){
    const filtered = array.filter(element => {
        const _value = element[key];
        if(Array.isArray(element[key])){
            return element[key].length == value;
        }
        if(!isNaN(_value) && !isNaN(value)){
            const floatValue = parseFloat(_value);
            const floatValueInput = parseFloat(value);
            return floatValue == floatValueInput;
        }
        return _value === value
    })
    return filtered;
}

export function formatAddress(street, city, zip){
    return `${street}, ${city} ${zip}`
}
