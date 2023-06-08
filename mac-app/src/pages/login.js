import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Login(){
    const [data, setData] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        //fetch("http://localhost:4000/logout/").then(rep => rep.json()).then(obj => console.log(obj));
        fetch("http://localhost:4000/login/",
        {method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-type': "application/json"},
            credentials: 'include'
            }
        ).then(response => response.json()).then(_data => {console.log(_data); window.localStorage.setItem("token", _data); console.log(window.localStorage.getItem("token"))}).catch(err => console.log(err));
    
    }
    const logout = (e) => {
        
        const token = window.localStorage.getItem("token");
        const decoded = jwt_decode(token);
        console.log((new Date() / 1000) > token.exp)
        axios.get("http://localhost:4000/logout/", {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}});
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={(e) => setData({...data, ["username"] : e.target.value})}/>
            <input name="password" type="password" onChange={(e) => setData({...data, ["password"] : e.target.value})}/>
            <button type="submit">Submit</button>
            <button type="button" onClick={logout}>Logout</button>
        </form>
    )
}

export default Login;