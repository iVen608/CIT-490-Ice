import React, {useEffect, useState} from 'react';

function CheckInCustomer(props){
    const [delivered, setDelivered] = useState(false);
    return (
        <tr key={props._data._id} className='customer-table-data-row'>
            <td key={props._data._id+"checkbox"} className='customer-table-data-cell'><input type="checkbox" onChange={(e) => {props.checkbox(e); setDelivered(e.target.checked)}}/></td>
            <td key={props._data._id+props._data.name} className='customer-table-data-cell'>{props._data.name}</td>
            <td key={props._data._id+"address"} className='customer-table-data-cell'>{props._data.address}</td>
            <td key={props._data._id+"ice"} className='customer-table-data-cell'>{props._data.ice1}{props._data.ice2 === 0 || props._data.ice2 === ''  ? '' : `/${props._data.ice2}`}</td>
            <td key={props._data._id+"price"} className='customer-table-data-cell'>{props._data.price1}{props._data.price2 === 0 || props._data.price2 === '' ? '' : `/${props._data.price2}`}</td>
            <td key={props._data._id+"delivered"} className='customer-table-data-cell'>
                <input type="text" onChange={props.inputBox} placeholder={`${props._data.ice1}R Delivered`} readOnly={!delivered}/>
                {props._data.price2 === 0 || props._data.price2 === '' ? <></> : <input type="text" onChange={props.inputBox2} placeholder={`${props._data.ice2}R Delivered`} readOnly={!delivered}/>}</td>
            
        </tr>)
    
}

export default CheckInCustomer;