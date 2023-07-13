import React, {useState, useEffect} from 'react'
import { Form, useParams, useNavigate } from 'react-router-dom';
import FormHeader from '../components/formHeader';
import '../styles/form.css';
import {getJWT} from '../utility';
import CallIn from '../models/searchViewSmallCustomer';

function CallInForm(props){
    const parameters = useParams();
    const nav = useNavigate();
    const token = getJWT();
    const [data, setData] = useState({})
    const [search, setSearch] = useState([]);
    const [rep, setRep] = useState(null);
    const [selected, setSelected] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [edit, setEdit] = useState(props.method === "PUT" ? true : false);
    const [response, setResponse] = useState({});
    async function updateData(){
        var link = "https://cit-490-ice.onrender.com/callin/";
        if(props._id){
            link += props._id;
        }
        console.log(selectedId)
        await fetch(link, {
            method: props.method,
            body: JSON.stringify({
                "name": selected,
                "address": selectedAddress,
                "customer_id": selectedId,
                "callDate": data.callDate,
                "serviceDate": data.serviceDate,
                "instructions": data.instructions || "",
                "completed": data.completed || false
            }),
            headers: {'Content-type': "application/json", 'Authorization': `Bearer ${token}`},
            credentials: 'include'
        }).then(response => {
            if(response.ok){
                setRep(true);
                if(props._id){
                    window.location.reload(true);
                    setResponse({text: `Call In successfully ${props.method === 'POST' ? 'added' : 'updated'}.`, status: true});
                }else{
                    setResponse({text: `Call In successfully ${props.method === 'POST' ? 'added' : 'updated'}.`, status: true});
                    setTimeout(() => {
                        nav("/callin/")
                    }, 3000);
                }
                
            }else{
                setResponse({text: `Unable to ${props.method === 'POST' ? 'add' : 'update'} call in due to an error.`, status: false});
            }
        }).catch(err => {console.log(err); setRep(false);});
    }
    function handleSubmit(e){
        e.preventDefault();  
        updateData();
    }
    function handleDelete(e){
        e.preventDefault();
        deleteCallIn()
    }
    useEffect(() => {
        console.log(data)
        if(props._id){
            fetch("https://cit-490-ice.onrender.com/callin/" + props._id, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}})
            .then(response => response.json())
            .then(obj => {
                setData(obj[0]); 
                setSelected(obj[0].name)
                setSelectedAddress(obj[0].address);
                setSelectedId(obj[0].customer_id);
            });
        }
        
    }, [])

    function updateBox(e){
        const token = window.localStorage.getItem("token");
        fetch("https://cit-490-ice.onrender.com/customer/?search=" + e.target.value, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(obj => {setSearch(obj)})
    }
    const toggle = () => {
        if(edit){
            setEdit(false);
        }else{
            setEdit(true);
        }
    }
    async function deleteCallIn(){
        await fetch(props.api + props._id, {
            method: 'DELETE',withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}
        ).then(response => {
            if(response.ok){
                setResponse({text: `Call In successfully deleted.`, status: true});
                setTimeout(() => {
                    nav("/callin/")
                }, 1500);
            }else{
                setResponse({text: `Unable to delete call in due to an error.`, status: false});
            }
        }).catch(err => {setResponse({text: `Unable to delete call in due to an error: ${err}.`, status: false});});
    }
    return (<>
        <FormHeader 
            title={props.method === 'POST' ? 'New Call In' : 'Call In Details'} 
            response={response} 
            toggle={toggle}
            delete={handleDelete}
            method={props.method}/>
        <form className='form' onSubmit={handleSubmit}>
            <input type="text" required className='form-text-input' name="name" placeholder='Customer Name' readOnly={edit} value={selected || data.name || ""}  onChange={e => {updateBox(e); setSelected(""); setData({...data, ['name'] : e.target.value})}}/>
            <input type="text" required className='form-text-input' name="address" placeholder='Address' readOnly={true} value={selectedAddress || data.address || ""}  onChange={e => {setSelected(""); setData({...data, ['address'] : e.target.value})}}/>
            {selected === "" && !edit && <label htmlFor='autofill'>Customers:</label> && <div className='search-box-results'>
                {Object.keys(search).map((v) => 
                        {
                        return <CallIn key={search._id} _data={search[v]} click={() => {
                            setSelected(search[v].name);
                            setSelectedId(search[v]._id); 
                            setSelectedAddress(search[v].address);
                            console.log(data);
                        }}/>
                    })}
            </div>}
            {props._id && <><label htmlFor='delCheck'>Delivered?</label><input type="checkbox" className='form-check-input' name="delCheck" checked={data.completed || false} disabled={edit} onChange={e => setData({...data, ["completed"] : e.target.checked})}/></>}
            <label htmlFor='callDate'>Called in:</label>
            <input type="date" required className='form-text-input' name="callDate" placeholder='callDate' readOnly={edit} value={data.callDate || ""}  onChange={e => setData({...data, ["callDate"] : e.target.value})}/>
            <label htmlFor='serviceDate'>Estimated Delivery:</label>
            <input type="date" required className='form-text-input' name="serviceDate" placeholder='serviceDate' readOnly={edit} value={data.serviceDate || ""}  onChange={e => setData({...data, ["serviceDate"] : e.target.value})}/>
            <label htmlFor='instructions'>Special Inustrictions:</label>
            <input type="text" className='form-text-input' name="instructions" placeholder='instructions' readOnly={edit} value={data.instructions || ""}   onChange={e => setData({...data, ["instructions"] : e.target.value})}/>
            <input type="hidden" value={selectedId || data.customer_id || ""} name="_id"/>
            {!edit && <button type="submit" className='form-button-submit'>Submit</button>}
        </form>
        
    </>)
}

export default CallInForm;