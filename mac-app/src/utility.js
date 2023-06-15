import jwt from 'jwt-decode';

function getJWT(){
    const token = window.localStorage.getItem("token");
    const decoded = jwt.decode(token);
    const currentTime = new Date().getTime() * 1000
    if(decoded.exp < currentTime){
        return false;
    }else {
        return true;
    }
}

export default getJWT;
