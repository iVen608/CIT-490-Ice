import React, { useState, useEffect } from 'react';
import {getJWT} from '../utility';
import '../styles/form.css';

function Login(){
    const [data, setData] = useState({})
    const [response, setResponse] = useState({});
    const [token, setToken] = useState(false)
    useEffect(() => {
        setResponse({text: "", status: false})
        setToken(getJWT())
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://cit-490-ice.onrender.com/login/",
        {method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-type': "application/json"},
            credentials: 'include'
            }
        )
        .then(response => response.json())
        .then(_data => {window.localStorage.setItem("token", _data); setResponse({text: "Successfully logged in", status: true}); setTimeout(()=>{window.location.reload(true)}, 1500)})
        .catch(err => setResponse({text: `Error: ${err}`, status: false}));
    }
    return (
        <>
            <div className="form-action-header">
                {response && response.text && <p className={`status-message span-two ${response.status ? "success" : "failure"}`}>{response.text || "Testing text vneovevioeveionveoiveonveonveoveoveovneo"}</p>}
                <h1 className="form-title">Login</h1>
            </div>
            {!token && <form className='form' onSubmit={handleSubmit}>
                <input name="username" required className='form-text-input' placeholder='Username' onChange={(e) => setData({...data, ["username"] : e.target.value})}/>
                <input name="password" required className='form-text-input' placeholder='Password' type="password" onChange={(e) => setData({...data, ["password"] : e.target.value})}/>
                <button type="submit" className='form-button-submit'>Submit</button>
            </form>}
            {token && <div>
                    <h1>You are currently logged in!</h1>
                </div>}
        </>
    )
}

export default Login;