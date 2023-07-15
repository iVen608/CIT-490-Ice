import React from 'react';
import { Link } from 'react-router-dom';

function Routes(props){
    if(typeof(props._data._id) == "object"){
        return <></>
    }
    const link = `/routes/delivered/edit/${props._data._id}`;
    return (<tr key={props._data._id} className='customer-table-data-row'>
            <td key={props._data._id+props._data.name} className='customer-table-data-cell'><Link to={link} className='customer-table-data-link'>{props._data.name}</Link></td>
            <td key={props._data._id+props._data.date} className='customer-table-data-cell'>{`${new Date(props._data.date).getMonth() + 1}/${new Date(props._data.date).getDate()}/${new Date(props._data.date).getFullYear()}`}</td>
            <td key={props._data._id+"callins"} className='customer-table-data-cell'>{props.callins_length}</td>
            <td key={props._data._id+"delivered"} className='customer-table-data-cell'>{props.delivered_length}</td>
        </tr>);
}

export default Routes;