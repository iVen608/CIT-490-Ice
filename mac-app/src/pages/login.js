import React, { useState } from 'react';
import getJWT from '../utility';
import '../styles/form.css';

function Login(){
    const [data, setData] = useState({})
    const [response, setResponse] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/login/",
        {method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-type': "application/json"},
            credentials: 'include'
            }
        )
        .then(response => response.json())
        .then(_data => {window.localStorage.setItem("token", _data); setResponse("Successfully logged in")})
        .catch(err => setResponse(`An error occured while attempting to login in: ${err}`));
    }
    return (
        <>
            <p>{response}</p>
            {!getJWT && <form className='form' onSubmit={handleSubmit}>
                <input name="username" required className='form-text-input' placeholder='Username' onChange={(e) => setData({...data, ["username"] : e.target.value})}/>
                <input name="password" required className='form-text-input' placeholder='Password' type="password" onChange={(e) => setData({...data, ["password"] : e.target.value})}/>
                <button type="submit" className='form-button-submit'>Submit</button>
            </form>}
            {getJWT && <div>
                    <h1>You are currently logged in!</h1>
                </div>}
        </>
    )
}

export default Login;