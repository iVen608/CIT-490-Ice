import React, {useState} from "react";
import {Routes, Route, Link, useParams} from 'react-router-dom';
import MyTableView from "../components/tableView";
import CustomerForm from "./customerAddForm";
import CustomerUpdateForm from './customerUpdateForm';
import CustomerDetail from "./customerDetail";

function CustomerRouter(){
    const parameters = useParams();
    const [edit, setEdit] = useState(true);

    const toggle = () => {
        if(edit){
            setEdit(false);
        }else{
            setEdit(true);
        }
    }
    return (
    <Routes>
        <Route path="/:id" element={<div><h1>Customer ID View:</h1>
         <CustomerDetail _id={parameters['*']}/>
         </div>}/>
        <Route path="/" element={
        <>
            <h1>Customer All View</h1>
            <Link to="./add/">Add Customer</Link>
            <MyTableView/>
        </>}/>
        <Route path="/add/" element={<CustomerForm/>}/>
        <Route path="/delete/:id" element={<h1>Customer Delete View: {parameters['*'].split("/")[1]}</h1>}/>
        <Route path="/edit/:id" element={
            <>
            <h1>Customer Details</h1>
            <button type="button" onClick={toggle}>Edit</button>
            <CustomerUpdateForm _id={parameters['*'].split("/")[1]} _edit={edit}/></>
        }/>
    </Routes>
    )
}

export default CustomerRouter;