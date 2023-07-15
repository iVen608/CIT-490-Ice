import React from 'react';
import { Link } from 'react-router-dom';

function CallIn(props){
    if(typeof(props._data._id) == "object"){
        return <></>
    }
    const link = `/callin/edit/${props._data._id}`;
    return (<tr key={props._data._id} className='customer-table-data-row'>
            <td key={props._data._id+props._data.name} className='customer-table-data-cell'><Link to={link} className='customer-table-data-link'>{props._data.name}</Link></td>
            <td key={props._data._id+"address"} className='customer-table-data-cell'>{props._data.address}</td>
            <td key={props._data._id+"callDate"} className='customer-table-data-cell'>{props._data.callDate}</td>
            <td key={props._data._id+"serviceDate"} className='customer-table-data-cell'>{props._data.serviceDate}</td>
            <td key={props._data._id+"del"} className='customer-table-data-cell'>{props._data.completed === false ? '' : 'DONE'}</td>
            <td key={props._data._id+"instructions"} className='customer-table-data-cell'>{props._data.instructions}</td>

        </tr>);
}

export default CallIn;