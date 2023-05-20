import React from 'react';
import { Link } from 'react-router-dom';

function Customer(props){
    const link = `/customer/${props._data._id}`;
    return (<tr>
            <Link to={link}>{props._data.name}</Link>
            <td>{props._data.address}</td>
            <td>{props._data.ice1}{props._data.ice2 === 0 ? '' : `/${props._data.ice2}`}</td>
            <td>{props._data.price1}{props._data.price2 === 0 ? '' : `/${props._data.price2}`}</td>
            <td>{props._data.tax === false ? '' : 'Y'}</td>
            <td>{props._data.delivery === false ? '' : 'Y'}</td>
            <td>{props._data.po}</td>
            <td>{props._data.job}</td>
        </tr>);
}

export default Customer;