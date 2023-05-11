import React from "react";
import {Routes, Route, Link} from 'react-router-dom';

function RoutesRouter(){
    return (
    <Routes>
        <Route path="/:id" element={<h1>Routes ID View</h1>}/>
        <Route path="/" element={
        <>
            <h1>Routes All View</h1>
            <Link to="./add/">Add Route</Link>
            <Link to="./delete/8">Delete Routes</Link>
            <Link to="./edit/8">Edit Route</Link>
        </>}/>
        <Route path="/add/" element={<h1>Route Add View</h1>}/>
        <Route path="/delete/:id" element={<h1>Route Delete View</h1>}/>
        <Route path="/edit/:id" element={<h1>Route Edit View</h1>}/>
    </Routes>
    )
}

export default RoutesRouter;