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
        <>
            <input type="number" className='form-text-input' name="count" value={count || 5} onChange={e => setCount(e.target.value)}/>
            <ul>
                
            </ul>
            {history[0] && history.map(stop => {
                    if(stop.date){
                        console.log(stop.date);
                        const _date = new Date(stop.date);
                        console.log(_date);
                        const _year = _date.getFullYear();
                        const _month = _date.getMonth() + 1;
                        console.log(_month);
                        const _day = _date.getDate();
                        const _formattedDate = `${_month}/${_day}/${_year}`;
                        return <li>{`${_formattedDate}: ${stop.delivered !== "" ? stop.delivered : ""}${stop.delivered2 !== "" ? ` | ${stop.delivered2}` : ""}`}</li>
                    }else{
                        return <li>{`Unknown Date: ${stop.delivered !== "" ? stop.delivered : ""}${stop.delivered2 !== "" ? ` | ${stop.delivered2}` : ""}`}</li>
                    }
                })}
        </>
    )
}

export default CustomerHistory;