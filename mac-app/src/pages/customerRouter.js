import React, {useState} from "react";
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import MyTableView from "../components/tableView";
import CustomerForm from './customerForm';

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
        await fetch("https://cit-490-ice.onrender.com/customer/" + parameters['*'].split("/")[1], {
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
        
        <Route path="/" element={
        <>
            <h1>Customer All View</h1>
            <Link to="./add/">Add Customer</Link>
            <MyTableView 
                header_keys={["Name", "Address", "Ice", "Price", "Tax", "Del", "PO/Job"]}
                api={"http://localhost:4000/customer/"}
                model="customer"/>
        </>}/>
        <Route path="/add/" element={<CustomerForm method={"POST"} edit={true} api="http://localhost:4000/customer/"/>}/>
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
            <CustomerForm _id={parameters['*'].split("/")[1]} _edit={edit} method="PUT" api="http://localhost:4000/customer/"/></>
        }/>
    </Routes>
    )
}

export default CustomerRouter;