import React from "react";
import {Routes, Route, Link} from 'react-router-dom';

function CustomerRouter(){
    return (
    <Routes>
        <Route path="/:id" element={<h1>Customer ID View</h1>}/>
        <Route path="/" element={
        <>
            <h1>Customer All View</h1>
            <Link to="./add/">Add Customer</Link>
            <Link to="./delete/8">Delete Customer</Link>
            <Link to="./edit/8">Edit Customer</Link>
        </>}/>
        <Route path="/add/" element={<h1>Customer Add View</h1>}/>
        <Route path="/delete/:id" element={<h1>Customer Delete View</h1>}/>
        <Route path="/edit/:id" element={<h1>Customer Edit View</h1>}/>
    </Routes>
    )
}

export default CustomerRouter;