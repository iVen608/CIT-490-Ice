import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import calculatorIcon from '../img/calculatorIcon.png';
import "../styles/homeGrid.css";

function HomeGrid(){
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
                <span class="nav-grid-box">Customers</span>
            </Link>
            <Link class="nav-grid-link" to="/routes/">
                <span class="nav-grid-box">Routes</span>
            </Link>
            <Link class="nav-grid-link" to="/callin/">
                <span class="nav-grid-box">Call Ins</span>
            </Link>
            <Link class="nav-grid-link" to="/routes/checkin/">
                <span class="nav-grid-box">Check In</span>
            </Link>
        </div>
    )
}

export default HomeGrid;