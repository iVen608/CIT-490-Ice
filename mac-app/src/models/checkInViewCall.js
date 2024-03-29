import React, { useState} from 'react';

function CheckInCallIn(props){
    const [delivered, setDelivered] = useState(false);
    
    return (
        <tr key={props._data._id} className='customer-table-data-row'>
            <td key={props._data._id+"checkbox"} className='customer-table-data-cell'><input type="checkbox" disabled={props._edit} onChange={(e) => {props.checkbox(e); setDelivered(e.target.checked)}}/></td>
            <td key={props._data._id+props._data.name} className='customer-table-data-cell'>{props._data.name}</td>
            <td key={props._data._id+"address"} className='customer-table-data-cell'>{props._data.address}</td>
            <td key={props._data._id+"delivered"} className='customer-table-data-cell'>
                <input type="number" className='table-input' onChange={props.inputBox} placeholder={`${props._data.ice1}R`} readOnly={!delivered} value={props._data.delivered || ""}/>
                {props._data.ice2 === 0 || props._data.ice2 === '' ? <></> : <input type="number" className='table-input' onChange={props.inputBox2} placeholder={`${props._data.ice2}R`} readOnly={!delivered} value={props._data.delivered2 || ""}/>}</td>
        </tr>)
    
}

export default CheckInCallIn;