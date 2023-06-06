import React, { useState } from 'react';

function Login(){
    const [data, setData] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();
        //fetch("http://localhost:4000/logout/").then(rep => rep.json()).then(obj => console.log(obj));
        fetch("https://cit-490-ice.onrender.com/login/",
        {method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-type': "application/json"},
            credentials: 'include'
            }
        ).then(response => response.json()).then(_data => console.log(_data)).catch(err => console.log(err));
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={(e) => setData({...data, ["username"] : e.target.value})}/>
            <input name="password" type="password" onChange={(e) => setData({...data, ["password"] : e.target.value})}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login;