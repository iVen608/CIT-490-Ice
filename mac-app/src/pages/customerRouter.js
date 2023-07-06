import React, {useState} from "react";
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import MyTableView from "../components/tableView";
import CustomerForm from './customerForm';
import CustomerHistory from "../components/customerHistory";

function CustomerRouter(){
    const parameters = useParams();

    return (
    <Routes>
        
        <Route path="/" element={
        <>
            <div className="table-action-header">
                <h1 className="form-title">Customers</h1>
                <Link className="table-link-create" to="./add/">New</Link>
            </div>
            <MyTableView 
                header_keys={["Name", "Address", "Ice", "Price", "Tax", "Del", "PO/Job"]}
                api={"http://localhost:4000/customer/"}
                wide={true}
                model="customer"/>
        </>}/>
        <Route path="/add/" element={<>
        <CustomerForm method={"POST"} api="http://localhost:4000/customer/"/>
        </>}/>
        <Route path="/delete/:id" element={<h1>Customer Delete View: {parameters['*'].split("/")[1]}</h1>}/>
        <Route path="/edit/:id" element={
            <> 
            <CustomerForm 
                _id={parameters['*'].split("/")[1]} 
                method="PUT" 
                api="http://localhost:4000/customer/"/>

            <CustomerHistory api="http://localhost:4000/customer/history/" _id={parameters['*'].split("/")[1]}/></>
        }/>
    </Routes>
    )
}

export default CustomerRouter;