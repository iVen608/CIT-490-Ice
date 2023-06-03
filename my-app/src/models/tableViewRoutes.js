import React from 'react';
import { Link } from 'react-router-dom';

function Routes(props){
    if(typeof(props._data._id) == "object"){
        return <></>
    }
    const link = `/routes/edit/${props._data._id}`;
    return (<tr key={props._data._id} className='customer-table-data-row'>
            <td key={props._data._id+props._data.name} className='customer-table-data-cell'><Link to={link} className='customer-table-data-link'>{props._data.name}</Link></td>
        </tr>);
}

export default Routes;