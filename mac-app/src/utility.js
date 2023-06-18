import jwt from 'jwt-decode';

function getJWT(){
    const token = window.localStorage.getItem("token");
    const decoded = jwt(token);
    const currentTime = new Date().getTime() * 1000
    console.log(decoded);
    if(decoded.exp < currentTime){
        return false;
    }else {
        return true;
    }
}

export default getJWT;
