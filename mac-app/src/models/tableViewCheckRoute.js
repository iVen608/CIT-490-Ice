import React from 'react';
import { Link } from 'react-router-dom';

function Routes(props){
    if(typeof(props._data._id) == "object"){
        return <></>
    }
    const link = `/routes/checkin/${props._data._id}`;
    return (<tr key={props._data._id} className='customer-table-data-row'>
            <td key={props._data._id+props._data.name} className='customer-table-data-cell'><Link to={link} className='customer-table-data-link'>{props._data.name}</Link></td>
            {props._data.stops && <td key={props._data._id+"stops"} className='customer-table-data-cell'>{props._data.stops.length || 0}</td>}
        </tr>);
}

export default Routes;