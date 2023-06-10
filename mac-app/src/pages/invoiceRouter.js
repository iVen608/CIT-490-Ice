import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import CheckInForm from "./checkInRouteForm";
import MyTableView from "../components/tableView";

function InvoiceRouter(){
    return (
    <Routes>
        <Route path="/" element={
        <>
            <h1>Invoice All View</h1>
            <Link to="./add/">Add Invoice</Link>
            <Link to="./delete/8">Delete Invoice</Link>
            <Link to="./edit/8">Edit Invoice</Link>
        </>}/>
        <Route path="/checkin/" element={
            <MyTableView
                header_keys={["Name"]}
                api={"http://localhost:4000/routes/"}
                model="routes"
            />
        }/>
        <Route path="/checkin/:id" element={
        <CheckInForm
        header_keys={["Name"]}
        api={"http://localhost:4000/routes/"}
        />}/>
    </Routes>
    )
}

export default InvoiceRouter;