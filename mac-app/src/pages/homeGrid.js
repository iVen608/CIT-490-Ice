import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import calculatorIcon from '../img/calculatorIcon.png';
import "../styles/homeGrid.css";

function HomeGrid(){
    //fetch("https://https://cit-490-ice.onrender.com/api-docs").then(response => response.json()).then(rep => console.log(rep));
    //fetch("https://cit-490-ice.onrender.com/api-docs").then(response => response.json()).then(rep => console.log(rep));
    return(
        <div class="nav-grid">
            <Link class="nav-grid-link" to="/calculator/">
                <span class="nav-grid-box">
                    <img class="nav-grid-icon" src={calculatorIcon}/>
                    <p className="nav-grid-text">Calculator</p>
                    </span>
            </Link>
            <Link class="nav-grid-link" to="/customer/">
                <span class="nav-grid-box">
                <svg class="nav-grid-svg-icon">
                    <circle class="nav-grid-customer-icon-circle" cx="35" cy="50" r="13"/>
                    <circle class="nav-grid-customer-icon-circle" cx="35" cy="75" r="20"/>
                </svg>
                <p className="nav-grid-text">Customers</p>
                    </span>
            </Link>
            <Link class="nav-grid-link" to="/routes/">
                <span class="nav-grid-box">
                <svg class="nav-grid-svg-icon">
                <polygon class="nav-grid-route-icon-polygon-road" points="12,30 65,35, 63,73, 10,70"/>
                    <circle class="nav-grid-route-icon-circle" cx="35" cy="30" r="13"/>
                    <polygon class="nav-grid-route-icon-polygon" points="49,30 35,60, 21,30, 49,30"/>
                    
                </svg>
                <p className="nav-grid-text">Routes</p>
                    </span>
            </Link>
            <Link class="nav-grid-link" to="/callin/">
                <span class="nav-grid-box">
                <svg class="nav-grid-svg-icon">
                <polygon class="nav-grid-call-icon-polygon" points="5,70, 5,50, 15,50, 25,40, 35,40, 50,40, 60,50 70,50, 70,70"/>
                <rect class="nav-grid-call-icon-rect" x="18" y="12" width="40" height="13"/>
                <circle class="nav-grid-call-icon-rect" cx="15" cy="25" r="13"/>
                <circle class="nav-grid-call-icon-rect" cx="60" cy="25" r="13"/>
                </svg>
                <p className="nav-grid-text">Call Ins</p>
                    </span>
            </Link>
            <Link class="nav-grid-link" to="/routes/checkin/">
                <span class="nav-grid-box">
                    <svg class="nav-grid-svg-icon">
                    <rect class="nav-grid-call-icon-rect" rx="10" x="5" y="10" width="65" height="65"/>
                        <line class="nav-grid-call-icon-polygon blue-fill" x1="10" x2="65" y1="20" y2="20"/>
                        <line class="nav-grid-call-icon-polygon blue-fill" x1="10" x2="65" y1="35" y2="35"/>
                        <line class="nav-grid-call-icon-polygon blue-fill" x1="10" x2="65" y1="50" y2="50"/>
                        <line class="nav-grid-call-icon-polygon blue-fill" x1="10" x2="65" y1="65" y2="65"/>
                    </svg>
                    <p className="nav-grid-text">Check In</p></span>
            </Link>
            <Link class="nav-grid-link" to="/routes/delivered/">
                <span class="nav-grid-box">
                    <svg class="nav-grid-svg-icon">
                        <polygon class="nav-grid-call-icon-polygon" points="5,20 15,30, 60,30 45,20"/>
                        <polygon class="nav-grid-call-icon-polygon" points="5,32 15,42, 60,42 45,32"/>
                        <polygon class="nav-grid-call-icon-polygon" points="5,46 15,56, 60,56 45,46"/>
                        <polygon class="nav-grid-call-icon-polygon" points="5,60 15,70, 60,70 45,60"/>
                    </svg>
                    <p className="nav-grid-text">History</p></span>
            </Link>
        </div>
    )
}

export default HomeGrid;