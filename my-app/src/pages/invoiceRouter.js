import React from "react";
import {Routes, Route, Link} from 'react-router-dom';

function InvoiceRouter(){
    return (
    <Routes>
        <Route path="/:id" element={<h1>Invoice ID View</h1>}/>
        <Route path="/" element={
        <>
            <h1>Invoice All View</h1>
            <Link to="./add/">Add Invoice</Link>
            <Link to="./delete/8">Delete Invoice</Link>
            <Link to="./edit/8">Edit Invoice</Link>
        </>}/>
        <Route path="/add/" element={<h1>Invoice Add View</h1>}/>
        <Route path="/delete/:id" element={<h1>Invoice Delete View</h1>}/>
        <Route path="/edit/:id" element={<h1>Invoice Edit View</h1>}/>
    </Routes>
    )
}

export default InvoiceRouter;