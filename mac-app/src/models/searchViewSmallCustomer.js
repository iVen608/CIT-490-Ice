import React from 'react';

function SmallCustomerView(props){
    return (<div key={props._data_id} className="search-box-result-container">
                <button type="button" key={props._data._id+props._data.name} className='search-box-result-button' onClick={props.click}>{props._data.name}</button>
                <p key={props._data._id+"address"} className='search-box-result-address'>{props._data.address}</p>
            </div>);
}

export default SmallCustomerView;