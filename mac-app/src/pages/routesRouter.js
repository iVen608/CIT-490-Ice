import React, {useState} from "react";
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import RouterForm from "./routerForm";
import MyTableView from "../components/tableView";

function RoutesRouter(){
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
        await fetch("https://cit-490-ice.onrender.com/routes/" + parameters['*'].split("/")[1], {
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
        <h1>Routes</h1>
        <Link to="./add/">Create Route</Link>
        <MyTableView 
            header_keys={["Name"]}
            api={"https://cit-490-ice.onrender.com/routes/"}
            model="routes"/>
    </>}/>
        <Route path="/add/" element={<RouterForm method={"POST"} edit={true}/>}/>
        <Route path="/edit/:id" element={<>
            <h1>Route Details</h1>
            <button type="button" className="form-button-edit" onClick={toggle}>Edit</button>
            <button type="button" className="form-button-delete" onClick={e => setConfirm(true)}>Delete</button>
            {confirm && <div>
                <h1>Are you sure about deleting this customer?</h1>
                <button className="form-button-delete" onClick={deleteCustomer}>Yes</button>
                <button className="form-button-edit" onClick={e => setConfirm(false)}>No</button>
                </div>}
            <RouterForm _id={parameters['*'].split("/")[1]} method={"PUT"} _edit={edit}/></>}/>
    </Routes>
    )
}

export default RoutesRouter;