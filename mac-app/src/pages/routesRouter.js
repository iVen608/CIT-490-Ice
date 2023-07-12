import React, {useState} from "react";
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import RouterForm from "./routerForm";
import MyTableView from "../components/tableView";
import CheckInForm from "./checkInRouteForm";

function RoutesRouter(){
    const parameters = useParams();
    return (
    <Routes>
        <Route path="/" element={
        <>
        <div className="table-action-header">
                <h1 className="form-title">Routes</h1>
                <Link className="table-link-create" to="./add/">New</Link>
        </div>
        <MyTableView 
            header_keys={["Name", "# of Stops"]}
            wide={true}
            api={"http://localhost:4000/routes/"}
            model="routes"/>
    </>}/>
        <Route path="/add/" element={<RouterForm method={"POST"}/>}/>
        <Route path="/edit/:id" element={<>
            <RouterForm 
                _id={parameters['*'].split("/")[1]} 
                method={"PUT"}
                api={"http://localhost:4000/routes/"}/></>}/>
        <Route path="/checkin/" element={<>
            <div className="table-action-header">
                <h1 className="form-title">Check In</h1>
            </div>
            <MyTableView
                header_keys={["Name", "# of Stops"]}
                api={"http://localhost:4000/routes/"}
                wide={true}
                model="routesCheck"
            />
        </>}/>
        <Route path="/checkin/:id" element={
        <CheckInForm
            header_keys={["Selected","Name", "Address", "Delivered"]}
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
                header_keys={["Name", "Date Delivered", "Call Ins", "Delivered"]}
                wide={true}
                api={"http://localhost:4000/routes/delivered"}
                model="deliveredRoute"
            />
        </>}/>
        <Route path="/delivered/edit/:id" element={
            <>
            <CheckInForm
                header_keys={["Selected","Name", "Address", "Delivered"]}
                method="PUT"
                api={"http://localhost:4000/routes/"}
                api2={"http://localhost:4000/customer/"}
                api3={"http://localhost:4000/callin/"}
                api4={"http://localhost:4000/routes/delivered/"}
                _id = {parameters['*'].split("/")[2]}
            />
        </>}/>
    </Routes>
    )
}

export default RoutesRouter;