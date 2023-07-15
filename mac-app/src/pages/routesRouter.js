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
            api={"https://cit-490-ice.onrender.com/routes/"}
            model="routes"/>
    </>}/>
        <Route path="/add/" element={<RouterForm method={"POST"}/>}/>
        <Route path="/edit/:id" element={<>
            <RouterForm 
                _id={parameters['*'].split("/")[1]} 
                method={"PUT"}
                api={"https://cit-490-ice.onrender.com/routes/"}/></>}/>
        <Route path="/checkin/" element={<>
            <div className="table-action-header">
                <h1 className="form-title">Check In</h1>
            </div>
            <MyTableView
                header_keys={["Name", "# of Stops"]}
                api={"https://cit-490-ice.onrender.com/routes/"}
                wide={true}
                model="routesCheck"
            />
        </>}/>
        <Route path="/checkin/:id" element={
        <CheckInForm
            header_keys={["Selected","Name", "Address", "Delivered"]}
            method="POST"
            api={"https://cit-490-ice.onrender.com/routes/"}
            api2={"https://cit-490-ice.onrender.com/customer/"}
            api3={"https://cit-490-ice.onrender.com/callin/"}
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
                api={"https://cit-490-ice.onrender.com/routes/delivered"}
                model="deliveredRoute"
            />
        </>}/>
        <Route path="/delivered/edit/:id" element={
            <>
            <CheckInForm
                header_keys={["Selected","Name", "Address", "Delivered"]}
                method="PUT"
                api={"https://cit-490-ice.onrender.com/routes/"}
                api2={"https://cit-490-ice.onrender.com/customer/"}
                api3={"https://cit-490-ice.onrender.com/callin/"}
                api4={"https://cit-490-ice.onrender.com/routes/delivered/"}
                _id = {parameters['*'].split("/")[2]}
            />
        </>}/>
    </Routes>
    )
}

export default RoutesRouter;