import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import calculatorIcon from '../img/calculatorIcon.png';
import "../styles/homeGrid.css";

function HomeGrid(){
    //fetch("http://localhost:4000/api-docs").then(response => response.json()).then(rep => console.log(rep));
    fetch("https://cit-490-ice.onrender.com/api-docs").then(response => response.json).then(rep => console.log(rep));
    return(
        <div class="nav-grid">
            <Link class="nav-grid-link" to="/calculator/">
                <span class="nav-grid-box">
                    <img class="nav-grid-icon" src={calculatorIcon}/>
                    <br/>
                    Calculator
                    </span>
            </Link>
            <Link class="nav-grid-link" to="/customer/">
                <span class="nav-grid-box">
                <svg class="nav-grid-svg-icon">
                    <circle class="nav-grid-customer-icon-circle" cx="35" cy="50" r="13"/>
                    <circle class="nav-grid-customer-icon-circle" cx="35" cy="75" r="20"/>
                </svg>
                    Customers</span>
            </Link>
            <Link class="nav-grid-link" to="/routes/">
                <span class="nav-grid-box">
                <svg class="nav-grid-svg-icon">
                <polygon class="nav-grid-route-icon-polygon-road" points="12,30 65,35, 63,73, 10,70"/>
                    <circle class="nav-grid-route-icon-circle" cx="35" cy="30" r="13"/>
                    <polygon class="nav-grid-route-icon-polygon" points="49,30 35,60, 21,30, 49,30"/>
                    
                </svg>
                    Routes</span>
            </Link>
            <Link class="nav-grid-link" to="/callin/">
                <span class="nav-grid-box">
                <svg class="nav-grid-svg-icon">
                <polygon class="nav-grid-call-icon-polygon" points="5,70, 5,50, 15,50, 25,40, 35,40, 50,40, 60,50 70,50, 70,70"/>
                <rect class="nav-grid-call-icon-rect" x="18" y="12" width="40" height="13"/>
                <circle class="nav-grid-call-icon-rect" cx="15" cy="25" r="13"/>
                <circle class="nav-grid-call-icon-rect" cx="60" cy="25" r="13"/>
                </svg>
                    Call Ins</span>
            </Link>
            <Link class="nav-grid-link" to="/routes/checkin/">
                <span class="nav-grid-box">Check In</span>
            </Link>
        </div>
    )
}

export default HomeGrid;