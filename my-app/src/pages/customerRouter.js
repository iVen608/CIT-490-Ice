import React from "react";
import {Routes, Route, Link, useParams} from 'react-router-dom';
import CustomerDetail from "./customerDetail";

function CustomerRouter(){
    const parameters = useParams();
    console.log(parameters);
    return (
    <Routes>
        <Route path="/:id" element={<div><h1>Customer ID View:</h1>
         <CustomerDetail _id={parameters['*']}/>
         </div>}/>
        <Route path="/" element={
        <>
            <h1>Customer All View</h1>
            <Link to="./add/">Add Customer</Link>
            <Link to="./delete/8">Delete Customer</Link>
            <Link to="./edit/8">Edit Customer</Link>
        </>}/>
        <Route path="/add/" element={<h1>Customer Add View</h1>}/>
        <Route path="/delete/:id" element={<h1>Customer Delete View: {parameters['*'].split("/")[1]}</h1>}/>
        <Route path="/edit/:id" element={<h1>Customer Edit View</h1>}/>
    </Routes>
    )
}

export default CustomerRouter;