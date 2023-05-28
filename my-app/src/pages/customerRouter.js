import React, {useState} from "react";
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import MyTableView from "../components/tableView";
import CustomerForm from "./customerAddForm";
import CustomerUpdateForm from './customerUpdateForm';
import CustomerDetail from "./customerDetail";

function CustomerRouter(){
    const parameters = useParams();
    const nav = useNavigate();
    const [edit, setEdit] = useState(true);
    const [confirm, setConfirm] = useState(false);
    const toggle = () => {
        if(edit){
            setEdit(false);
        }else{
            setEdit(true);
        }
    }

    async function deleteCustomer(){
        await fetch("http://localhost:4000/customer/" + parameters['*'].split("/")[1], {
            method: 'DELETE'}
        ).then(response => {
            if(response.ok){
                
                nav("/customer/");
            }else{
                console.log("failed");
            }
        }).catch(err => {console.log(err); console.log("failed");});
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
            <button type="button" onClick={e => setConfirm(true)}>Delete</button>
            {confirm && <div>
                <h1>Are you sure about deleting this customer?</h1>
                <button onClick={deleteCustomer}>Yes</button>
                <button onClick={e => setConfirm(false)}>No</button>
                </div>}
            <CustomerUpdateForm _id={parameters['*'].split("/")[1]} _edit={edit}/></>
        }/>
    </Routes>
    )
}

export default CustomerRouter;