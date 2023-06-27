import {React, useState, useEffect} from 'react';
import {getJWT} from '../utility';

function CustomerHistory(props){
    const [count, setCount] = useState(5);
    const [history, setHistory] = useState([]);
    const token = getJWT();
    useEffect(() => {
        if(count > 0){
            fetch(props.api + props._id + `?count=${count}`, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(obj => {setHistory(obj); console.log(obj)});
        }
    }, [count])
   
    return (
        <div className='history'>
            <h1 className='form-title'>Past Deliveries</h1>
            <input type="number" className='form-text-input delivery-count' name="count" value={count || 5} onChange={e => setCount(e.target.value)}/>
            <div className='delivery-container'>
                {history[0] && history.map(stop => {
                        if(stop.date){
                            const _date = new Date(stop.date);
                            const _year = _date.getFullYear();
                            const _month = _date.getMonth() + 1;
                            const _day = _date.getDate();
                            const _formattedDate = `${_month}/${_day}/${_year}`;
                            return <p className='delivery'><span className='delivery-info'>{`${_formattedDate}`}</span><span className='delivery-info'>{`${stop.delivered !== "" ? `${stop.delivered} bags` : ""}${stop.delivered2 !== "" ? ` | ${stop.delivered2} bags` : ""}`}</span></p>
                        }else{
                            return <p className='delivery'><span className='delivery-info'>Unknown Date: </span><span className='delivery-info'>{`${stop.delivered !== "" ? `${stop.delivered} bags` : ""}${stop.delivered2 !== "" ? ` | ${stop.delivered2} bags` : ""}`}</span></p>
                        }
                    })}
                {
                    !history[0] &&  <p className='delivery'>No delivery histories are present</p>
                }
            </div>
            
        </div>
    )
}

export default CustomerHistory;