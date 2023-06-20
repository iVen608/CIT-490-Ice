import jwt from 'jwt-decode';

function getJWT(){
    try{
    const token = window.localStorage.getItem("token");
    const decoded = jwt(token);
    const currentTime = new Date().getTime() / 1000
    console.log(decoded);
    console.log(currentTime)
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

export default getJWT;
