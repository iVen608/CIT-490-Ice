import React, {useState, useEffect} from 'react'
import { Form, useParams, useNavigate } from 'react-router-dom';
import '../styles/customerAddForm.css';
import CallIn from '../models/searchViewSmallCustomer';

function CallInForm(props){
    const parameters = useParams();
    const nav = useNavigate();
    const [data, setData] = useState({})
    const [search, setSearch] = useState([]);
    const [rep, setRep] = useState(null);
    const [selected, setSelected] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedId, setSelectedId] = useState("");
    async function updateData(){
        var link = "https://cit-490-ice.onrender.com/routes/";
        if(props._id){
            link += props._id;
        }
        await fetch(link, {
            method: props.method,
            body: JSON.stringify({
                "name": selected,
                "address": selectedAddress,
                "customer_id": selectedId,
                "callDate": data.callDate,
                "serviceDate": data.serviceDate,
                "instructions": data.instructions || "",
                "completed": data.completed || false,
            }),
            headers: {'Content-type': "application/json"}
        }).then(response => {
            if(response.ok){
                setRep(true);
                if(props._id){
                    window.location.reload(true);
                }
                
            }else{
                console.log(response);
                setRep(false);
            }
        }).catch(err => {console.log(err); setRep(false);});
    }
    function handleSubmit(e){
        e.preventDefault();  
        updateData();
    }
    useEffect(() => {
        if(props._id){
            fetch("https://cit-490-ice.onrender.com/callin/" + props._id)
            .then(response => response.json())
            .then(obj => {
                setData(obj[0]); 
                setSelected(obj[0].name)
                setSelectedAddress(obj[0].address);
                setSelectedId(props._id);
            });
        }
    }, [])

    function updateBox(e){
        fetch("https://cit-490-ice.onrender.com/customer/?search=" + e.target.value).then(response => response.json()).then(obj => {setSearch(obj)})
    }
    return (<>
        {rep === true && <h1>Successfully updated call-in</h1>}
        {rep === false && <h1>Failed to add call-in, please try again</h1>}
        <form className='customer-form' onSubmit={handleSubmit}>
            <label htmlFor='name'>Customer name:</label>
            <input type="text" required className='customer-form-text-input' name="name" placeholder='name' readOnly={props._edit} value={selected || data.name || ""}  onChange={e => {updateBox(e); setSelected(""); setData({...data, ['name'] : e.target.value})}}/>
            <label htmlFor='address'>Address:</label>
            <input type="text" required className='customer-form-text-input' name="address" placeholder='address' readOnly={props._edit} value={selectedAddress || data.address || ""}  onChange={e => {setSelected(""); setData({...data, ['address'] : e.target.value})}}/>
            {selected === "" && !props._edit && <label htmlFor='autofill'>Customers:</label> && <div className='search-box-results'>
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
            {props._id && <><label htmlFor='delCheck'>Delivered?</label><input type="checkbox" className='customer-form-check-input' name="delCheck" checked={data.completed || false} disabled={props._edit} onChange={e => setData({...data, ["completed"] : e.target.checked})}/></>}
            <label htmlFor='callDate'>Called in:</label>
            <input type="date" required className='customer-form-text-input' name="callDate" placeholder='callDate' readOnly={props._edit} value={data.callDate || ""}  onChange={e => setData({...data, ["callDate"] : e.target.value})}/>
            <label htmlFor='serviceDate'>Estimated Delivery:</label>
            <input type="date" required className='customer-form-text-input' name="serviceDate" placeholder='serviceDate' readOnly={props._edit} value={data.serviceDate || ""}  onChange={e => setData({...data, ["serviceDate"] : e.target.value})}/>
            <label htmlFor='instructions'>Special Inustrictions:</label>
            <input type="text" className='customer-form-text-input' name="instructions" placeholder='instructions' readOnly={props._edit} value={data.instructions || ""}   onChange={e => setData({...data, ["instructions"] : e.target.value})}/>
            <input type="hidden" value={selectedId || data.customer_id || ""} name="_id"/>
            {!props._edit && <button type="submit" className='customer-form-button-submit'>Submit</button>}
        </form>
        
    </>)
}

export default CallInForm;