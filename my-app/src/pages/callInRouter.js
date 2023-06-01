import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import CallInForm from "./callInAddForm";
import MyTableView from "../components/tableView";

function CallInRouter(){
    return (
    <Routes>
        <Route path="/:id" element={<h1>Call In ID View</h1>}/>
        <Route path="/" element={
        <>
        <h1>Call In All View</h1>
        <Link to="./add/">Add Customer</Link>
        <MyTableView 
            header_keys={["Name", "Address", "Call Date", "Service Date", "Special Instructions"]}
            api={"http://localhost:4000/callin/"}
            model="callin"/>
    </>}/>
        <Route path="/add/" element={<CallInForm edit={true}/>}/>
        <Route path="/delete/:id" element={<h1>Call In Delete View</h1>}/>
        <Route path="/edit/:id" element={<h1>Call In Edit View</h1>}/>
    </Routes>
    )
}

export default CallInRouter;