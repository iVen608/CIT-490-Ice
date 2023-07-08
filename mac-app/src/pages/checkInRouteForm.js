import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import CheckInCustomer from '../models/checkInViewRoute';
import CheckInCallIn from '../models/checkInViewCall';
import CustomerSmall from '../models/searchViewSmallCustomer';
import FormHeader from '../components/formHeader';
import CheckInTable from '../models/checkInTableCallIn';
import {getJWT} from '../utility';
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
    const [savedDeliveries, setSavedDeliveries] = useState([]);
    const [savedCallins, setSavedCallins] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [edit, setEdit] = useState(props.method === "PUT" ? true : false);
    const [response, setResponse] = useState({});
    const [processing, setProcessing] = useState(false);
    const nav = useNavigate();
    const token = getJWT();
    async function updateData(){
        setProcessing(true)
        var link = "http://localhost:4000/routes/checkin/";
        if(props._id){
            link += props._id;
        }
        await fetch(link, {
            method: props.method,
            body: props.method === "PUT" ? JSON.stringify({...savedRoute, 
                addedStops: [...addedSearch, ...customers].filter(stop => stop.completed).map(stop => {return  {
                    _id: stop._id,
                    delivered: stop.delivered || '',
                    delivered2: stop.delivered2 || '' 
            }}),
                addedCallIns: callins.filter(call => call.completed)
                .map(call => {
                    return {
                        _id: call._id,
                        customer_id: call.customer_id,
                        delivered: call.delivered || '',
                        delivered2: call.delivered2 || '' 
                    }
                })}) : JSON.stringify({
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
                    headers: {'Content-type': "application/json", 'Authorization': `Bearer ${token}`},
                    credentials: 'include'
        }).then(response => {
            if(response.ok){
                console.log("ok")
                console.log(props._id)
                if(props._id){//PUT
                    window.location.reload(true);
                }else{//POST
                    nav("/routes/delivered/");
                }
                
            }else{
                console.log(response);
                setProcessing(false);
            }
        }).catch(err => {console.log(err); setProcessing(false);}); //setRep(false);});
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
            }else if(data.name && callinsLoaded && !loaded){
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
                
            }
        }
        console.log('Data:')
        console.log(data)
        console.log('CallIns')
        console.log(callins)
        console.log('Customers')
        console.log(customers)
        console.log('Saved Route')
        console.log(savedRoute)
        console.log('Saved Callins')
        console.log(savedCallins)
        console.log('Saved Del')
        console.log(savedDeliveries)
        console.log({...savedRoute, 
            addedStops: [...addedSearch, ...customers].filter(stop => stop.completed).map(stop => {return  {
                _id: stop._id,
                delivered: stop.delivered || '',
                delivered2: stop.delivered2 || '' 
        }}),
            addedCallIns: callins.filter(call => call.completed)
            .map(call => {
                return {
                    _id: call._id,
                    customer_id: call.customer_id,
                    delivered: call.delivered || '',
                    delivered2: call.delivered2 || '' 
                }
            })})
    });

    function getRouteDetails(token, id=false){
        const _id = id === false ? props._id : id;
        console.log(props.api + _id)
        fetch(props.api + _id, {method: 'GET', credentials: 'include', headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(_data => {
                    setData(_data[0])
                })
                .catch(err => console.log(err))
    }

    function getSavedRouteDetails(token){
        console.log(props.api4 + props._id)
        fetch(props.api4 + props._id, {method: 'GET', credentials: 'include', headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(_data => {
                    console.log(_data)
                    setSavedRoute(_data[0])
                    setSavedDeliveries(_data[0].delivered)
                    setSavedCallins(_data[0].callins)
                
                })
                .catch(err => console.log("err"))
    }

    function getCallins(token){
        console.log(props.api3)
        fetch(props.api3, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(calls => {
            const filtered = calls.filter(call => call.completed === false);
            setCallIns(filtered);
            setCallInsLoaded(true);
        }).catch(err => console.log(err));
    }

    function getFilteredCustomers(token){
        fetch(props.api2, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(customers => {
            const filtered = customers.filter(i => data.stops.includes(i._id));
            setCallIns(prev => prev.map(element => {
                const index = customers.findIndex(customer => customer._id === element.customer_id);
                if(index > -1){
                    console.log(123)
                    element.ice1 = customers[index].ice1;
                    element.ice2 = customers[index].ice2;
                }
                return element;
            }))
            
            if(savedCallins[0]){
                setSavedCallins(prev => prev.map(element => {
                    const index = customers.findIndex(customer => customer._id === element.customer_id);
                    if(index > -1){
                        element.ice1 = customers[index].ice1;
                        element.ice2 = customers[index].ice2;
                        element.address = customers[index].address;
                        element.name = customers[index].name;
                    }
                    return element;
                }))
            }
            if(savedDeliveries[0]){
                const filtered2 = savedDeliveries.filter(element => !data.stops.includes(element._id))
                console.log("Filtering")
                const filtered3 = customers.filter(i => filtered2.some(j => j._id === i._id));
                console.log()
                setCustomers([...filtered,...filtered3]);
            }else{
                setCustomers(filtered);
            }
            setLoaded(true);
        }).catch(err => console.log(err));
    }
    function updateCustomers(e, search, key, type){
        setCustomers(prev => prev.map(customer => {
            if(customer._id === search){
                customer[key] = type === "check" ? e.target.checked : e.target.value;
            }
            return customer;
        }));
    }
    function updateCallIn(e, search, key, type){
        setCallIns(prev => prev.map(call => {
            if(call._id === search){
                call[key] = type === "check" ? e.target.checked : e.target.value;
            }
            return call;
        }));
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
    function updateSavedCustomers(e, search, key, type){
        const index = savedDeliveries.findIndex(element => element._id === search);
        if(index > -1){
            setSavedDeliveries(prev => prev.map(element => {
                if(element._id === search){
                    if(type === "check"){
                        element.action = e.target.checked ? "update" : "pass"
                    }else{
                        element[key] = e.target.value;
                        if(e.target.value < 0){
                            element.action = 'delete'
                        }
                    }
                }
                return element;
            }))
        }else{
            updateCustomers(e, search, key, type);
        }
    }
    function updateSavedCallIn(e, search, key, type){
        const index = savedCallins.findIndex(element => element._id === search);
        if(index > -1){
            setSavedCallins(prev => prev.map(element => {
                if(element._id === search){
                    if(type === "check"){
                        element.action = e.target.checked ? "update" : "pass"
                    }else{
                        element[key] = e.target.value;
                        if(e.target.value < 0){
                            element.action = 'delete'
                        }
                    }
                }
                return element;
            }))
        }else{
            updateCustomers(e, search, key, type);
        }
    }
    
    function updateBox(e){
        const token = window.localStorage.getItem("token");
        fetch("http://localhost:4000/customer/?search=" + e.target.value, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(obj => {setSearch(obj); console.log(obj)})
    }
    const toggle = () => {
        if(edit){
            setEdit(false);
        }else{
            setEdit(true);
        }
    }
    async function deleteCheckIn(){
        console.log("http://localhost:4000/routes/checkin/" + props._id)
        await fetch("http://localhost:4000/routes/checkin/" + props._id, {
            method: 'DELETE',withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}
        ).then(response => {
            if(response.ok){
                setResponse({text: `Delivery history successfully deleted.`, status: true});
                setTimeout(() => {
                    nav("/routes/delivered/")
                }, 1500);
            }else{
                setResponse({text: `Unable to delete customer due to an error.`, status: false});
            }
        }).catch(err => {setResponse({text: `Unable to delete customer due to an error: ${err}.`, status: false});});
    }
    function handleDelete(e){
        e.preventDefault();
        deleteCheckIn()
    }
    return (<>
        <FormHeader 
            title={props.method === 'POST' ? `Check In Route: ${data.name || ""}` : 'Update Deliveries'} 
            response={response} 
            toggle={toggle}
            delete={handleDelete}
            method={props.method}/>
    
        <div className='form'>
        
        <h3 className='blue-text'>Route</h3>
        <table key="customer-table" className='small-customer-table span-two'>
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
                                _edit = {edit}  
                                checkbox={(e) => {updateSavedCustomers(e, v._id,"completed", "check")}} 
                                inputBox={(e) => {updateSavedCustomers(e, v._id,"delivered", "value")}}
                                inputBox2={(e) => {updateSavedCustomers(e, v._id,"delivered2", "value")}}
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
            </table>
            {loaded && addedSearch[0] &&  <>
                <h3 className='blue-text'>Added Stops</h3>
                <CheckInTable 
                    _data={addedSearch}
                    _model="customer"
                    _headers={["Selected", "Name", "Address", "Ice", "Price", "Delivered"]}
                    _function={updateAddedSearch}
                    _edit={edit}/>
            </>}
            {!edit && <>
                <h3 className='blue-text'>Add Customers</h3>
                <input type="text" className='form-text-input' name="customerName" placeholder='Add customer here' readOnly={props._edit} value={selected || ""}  onChange={e => {updateBox(e); setSelected(e.target.value)}}/>
                <div className='search-box-results'>
                    {Object.keys(search).map((v) => 
                        {
                        return <CustomerSmall key={search._id} _data={search[v]} click={() => {
                            if(!addedSearch.some(element => element._id === search[v]._id) && !customers.some(element => element._id === search[v]._id)){
                                setAddedSearch([...addedSearch, 
                                    search[v]
                                    ]);
                            }
                        }}/>
                })}
            </div></>}
            {loaded && !edit && callins[0] && <>
                <h3 className='blue-text'>Call Ins</h3>
                <CheckInTable 
                    _data={callins}
                    _model="call"
                    _headers={["Selected", "Name", "Address", "Call Date", "Service Date", "Delivered"]}
                    _function={updateCallIn}
                    _edit={edit}/></>}
           
            {loaded && savedCallins[0] && <> 
                <h3 className='blue-text'>Delivered Call Ins</h3>
                <CheckInTable 
                    _data={savedCallins}
                    _model="call"
                    _headers={["Selected", "Name", "Address", "Call Date", "Service Date", "Delivered"]}
                    _function={updateSavedCallIn}
                    _edit={edit}/></>}
            {!edit && <button type="submit" disabled={processing} onClick={handleSubmit} className='form-button-submit'>{!processing ? 'Submit' : 'Processing'}</button>}
        {(!data[0] && !props) && <h1>Failed to load route</h1>}
    </div></>);
}

export default CheckInForm;