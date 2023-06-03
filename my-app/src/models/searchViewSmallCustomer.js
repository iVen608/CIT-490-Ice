import React from 'react';
import { Link } from 'react-router-dom';

function CallIn(props){
    return (<>
            <button type="button" key={props._data._id+props._data.name} className='customer-table-data-cell' onClick={props.click}>{props._data.name}</button>
            <p key={props._data._id+"address"} className='customer-table-data-cell'>{props._data.address}</p>
            </>);
}

export default CallIn;