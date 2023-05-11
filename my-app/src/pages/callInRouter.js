import React from "react";
import {Routes, Route, Link} from 'react-router-dom';

function CallInRouter(){
    return (
    <Routes>
        <Route path="/:id" element={<h1>Call In ID View</h1>}/>
        <Route path="/" element={
        <>
            <h1>Call In All View</h1>
            <Link to="./add/">Add Call In</Link>
            <Link to="./delete/8">Delete Call In</Link>
            <Link to="./edit/8">Edit Call In</Link>
        </>}/>
        <Route path="/add/" element={<h1>Call In Add View</h1>}/>
        <Route path="/delete/:id" element={<h1>Call In Delete View</h1>}/>
        <Route path="/edit/:id" element={<h1>Call In Edit View</h1>}/>
    </Routes>
    )
}

export default CallInRouter;