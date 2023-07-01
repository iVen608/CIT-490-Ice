import React, {useState} from "react";
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import RouterForm from "./routerForm";
import MyTableView from "../components/tableView";
import CheckInForm from "./checkInRouteForm";

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
        await fetch("http://localhost:4000/routes/" + parameters['*'].split("/")[1], {
            method: 'DELETE'}
        ).then(response => {
            if(response.ok){
                setConfirm(false);
                nav("/routes/");
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
                <h1 className="form-title">Routes</h1>
                <Link className="table-link-create" to="./add/">New</Link>
        </div>
        <MyTableView 
            header_keys={["Name"]}
            wide={true}
            api={"http://localhost:4000/routes/"}
            model="routes"/>
    </>}/>
        <Route path="/add/" element={<RouterForm method={"POST"} edit={true}/>}/>
        <Route path="/edit/:id" element={<>
            <div className="form-action-header">
                <h1 className="form-title">Route Details</h1>
                <button type="button" className="form-button-edit" onClick={toggle}>Edit</button>
                <button type="button" className="form-button-delete" onClick={e => setConfirm(true)}>Delete</button>
                {confirm && <>
                <h1 className="form-title">Are you sure about deleting this route?</h1>
                <button className="form-button-delete" onClick={deleteCustomer}>Yes</button>
                <button className="form-button-edit" onClick={e => setConfirm(false)}>No</button>
            </>}
            </div>
            <RouterForm _id={parameters['*'].split("/")[1]} method={"PUT"} _edit={edit}/></>}/>
        <Route path="/checkin/" element={<>
            <div className="table-action-header">
                <h1 className="form-title">Check In</h1>
            </div>
            <MyTableView
                header_keys={["Name"]}
                api={"http://localhost:4000/routes/"}
                wide={true}
                model="routesCheck"
            />
        </>}/>
        <Route path="/checkin/:id" element={
        <CheckInForm
            header_keys={["Selected","Name", "Address", "Ice", "Price", "Delivered"]}
            method="POST"
            api={"http://localhost:4000/routes/"}
            api2={"http://localhost:4000/customer/"}
            api3={"http://localhost:4000/callin/"}
            _id = {parameters['*'].split("/")[1]}
        />}/>
        <Route path="/delivered/" element={
            <>
            <div className="table-action-header">
                <h1 className="form-title">Delivered Check In</h1>
            </div>
            <MyTableView
                header_keys={["Name"]}
                wide={true}
                api={"http://localhost:4000/routes/delivered"}
                model="deliveredRoute"
            />
        </>}/>
        <Route path="/delivered/edit/:id" element={
            <>
            <CheckInForm
            header_keys={["Selected","Name", "Address", "Ice", "Price", "Delivered"]}
            method="PUT"
            api={"http://localhost:4000/routes/"}
            api2={"http://localhost:4000/customer/"}
            api3={"http://localhost:4000/callin/"}
            api4={"http://localhost:4000/routes/delivered/"}
            _id = {parameters['*'].split("/")[2]}/>
        </>}/>
    </Routes>
    )
}

export default RoutesRouter;