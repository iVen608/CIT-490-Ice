import React, { useEffect, useState }  from 'react';
import CheckInCustomer from '../models/checkInViewRoute';
import CheckInCallIn from '../models/checkInViewCall';
import CustomerSmall from '../models/searchViewSmallCustomer';
import "../styles/customerTable.css";
import '../styles/searchBar.css';
function CheckInForm(props){
    const [data, setData] = useState({});
    const [savedRoute, setSavedRoute] = useState({});
    const [search, setSearch] = useState([]);
    const [addedSearch, setAddedSearch] = useState([]);
    const [callins, setCallIns] = useState([]);
    const [callinsLoaded, setCallInsLoaded] = useState(false);
    const [selected, setSelected] = useState("");
    const [customers, setCustomers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    async function updateData(){
        var link = "http://localhost:4000/routes/checkin/";
        if(props._id){
            link += props._id;
        }
        await fetch(link, {
            method: props.method,
            body: JSON.stringify({
                "name": data.name,
                "route_id": props._id,
                "delivered": [...customers, ...addedSearch]
                .filter(customer => customer.completed)
                .map(i => {return {
                    _id: i._id,
                    delivered: i.delivered || '',
                    delivered2: i.delivered2 || ''
                    }}),
                "callins": callins.filter(call => call.completed)
                .map(call => {
                    return {
                        _id: call._id,
                        customer_id: call.customer_id,
                        delivered: call.delivered || '',
                        delivered2: call.delivered2 || '' 
                    }
                })}),
            headers: {'Content-type': "application/json"}
        }).then(response => {
            if(response.ok){
                //setRep(true);
                if(props._id){//PUT
                    window.location.reload(true);
                }else{//POST
                    //nav("/routes/")
                }
                
            }else{
                console.log(response);
                //setRep(false);
            }
        }).catch(err => {console.log(err);}); //setRep(false);});
    }
    function handleSubmit(e){
        e.preventDefault();  
        updateData();
    }

    useEffect(() => {
        if(props.method === "POST"){
            const token = window.localStorage.getItem("token");
            if(!data.name){
                getRouteDetails(token);
            }else if(data.name && !callinsLoaded){
                getCallins(token);
            }else if(data.name && callinsLoaded && loaded === false){
                getFilteredCustomers(token);
            }
        }else{
            const token = window.localStorage.getItem("token");
            if(!savedRoute.name){
                getSavedRouteDetails(token);
            }else if(savedRoute.name && !data.name){
                getRouteDetails(token, savedRoute.route_id);
            }
            else if(data.name && !callinsLoaded){
                getCallins(token);
            }else if(data.name && callinsLoaded && loaded === false){
                getFilteredCustomers(token);
                console.log(savedRoute)
                console.log(savedRoute.callins[0])
            }
        }
    });

    function getRouteDetails(token, id=false){
        const _id = id === false ? props._id : id;
        fetch(props.api + _id, {method: 'GET', credentials: 'include', headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(_data => {setData(_data[0])})
                .catch(err => console.log(err))
    }

    function getSavedRouteDetails(token){
        console.log(props.api4 + props._id)
        fetch(props.api4 + props._id, {method: 'GET', credentials: 'include', headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(_data => {setSavedRoute(_data[0])})
                .catch(err => console.log("err"))
    }

    function getCallins(token){
        fetch(props.api3, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(calls => {
            const filtered = calls.filter(call => call.completed === false);
            setCallIns(filtered);
            setCallInsLoaded(true);
        }).catch(err => console.log(err));
    }

    function getFilteredCustomers(token){
        fetch(props.api2, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(customers => {
            const filtered = customers.filter(i => data.stops.includes(i._id));
            var clone = [...callins];
            clone.forEach(element => {
                const index = customers.filter(customer => customer._id === element.customer_id)
                element.ice1 = index[0].ice1;
                element.ice2 = index[0].ice2;
            })
            setCustomers(filtered);
            setLoaded(true);
        }).catch(err => console.log(err));
    }
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
    function updateCallIn(e, search, key, type){
        const index = callins.findIndex(element => element._id === search);
        let clone = [...callins];
        if(type === "check"){
            clone[index][key] = e.target.checked;
        }else{
            clone[index][key] = e.target.value;
        }
        setCallIns(clone);
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
        <h1>Check In Route: {data.name || ""}</h1>
        <table key="customer-table" className='customer-table'>
                <tr key="header-table-row" className='customer-table-header-row'>
                    {props.header_keys.map(v => {
                        return <th key={`header-${v}`} className='customer-table-header-cell'>{v}</th>
                    })}
                </tr>
                {loaded && customers.map((v) => 
                    {
                        if(savedRoute.delivered){
                            return <CheckInCustomer 
                                _id={v._id} 
                                _data={v} 
                                checkbox={(e) => {updateCustomers(e, v._id,"completed", "check")}} 
                                inputBox={(e) => {updateCustomers(e, v._id,"delivered", "value")}}
                                inputBox2={(e) => {updateCustomers(e, v._id,"delivered2", "value")}}
                                _savedData = {savedRoute.delivered.findIndex(element => element._id === v._id) > -1 ? savedRoute.delivered[savedRoute.delivered.findIndex(element => element._id === v._id)] : false}
                                delete={false}
                            />
                        }
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
                {loaded && savedRoute.callins.map(v => {
                    return <CheckInCallIn 
                    _id={v._id} 
                    _data={v} 
                    checkbox={(e) => {updateAddedSearch(e, v._id,"completed", "check")}} 
                    inputBox={(e) => {updateAddedSearch(e, v._id,"delivered", "value")}}
                    inputBox2={(e) => {updateAddedSearch(e, v._id,"delivered2", "value")}}
                    delete={true}
                    />
                })}
                {loaded && callins.map((v) => 
                    {
                        return <CheckInCallIn 
                        _id={v._id} 
                        _data={v} 
                        checkbox={(e) => {updateCallIn(e, v._id,"completed", "check")}} 
                        inputBox={(e) => {updateCallIn(e, v._id,"delivered", "value")}}
                        inputBox2={(e) => {updateCallIn(e, v._id,"delivered2", "value")}}
                        delete={false}
                        />
                })}
            </table>
            <button onClick={handleSubmit}>Click</button>
        {(!data[0] && !props) && <h1>Failed to load route</h1>}
    </>);
}

export default CheckInForm;