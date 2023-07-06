import React, { useState} from 'react';

function CheckInCallIn(props){
    const [delivered, setDelivered] = useState(false);
    function formatDollar(x){
        try{
            let i = parseFloat(x);
            i = i.toFixed(2);
            return `$${i}`;
        }catch(err){
            console.log(err);
            return x;
        }
    }
    return (
        <tr key={props._data._id} className='customer-table-data-row'>
            <td key={props._data._id+"checkbox"} className='customer-table-data-cell'><input type="checkbox" disabled={props._edit} onChange={(e) => {props.checkbox(e); setDelivered(e.target.checked)}}/></td>
            <td key={props._data._id+props._data.name} className='customer-table-data-cell'>{props._data.name}</td>
            <td key={props._data._id+"address"} className='customer-table-data-cell'>{props._data.address}</td>
            <td key={props._data._id+"calledIn"} className='customer-table-data-cell'>{props._data.callDate  || "-"}</td>
            <td key={props._data._id+"serviceDate"} className='customer-table-data-cell'>{props._data.serviceDate || "-"}</td>
            <td key={props._data._id+"delivered"} className='customer-table-data-cell'>
                <input type="number" onChange={props.inputBox} placeholder={`${props._data.ice1}R Delivered`} readOnly={!delivered} value={props._data.delivered || ""}/>
                {props._data.ice2 === 0 || props._data.ice2 === '' ? <></> : <input type="number" onChange={props.inputBox2} placeholder={`${props._data.ice2}R Delivered`} readOnly={!delivered} value={props._data.delivered2 || ""}/>}</td>
        </tr>)
    
}

export default CheckInCallIn;