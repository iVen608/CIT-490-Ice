import React, { useEffect, useState }  from 'react';
import CheckInCustomer from '../models/checkInViewRoute';
import "../styles/customerTable.css";
import '../styles/searchBar.css';
function CheckInForm(props){
    const [data, setData] = useState({});
    const [stopsData, setStopsData] = useState({});
    const [customers, setCustomers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if(!data.name){
            const token = window.localStorage.getItem("token");
            fetch(props.api + props._id, {method: 'GET', credentials: 'include', headers: {'Authorization': `Bearer ${token}`}})
            .then(response => response.json())
            .then(_data => {setData(_data[0]);})
            .catch(err => console.log("err"))  
        }else if(data.name && !customers[0]){
            const token = window.localStorage.getItem("token");
            fetch(props.api2, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(customers => {
                const filtered = customers.filter(i => data.stops.includes(i._id));
                setCustomers(filtered);
                setLoaded(true);
            }).catch(err => console.log(err));
        }
    });
    function updateCustomers(e, search, key, type){
        const index = customers.findIndex(element => element._id === search);
        let clone = [...customers];
        if(type === "check"){
            clone[index][key] = e.target.checked;
        }else{
            clone[index][key] = e.target.value;
        }
        
        setCustomers(clone);
    }
    return (<>
        <h1>Check In Route: {data.name}</h1>
        <table key="customer-table" className='customer-table'>
                <tr key="header-table-row" className='customer-table-header-row'>
                    {props.header_keys.map(v => {
                        return <th key={`header-${v}`} className='customer-table-header-cell'>{v}</th>
                    })}
                </tr>
                {loaded && customers.map((v) => 
                    {
                        return <CheckInCustomer 
                        _id={v._id} 
                        _data={v} 
                        checkbox={(e) => {updateCustomers(e, v._id,"completed", "check")}} 
                        inputBox={(e) => {updateCustomers(e, v._id,"delivered", "value")}}
                        inputBox2={(e) => {updateCustomers(e, v._id,"delivered2", "value")}}
                        />
                })}
                

            </table>
            <button onClick={e => {console.log(customers)}}>Click</button>
        {(!data[0] && !props) && <h1>Failed to load route</h1>}
    </>);
}

export default CheckInForm;