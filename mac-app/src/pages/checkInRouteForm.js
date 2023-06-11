import React, { useEffect, useState }  from 'react';
import CheckInCustomer from '../models/checkInViewRoute';
import CustomerSmall from '../models/searchViewSmallCustomer';
import "../styles/customerTable.css";
import '../styles/searchBar.css';
function CheckInForm(props){
    const [data, setData] = useState({});
    const [search, setSearch] = useState([]);
    const [addedSearch, setAddedSearch] = useState([]);
    const [callins, setCallIns] = useState([]);
    const [selected, setSelected] = useState("");
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
            }).catch(err => console.log(err));
            fetch(props.api3, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(calls => {
                const filtered = calls.filter(call => !call.completed).map(i => {return [...calls, {customer_id:i.customer_id, _id: i._id}]});
                console.log(filtered);
                setCallIns(filtered);
            }).catch(err => console.log(err));
        }else if(data.name && callins[0] && !loaded){
            const token = window.localStorage.getItem("token");
            fetch(props.api2, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(x => {
                const filtered = x.filter(i => callins.filter(call => {console.log(call);return call._id === i._id}).includes(i._id)).map(i => {return {...i, callin: true}});
                console.log(filtered);
                setCallIns(filtered);
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
    function updateAddedSearch(e, search, key, type){
        const index = addedSearch.findIndex(element => element._id === search);
        let clone = [...addedSearch];
        if(type === "check"){
            clone[index][key] = e.target.checked;
        }else{
            clone[index][key] = e.target.value;
        }
        setAddedSearch(clone);
    }
    function updateBox(e){
        const token = window.localStorage.getItem("token");
        fetch("http://localhost:4000/customer/?search=" + e.target.value, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(obj => {setSearch(obj); console.log(obj)})
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
                        delete={false}
                        />
                })}
                <br/>
                {loaded && addedSearch.map((v) => 
                    {
                        return <CheckInCustomer 
                        _id={v._id} 
                        _data={v} 
                        checkbox={(e) => {updateAddedSearch(e, v._id,"completed", "check")}} 
                        inputBox={(e) => {updateAddedSearch(e, v._id,"delivered", "value")}}
                        inputBox2={(e) => {updateAddedSearch(e, v._id,"delivered2", "value")}}
                        delete={true}
                        />
                })}
            </table>
            <input type="text" className='form-text-input' name="customerName" placeholder='Add customer here' readOnly={props._edit} value={selected || ""}  onChange={e => {updateBox(e); setSelected(e.target.value)}}/>
            <h3>Customers:</h3>
            <div className='search-box-results'>
                {Object.keys(search).map((v) => 
                        {
                        return <CustomerSmall key={search._id} _data={search[v]} click={() => {
                            if(!addedSearch.some(element => element._id === search[v]._id) && !customers.some(element => element._id === search[v]._id)){
                                setAddedSearch([...addedSearch, 
                                    search[v]
                                    ]);
                            }else{
                                console.log("customer is already on route sheet or added")
                            }
                        }}/>
                    })}
            </div>
            <table key="callin-table" className='customer-table'>
                <tr key="header-table-row" className='customer-table-header-row'>
                    {props.header_keys.map(v => {
                        return <th key={`header-${v}`} className='customer-table-header-cell'>{v}</th>
                    })}
                </tr>
                {loaded && callins.map((v) => 
                    {
                        return <CheckInCustomer 
                        _id={v._id} 
                        _data={v} 
                        checkbox={(e) => {updateCustomers(e, v._id,"completed", "check")}} 
                        inputBox={(e) => {updateCustomers(e, v._id,"delivered", "value")}}
                        inputBox2={(e) => {updateCustomers(e, v._id,"delivered2", "value")}}
                        delete={false}
                        />
                })}
            </table>
            <button onClick={e => {console.log(addedSearch)}}>Click</button>
        {(!data[0] && !props) && <h1>Failed to load route</h1>}
    </>);
}

export default CheckInForm;