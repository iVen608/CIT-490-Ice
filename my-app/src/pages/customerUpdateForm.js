import React, {useState, useEffect} from 'react'
import { Form, useParams } from 'react-router-dom';
import '../styles/customerAddForm.css';

function CustomerForm(props){
    const parameters = useParams();
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
    })
    const [rep, setRep] = useState(null);
    async function updateData(){
        await fetch("http://localhost:4000/customer/" + parameters['*'].split("/")[1], {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-type': "application/json"}
        }).then(response => {
            if(response.ok){
                setRep(true);
            }else{
                setRep(false);
            }
        }).catch(err => {console.log(err); setRep(false);});
    }
    function handleSubmit(e){
        e.preventDefault();  
        updateData();
    }
    useEffect(() => {
        if(data.name == ""){
            fetch("http://localhost:4000/customer/" + parameters['*'].split("/")[1]).then(response => response.json()).then(obj => {setData(obj[0]); console.log(obj)});
        } 
    }, [])
       
    return (<>
        {rep === true && <h1>Successfully updated customer</h1>}
        {rep === false && <h1>Failed to add customer, please try again</h1>}
        <p>Customer name: {parameters['*'].split("/")[1]}</p>
        <p>{data.name}</p>
        <form className='customer-form' onSubmit={handleSubmit}>
           
            <input type="text" required className='customer-form-text-input' name="name" placeholder='Customer Name' value={data.name || ""} readOnly={props._edit} onChange={e => setData({...data, ["name"] : e.target.value})} />
            <input type="text" required className='customer-form-text-input' name="address" placeholder='Full Address'  value={data.address || ""} readOnly={props._edit} onChange={e => setData({...data, ["address"] : e.target.value})}/>
            <select name="ice1" required className='customer-form-select-input' value={data.ice1 || "0"} disabled={props._edit} onChange={e => setData({...data, ["ice1"] : e.target.value})}>
                {(data.ice1 === 0 ? <option value="0" selected></option> : <option value="0"></option>)}
                {(data.ice1 === 7 ? <option value="7" selected>7R</option> : <option value="7">7R</option>)}
                {(data.ice1 === 10 ? <option value="10" selected>10lb block</option> : <option value="10">10lb block</option>)}
                {(data.ice1 === 16 ? <option value="16" selected>16rR</option> : <option value="16">16R</option>)}
                {(data.ice1 === 40 ? <option value="40" selected>40</option> : <option value="40">40R</option>)}
            </select>
            <input type="number" required className='customer-form-text-input' name="price1" placeholder='Ice Price' step=".01" readOnly={props._edit} value={data.price1 || ""} onChange={e => setData({...data, ["price1"] : e.target.value})}/>
            <select name="ice2" className='customer-form-select-input' disabled={props._edit} onChange={e => setData({...data, ["ice2"] : e.target.value})}>
                {(data.ice2 === 0 ? <option value="0" selected></option> : <option value="0"></option>)}
                {(data.ice2 === 7 ? <option value="7" selected>7R</option> : <option value="7">7R</option>)}
                {(data.ice2 === 10 ? <option value="10" selected>10lb block</option> : <option value="10">10lb block</option>)}
                {(data.ice2 === 16 ? <option value="16" selected>16R</option> : <option value="16">16R</option>)}
                {(data.ice2 === 40 ? <option value="40" selected>40R</option> : <option value="40">40R</option>)}
            </select>
            <input type="number" className='customer-form-text-input' name="price2" placeholder='Ice Price' step=".01" readOnly={props._edit} value={data.price2 || ""} onChange={e => setData({...data, ["price2"] : e.target.value})}/>
            <label htmlFor='tax' className='customer-form-check-label'>Tax</label>
            <input type="checkbox" className='customer-form-check-input' name="tax" checked={data.tax || false} disabled={props._edit} onChange={e => setData({...data, ["tax"] : e.target.checked})}/>
            <label htmlFor='delivery' className='customer-form-check-label'>Delivery</label>
            <input type="checkbox" className='customer-form-check-input' name="delivery" checked={data.delivery || false} disabled={props._edit} onChange={e => setData({...data, ["delivery"] : e.target.checked})}/>
            <input type="text" className='customer-form-text-input' name="po" placeholder='PO' readOnly={props._edit} value={data.po || ""}  onChange={e => setData({...data, ["po"] : e.target.value})}/>
            <input type="text" className='customer-form-text-input' name="job" placeholder='Job #' readOnly={props._edit} value={data.job || ""}  onChange={e => setData({...data, ["job"] : e.target.value})}/>
            <input type="text" className='customer-form-text-input' name="rami" placeholder='RAMI' readOnly={props._edit} value={data.rami || ""}  onChange={e => setData({...data, ["rami"] : e.target.value})}/>
            <input type="text" className='customer-form-text-input' name="equipment" placeholder='Box Type' readOnly={props._edit} value={data.equipment || ""}   onChange={e => setData({...data, ["equipment"] : e.target.value})}/>
            {!props._edit && <button type="submit" className='customer-form-button-submit'>Submit</button>}
        </form>
        
    </>)
}

export default CustomerForm;