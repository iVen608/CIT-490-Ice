import React, { useState} from 'react';

function CheckInCustomer(props){
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
    if(props._savedData){
        return (
            <tr key={props._data._id} className='customer-table-data-row'>
                <td key={props._data._id+"checkbox"} className='customer-table-data-cell'><input type="checkbox" checked={delivered} disabled={props._edit} onChange={(e) => {props.checkbox(e); setDelivered(e.target.checked)}}/></td>
                <td key={props._data._id+props._data.name} className='customer-table-data-cell'>{props._data.name}</td>
                <td key={props._data._id+"address"} className='customer-table-data-cell'>{props._data.address}</td>
                <td key={props._data._id+"delivered"} className='customer-table-data-cell'>
                    <input type="number" className='table-input' onChange={props.inputBox} placeholder={`${props._data.ice1}R`} value={props._savedData.delivered} readOnly={!delivered}/>
                    {props._data.price2 === 0 || props._data.price2 === '' ? <></> : <input type="number" className='table-input' onChange={props.inputBox2} value={props._savedData.delivered2} placeholder={`${props._data.ice2}R`} readOnly={!delivered}/>}</td>
            </tr>)
    }else{
        return (
            <tr key={props._data._id} className='customer-table-data-row'>
                <td key={props._data._id+"checkbox"} className='customer-table-data-cell'><input type="checkbox" checked={delivered} disabled={props._edit} onChange={(e) => {props.checkbox(e); setDelivered(e.target.checked)}}/></td>
                <td key={props._data._id+props._data.name} className='customer-table-data-cell'>{props._data.name}</td>
                <td key={props._data._id+"address"} className='customer-table-data-cell'>{props._data.address}</td>
                <td key={props._data._id+"delivered"} className='customer-table-data-cell'>
                    <input type="number" className='table-input' onChange={props.inputBox} placeholder={`${props._data.ice1}R`} readOnly={!delivered}/>
                    {props._data.price2 === 0 || props._data.price2 === '' ? <></> : <input type="number" className='table-input' onChange={props.inputBox2} placeholder={`${props._data.ice2}R`} readOnly={!delivered}/>}</td>
            </tr>)
    }
    
    
}

export default CheckInCustomer;