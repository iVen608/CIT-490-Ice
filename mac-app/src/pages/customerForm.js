import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';
import {getJWT} from '../utility';
import FormHeader from '../components/formHeader';

function CustomerForm(props){
    const nav = useNavigate();
    const token = getJWT();
    const [data, setData] = useState({
        'name': '', 
        'address': '',
        'ice1': '', 
        'ice2': '', 
        'price1': '', 
        'price2': '', 
        'tax': false, 
        'delivery': false,
        'po': '', 
        'job': '',
        'rami': '', 
        'equipment': '', 
        'special': '',
    })
    const [edit, setEdit] = useState(props.method === "PUT" ? true : false);
    const [response, setResponse] = useState({});
    const [processing, setProcessing] = useState(false);
    async function updateData(){
        setProcessing(true);
        var link = props.api;
        if(props._id){
            link += props._id;
        }
        console.log(data);
        await fetch(link, {
            method: props.method,
            body: JSON.stringify(data),
            headers: {'Content-type': "application/json", 'Authorization': `Bearer ${token}`},
            credentials: 'include'
        }).then(response => {
            if(response.ok){
                if(props._id){
                    window.location.reload(true);
                    setResponse({text: `Customer successfully ${props.method === 'POST' ? 'added' : 'updated'}.`, status: true});
                }else{
                    setResponse({text: `Customer successfully ${props.method === 'POST' ? 'added' : 'updated'}.`, status: true});
                    setTimeout(() => {
                        nav("/customer/")
                    }, 3000);
                }
            }else{
                setResponse({text: `Unable to ${props.method === 'POST' ? 'add' : 'update'} customer due to an error.`, status: false});
                setProcessing(false);
            }
        }).catch(err => {console.log("err"); setProcessing(false);});
        
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!processing){
            updateData();
        }  
        
    }
    async function deleteCustomer(){
        await fetch(props.api + props._id, {
            method: 'DELETE',withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}
        ).then(response => {
            if(response.ok){
                setResponse({text: `Customer successfully deleted.`, status: true});
                setTimeout(() => {
                    nav("/customer/")
                }, 1500);
            }else{
                setResponse({text: `Unable to delete customer due to an error.`, status: false});
            }
        }).catch(err => {setResponse({text: `Unable to delete customer due to an error: ${err}.`, status: false});});
    }
    function handleDelete(e){
        e.preventDefault();
        deleteCustomer()
    }
    useEffect(() => {
        if(props._id && data.name === ""){
            fetch(props.api + props._id, {withCredentials: true, headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(obj => {setData(obj[0]); console.log(obj)});
        } 
    }, []);
    const toggle = () => {
        if(edit){
            setEdit(false);
        }else{
            setEdit(true);
        }
    }
    return (<>
        <FormHeader 
            title={props.method === 'POST' ? 'New Customer' : 'Customer Details'} 
            response={response} 
            toggle={toggle}
            delete={handleDelete}
            method={props.method}/>
        <form className='form' onSubmit={handleSubmit}>
            <input type="text" required className='form-text-input' name="name" placeholder='Customer Name' value={data.name || ""} readOnly={edit} onChange={e => setData({...data, ["name"] : e.target.value})} />
            <input type="text" required className='form-text-input' name="address" placeholder='Street Address' value={data.address || ""} readOnly={edit} onChange={e => setData({...data, ["address"] : e.target.value})}/>
            <input type="text" required className='form-text-input' name="city" placeholder='City' value={data.city || ""} readOnly={edit} onChange={e => setData({...data, ["city"] : e.target.value})}/>
            <input type="text" required className='form-text-input' name="zip" placeholder='Zip Code' value={data.zip || ""} readOnly={edit} onChange={e => setData({...data, ["zip"] : e.target.value})}/>
            
            <select name="ice1" required className='form-select-input' value={data.ice1 || "0"} disabled={edit} onChange={e => setData({...data, ["ice1"] : e.target.value})}>
                {(data.ice1 == 0 ? <option value="0" selected></option> : <option value="0"></option>)}
                {(data.ice1 == 7 ? <option value="7" selected>7R</option> : <option value="7">7R</option>)}
                {(data.ice1 == 10 ? <option value="10" selected>10lb block</option> : <option value="10">10lb block</option>)}
                {(data.ice1 == 16 ? <option value="16" selected>16R</option> : <option value="16">16R</option>)}
                {(data.ice1 == 40 ? <option value="40" selected>40R</option> : <option value="40">40R</option>)}
            </select>
            <input type="number" required className='form-text-input' name="price1" placeholder='Ice Price' step=".01" readOnly={edit} value={data.price1 || ""} onChange={e => setData({...data, ["price1"] : e.target.value})}/>
            <select name="ice2" className='form-select-input' disabled={edit} onChange={e => setData({...data, ["ice2"] : e.target.value})}>
                {(data.ice2 == 0 ? <option value="0" selected></option> : <option value="0"></option>)}
                {(data.ice2 == 7 ? <option value="7" selected>7R</option> : <option value="7">7R</option>)}
                {(data.ice2 == 10 ? <option value="10" selected>10lb block</option> : <option value="10">10lb block</option>)}
                {(data.ice2 == 16 ? <option value="16" selected>16R</option> : <option value="16">16R</option>)}
                {(data.ice2 == 40 ? <option value="40" selected>40R</option> : <option value="40">40R</option>)}
            </select>
            <input type="number" className='form-text-input' name="price2" placeholder='Ice Price' step=".01" readOnly={edit} value={data.price2 || ""} onChange={e => setData({...data, ["price2"] : e.target.value})}/>
            <label htmlFor='tax' className='form-check-label'>Tax</label>
            <input type="checkbox" className='form-check-input' name="tax" checked={data.tax || false} disabled={edit} onChange={e => setData({...data, ["tax"] : e.target.checked})}/>
            <label htmlFor='delivery' className='form-check-label'>Delivery</label>
            <input type="checkbox" className='form-check-input' name="delivery" checked={data.delivery || false} disabled={edit} onChange={e => setData({...data, ["delivery"] : e.target.checked})}/>
            <input type="text" className='form-text-input' name="po" placeholder='PO' readOnly={edit} value={data.po || ""}  onChange={e => setData({...data, ["po"] : e.target.value})}/>
            <input type="text" className='form-text-input' name="job" placeholder='Job #' readOnly={edit} value={data.job || ""}  onChange={e => setData({...data, ["job"] : e.target.value})}/>
            <input type="text" className='form-text-input' name="rami" placeholder='RAMI' readOnly={edit} value={data.rami || ""}  onChange={e => setData({...data, ["rami"] : e.target.value})}/>
            <input type="text" className='form-text-input' name="equipment" placeholder='Box Type' readOnly={edit} value={data.equipment || ""}   onChange={e => setData({...data, ["equipment"] : e.target.value})}/>
            <input type="text" className='form-text-input' name="special" placeholder='Special Instructions' readOnly={edit} onChange={e => setData({...data, ["special"] : e.target.value})}/>
            {!edit && <button type="submit" disabled={processing} className='form-button-submit'>{!processing ? 'Submit' : 'Processing'}</button>}
        </form>
        
    </>)
} 

export default CustomerForm;