import React, {useState} from "react";
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import CallInForm from "./callInForm";
import MyTableView from "../components/tableView";

function CallInRouter(){
    const parameters = useParams();
    return (
    <Routes>
        <Route path="/" element={
        <>
        <div className="table-action-header">
                <h1 className="form-title">Call Ins</h1>
                <Link className="table-link-create" to="./add/">New</Link>
            </div>
        <MyTableView 
            header_keys={["Name", "Address", "Call Date", "Service Date", "Delivered" , "Special Instructions"]}
            api={"http://localhost:4000/callin/"}
            wide={true}
            model="callin"/>
    </>}/>
        <Route path="/add/" element={
        <CallInForm 
            method={"POST"}
            api={"http://localhost:4000/callin/"}/>}/>
        <Route path="/edit/:id" element={<>
            <CallInForm 
                _id={parameters['*'].split("/")[1]}
                method={"PUT"} 
                api={"http://localhost:4000/callin/"}/></>}/>
    </Routes>
    )
}

export default CallInRouter;