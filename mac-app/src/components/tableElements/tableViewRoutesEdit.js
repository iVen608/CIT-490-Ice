import React from 'react';
import { Link } from 'react-router-dom';
import { formatAddress } from '../../utility';

function Routes(props){
    if(typeof(props._data._id) == "object"){
        return <></>
    }
    return (<tr key={props._data._id} className='customer-table-data-row'>
            <button type="button" key={props._data._id+props._data.name} className='search-box-result-button' onClick={props.click}>{props._data.name}</button>
            <td key={props._data._id+props._data.address} className='customer-table-data-cell'>{props._data.address}</td>
        </tr>);
}

export default Routes;