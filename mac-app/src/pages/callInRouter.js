import React, {useState} from "react";
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import CallInForm from "./callInForm";
import MyTableView from "../components/tableView";

function CallInRouter(){
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
        await fetch("http://localhost:4000/callin/" + parameters['*'].split("/")[1], {
            method: 'DELETE'}
        ).then(response => {
            if(response.ok){
                setConfirm(false);
                nav("/callin/");
            }else{
                console.log("failed");
            }
        }).catch(err => {console.log(err); console.log("failed");});
    }
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
            edit={true}
            api={"http://localhost:4000/callin/"}/>}/>
        <Route path="/edit/:id" element={<>
            <CallInForm 
                _id={parameters['*'].split("/")[1]}
                method={"PUT"} 
                _edit={edit}
                api={"http://localhost:4000/callin/"}/></>}/>
    </Routes>
    )
}

export default CallInRouter;