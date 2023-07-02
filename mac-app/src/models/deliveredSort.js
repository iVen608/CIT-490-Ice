import React from "react";

function SortDelivered(props){
    return(
    <div className="sortContainer">
            <label className="blue-text">Sort by:</label>
            <select value={props.sortObject.sort|| ""}  onChange={(e) => props.sortFunction({...props.sortObject, sort: e.target.value})}>
                <option value="name">Name</option>
                <option value="stops">Stops</option>
                <option value="date">Date Delivered</option>
            </select>
            <label className="blue-text">Filter by:</label>
            <select className='form-select-input' value={props.sortObject.filterBy || ""} onChange={(e) => props.sortFunction({...props.sortObject, filterBy: e.target.value})}>
                <option value="">None</option>
                <option value="stops">Stops</option>
            </select>
            {props.sortObject.filterBy && props.sortObject.filterBy !== "" && <input className="form-text-input" placeholder={`${props.sortObject.filterBy}`} onChange={(e) => props.sortFunction({...props.sortObject, filterValue: e.target.value})}/>}
            <label className="blue-text">Order by:</label>
            <select value={props.sortObject.order || ""} onChange={(e) => props.sortFunction({...props.sortObject, order: e.target.value})}>
                <option value="ascend">Ascending</option>
                <option value="descend">Descending</option>
            </select>
            <button className="form-button-submit reset-button" type="button" onClick={e => {props.sortFunction({sort: 'name', filterBy: '', order: 'ascend'}); props.resetData([])}}>Reset</button>
        </div>)
}

export default SortDelivered;