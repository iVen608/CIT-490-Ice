import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import '../styles/form.css';
import CustomerSmall from '../models/searchViewSmallCustomer';
import MyTableView from '../components/tableView';
import FormHeader from '../components/formHeader';
import {getJWT} from '../utility';

function RouterForm(props){
    const nav = useNavigate();
    const token = getJWT();
    const [data, setData] = useState({name: "", stops: []});
    const [search, setSearch] = useState([]);
    const [rep, setRep] = useState(null);
    const [selected, setSelected] = useState("");
    const [stops, setStops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [edit, setEdit] = useState(props.method === "PUT" ? true : false);
    const [response, setResponse] = useState({});

    async function updateData(){
        setProcessing(true);
        var link = "https://cit-490-ice.onrender.com/routes/";
        if(props._id){
            link += props._id;
        }
        console.log(JSON.stringify({
            "name": data.name,
            "stops": stops.map(i => i.id)
        }))
        await fetch(link, {
            method: props.method,
            body: JSON.stringify({
                "name": data.name,
                "stops": stops.map(i => i.id)
            }),
            headers: {'Content-type': "application/json", 'Authorization': `Bearer ${token}`},
            credentials: 'include'
        }).then(response => {
            if(response.ok){
                setRep(true);
                if(props._id){//PUT
                    window.location.reload(true);
                    setResponse({text: `Customer successfully ${props.method === 'POST' ? 'added' : 'updated'}.`, status: true});
                }else{//POST
                    setResponse({text: `Customer successfully ${props.method === 'POST' ? 'added' : 'updated'}.`, status: true});
                    setTimeout(() => {
                        nav("/routes/")
                    }, 3000);
                }
                
            }else{
                setResponse({text: `Unable to ${props.method === 'POST' ? 'add' : 'update'} route due to an error.`, status: false});
                setProcessing(false)
            }
        }).catch(err => {console.log(err); setRep(false); setProcessing(false)});
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!processing){
            updateData();
        }  
        
    }
    useEffect(() => {
            if(data.stops.length === 0 && edit){
                getRoute();
            }
            else if(stops.length === 0 && edit){
                getCustomers();
            }else {
                setLoading(true);
            }
        
    })
    async function getRoute(){
        await fetch("https://cit-490-ice.onrender.com/routes/"+props._id, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}})
            .then(response => response.json())
            .then(obj => {
                setData(obj[0]);
                console.log("fetching")
            }).catch(err => console.log(err));
    }
    async function getCustomers(){
        await fetch("https://cit-490-ice.onrender.com/customer/", {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(customers => {
            if(data.stops){
                const filtered = customers.filter(i => data.stops.includes(i._id))
                setStops(filtered.map(cus => {return {'id': cus._id, 'name': cus.name, 'address': cus.address}}));
                                setLoading(true);
                }
            }).catch(err => console.log("Error getting customers"));
            
    }
    function updateBox(e){
        console.log(stops.map(i => {
            return i.id
        }))
        fetch("https://cit-490-ice.onrender.com/customer/?search=" + e.target.value, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(obj => {setSearch(obj); console.log(obj)})
    }

    function handleDelete(e){
        e.preventDefault();
        deleteRoute()
    }

    async function deleteRoute(){
        await fetch(props.api + props._id, {
            method: 'DELETE',withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}
        ).then(response => {
            if(response.ok){
                setResponse({text: `Customer successfully deleted.`, status: true});
                setTimeout(() => {
                    nav("/routes/")
                }, 3000);
            }else{
                setResponse({text: `Unable to delete route due to an error.`, status: false});
            }
        }).catch(err => {setResponse({text: `Unable to delete route due to an error: ${err}.`, status: false});});
    }

    const toggle = () => {
        if(edit){
            setEdit(false);
        }else{
            setEdit(true);
        }
    }
    return (<>
        <FormHeader 
            title={props.method === 'POST' ? 'New Route' : 'Route Details'}
            element = "route"
            response={response} 
            toggle={toggle}
            delete={handleDelete}
            method={props.method}/>
        {loading && <form className='form' onSubmit={handleSubmit}>
            <input type="text" required className='form-text-input' name="name" placeholder='Route Name' readOnly={edit} value={data.name || ""}  onChange={e => {setData({...data, ['name'] : e.target.value})}}/>
            {!edit && <>
            <input type="text" className='form-text-input' name="customerName" placeholder='Add customer here' readOnly={edit} value={selected || ""}  onChange={e => {updateBox(e); setSelected(e.target.value)}}/>
            <h3>Customers:</h3>
            <div className='search-box-results'>
                {Object.keys(search).map((v) => 
                        {
                        return <CustomerSmall key={search._id} _data={search[v]} click={() => {
                            if(!stops.some(element => element.id === search[v]._id)){
                                setStops([...stops, {
                                    'id': search[v]._id,
                                    'name': search[v].name,
                                    'address': search[v].address,
                                    'city': search[v].city,
                                    'zip': search[v].zip,
                                    }]);
                            }
                        }}/>
                    })}
            </div></>}
            {loading === true && 
            <MyTableView 
                header_keys={["Name", "Address"]}
                data={stops}
                api=""
                wide={false}
                inForm={true}
                funct={(arr) => {
                    setStops(arr);
                }}
                model="routes"/>
            }
            {!edit && <button type="submit" disabled={processing} className='form-button-submit'>{!processing ? 'Submit' : 'Processing'}</button>}
        </form>}
        
            
    </>)
}

export default RouterForm;