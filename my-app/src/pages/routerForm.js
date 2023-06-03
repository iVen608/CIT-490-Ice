import React, {useState, useEffect} from 'react'
import { Form, useParams, useNavigate } from 'react-router-dom';
import '../styles/customerAddForm.css';
import CustomerSmall from '../models/searchViewSmallCustomer';

function RouterForm(props){
    const parameters = useParams();
    const nav = useNavigate();
    const [data, setData] = useState({});
    const [search, setSearch] = useState([]);
    const [rep, setRep] = useState(null);
    const [selected, setSelected] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [stops, setStops] = useState([]);
    async function updateData(){
        var link = "http://localhost:4000/routes/";
        if(props._id){
            link += props._id;
        }
        console.log({
            "name": data.name,
            "stops": stops.map(i => i.id)
        })
        await fetch(link, {
            method: props.method,
            body: JSON.stringify({
                "name": data.name,
                "stops": stops.map(i => i.id)
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
        if(!data.stops && props._edit){
            getApis(); 
        }
        if(stops.length === 0 && props._edit){
            getCustomers();
        }
    })
    async function getApis(){
        await getRoute();
    }
    async function getRoute(){
        await fetch("http://localhost:4000/routes/"+props._id)
            .then(response => response.json())
            .then(obj => {
                setData(obj[0]);
            });
    }
    async function getCustomers(){
        await fetch("http://localhost:4000/customer/").then(response => response.json()).then(customers => {
            if(data.stops){
                const filtered = customers.filter(i => data.stops.includes(i._id))
                setStops(filtered.map(cus => {return {'id': cus._id, 'name': cus.name, 'address': cus.address}})); 
                }
            }).catch(err => console.log(err));
            
    }
    function updateBox(e){
        console.log(stops.map(i => {
            return i.id
        }))
        fetch("http://localhost:4000/customer/?search=" + e.target.value).then(response => response.json()).then(obj => {setSearch(obj); console.log(obj)})
    }
    return (<>
        {rep === true && <h1>Successfully updated call-in</h1>}
        {rep === false && <h1>Failed to add call-in, please try again</h1>}
        <form className='customer-form' onSubmit={handleSubmit}>
            <label htmlFor='name'>Route name:</label>
            <input type="text" required className='customer-form-text-input' name="name" placeholder='Route Name' readOnly={props._edit} value={data.name || ""}  onChange={e => {setData({...data, ['name'] : e.target.value})}}/>
            {!props._edit && <><label htmlFor='name'>Add Customer:</label>
            <input type="text" className='customer-form-text-input' name="customerName" placeholder='Add customer here' readOnly={props._edit} value={selected || ""}  onChange={e => {updateBox(e); setSelected(e.target.value)}}/>
            <h3>Customers:</h3>
            <div className='search-box-results'>
                {Object.keys(search).map((v) => 
                        {
                        return <CustomerSmall key={search._id} _data={search[v]} click={() => {
                            if(!stops.some(element => element.id === search[v]._id)){
                                setStops([...stops, {
                                    'id': search[v]._id,
                                    'name': search[v].name,
                                    'address': search[v].address
                                    }]);
                            }
                        }}/>
                    })}
            </div></>}
            <h3>Stops:</h3>
             <div className='search-box-results'>
                {stops.map((v) => 
                        {
                        return <CustomerSmall key={v.id} _data={v} click={() => {
                            const arr = stops.filter(i => i.id !== v.id);
                            setStops(arr);
                        }}/>
                    })}
            </div>
            <input type="hidden" value={selectedId || data.customer_id || ""} name="_id"/>
            {!props._edit && <button type="submit" className='customer-form-button-submit'>Submit</button>}
        </form>
        
    </>)
}

export default RouterForm;