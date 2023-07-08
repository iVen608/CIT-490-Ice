import React from 'react';
import CheckInCallIn from './checkInViewCall';
import CheckInCustomer from './checkInViewRoute';
function CheckInTable(props){
    return(<table key="callin-table" className='small-customer-table span-two'>
        <tr key="header-table-row" className='customer-table-header-row'>
            {props._headers.map(v => {
                return <th key={`header-${v}`} className='customer-table-header-cell'>{v}</th>
            })}
        </tr>
        {props._data[0] && props._data.map((v) => 
            {
                if(props._model === "call"){
                    return <CheckInCallIn 
                        _id={v._id} 
                        _data={v}
                        _edit = {props._edit} 
                        checkbox={(e) => {props._function(e, v._id,"completed", "check")}} 
                        inputBox={(e) => {props._function(e, v._id,"delivered", "value")}}
                        inputBox2={(e) => {props._function(e, v._id,"delivered2", "value")}}
                        delete={props._delete}
                    />
                }else{
                    return <CheckInCustomer 
                        _id={v._id} 
                        _data={v} 
                        _edit = {props._edit} 
                        checkbox={(e) => {props._function(e, v._id,"completed", "check")}} 
                        inputBox={(e) => {props._function(e, v._id,"delivered", "value")}}
                        inputBox2={(e) => {props._function(e, v._id,"delivered2", "value")}}
                        delete={props._delete}
                    />
                }
            }
        )}
    </table>)
}

export default CheckInTable;