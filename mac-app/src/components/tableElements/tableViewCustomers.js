import React from 'react';
import { Link } from 'react-router-dom';
import { formatAddress, formatDollar } from '../../utility';

function Customer(props){
    if(typeof(props._data._id) == "object"){
        return <></>
    }
    const link = `/customer/edit/${props._data._id}`;
    return (<tr key={props._data._id} className='customer-table-data-row'>
            <td key={props._data._id+props._data.name} className='customer-table-data-cell'><Link to={link} className='customer-table-data-link'>{props._data.name}</Link></td>
            <td key={props._data._id+"address"} className='customer-table-data-cell'>{formatAddress(props._data.address, props._data.city, props._data.zip)}</td>
            <td key={props._data._id+"ice"} className='customer-table-data-cell'>{props._data.ice1}{props._data.ice2 === 0 || props._data.ice2 === '' ? '' : ` | ${props._data.ice2}`}</td>
            <td key={props._data._id+"price"} className='customer-table-data-cell'>{formatDollar(props._data.price1)}{props._data.price2 === 0 || props._data.price2 === "" ? '' : ` | ${formatDollar(props._data.price2)}`}</td>
            <td key={props._data._id+"tax"} className='customer-table-data-cell'>{props._data.tax === false ? '' : 'Y'}</td>
            <td key={props._data._id+"del"} className='customer-table-data-cell'>{props._data.delivery === false ? '' : 'Y'}</td>
        </tr>);
}

export default Customer;
