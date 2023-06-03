import React, {useState} from 'react'
import { Form } from 'react-router-dom';
import '../styles/customerAddForm.css';

function CustomerForm(){
    const [data, setData] = useState({
        'name': '', 
        'address': '',
        'ice1': '7', 
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
    async function postData(){
        await fetch("https://cit-490-ice.onrender.com/customer/", {
            method: 'POST',
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
        postData();
    }
    return (<>
       {rep === null && <form className='customer-form' onSubmit={handleSubmit}>
            <input type="text" required className='customer-form-text-input' name="name" placeholder='Customer Name' onChange={e => setData({...data, ["name"] : e.target.value})}/>
            <input type="text" required className='customer-form-text-input' name="address" placeholder='Full Address'  onChange={e => setData({...data, ["address"] : e.target.value})}/>
            <select name="ice1" required className='customer-form-select-input' onChange={e => setData({...data, ["ice1"] : e.target.value})}>
                <option value="7">7R</option>
                <option value="10">10lb block</option>
                <option value="16">16R</option>
                <option value="40">40R</option>
            </select>
            <input type="number" required className='customer-form-text-input' name="price1" placeholder='Ice Price' step=".01" onChange={e => setData({...data, ["price1"] : e.target.value})}/>
            <select name="ice2" className='customer-form-select-input' onChange={e => setData({...data, ["ice2"] : e.target.value})}>
                <option value="0"></option>
                <option value="7">7R</option>
                <option value="10">10lb block</option>
                <option value="16">16R</option>
                <option value="40">40R</option>
            </select>
            <input type="number" className='customer-form-text-input' name="price2" placeholder='Ice Price' step=".01" onChange={e => setData({...data, ["price2"] : e.target.value})}/>
            <label htmlFor='tax' className='customer-form-check-label'>Tax</label>
            <input type="checkbox" className='customer-form-check-input' name="tax" onChange={e => setData({...data, ["tax"] : e.target.checked})}/>
            <label htmlFor='delivery' className='customer-form-check-label'>Delivery</label>
            <input type="checkbox" className='customer-form-check-input' name="delivery" onChange={e => {setData({...data, ["delivery"] : e.target.checked}); console.log("clicked")}}/>
            <input type="text" className='customer-form-text-input' name="po" placeholder='PO' onChange={e => setData({...data, ["po"] : e.target.value})}/>
            <input type="text" className='customer-form-text-input' name="job" placeholder='Job #'  onChange={e => setData({...data, ["job"] : e.target.value})}/>
            <input type="text" className='customer-form-text-input' name="rami" placeholder='RAMI'  onChange={e => setData({...data, ["rami"] : e.target.value})}/>
            <input type="text" className='customer-form-text-input' name="equipment" placeholder='Box Type'  onChange={e => setData({...data, ["equipment"] : e.target.value})}/>
            <button type="submit" className='customer-form-button-submit'>Submit</button>
        </form>}
        {rep === true && <h1>Successfully added customer, would you like to add another?</h1>}
        {rep === false && <h1>Failed to add customer, please try again</h1>}
        
    </>)
}

export default CustomerForm;