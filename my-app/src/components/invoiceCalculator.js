import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/invoiceCalculator.css';

function InvoiceCalculator(){
    const [info, setInfo] = useState({
        ice1: 0, price1: 0, ice2: 0, price2: 0, tax: false, del: false, finished: false,
    });
    useEffect(()=>{
        console.log(info);
        
    })
    function update(key, value){
        setInfo({...info, [key] : parseFloat(value)})
    }
    function calculateSubtotal(quantity, price, quantity2, price2){
        if(quantity2>2){
            return((quantity*price) + (quantity2 * price2));
        }else{
            return(quantity*price);
        }
    }
    function calculateTax(subtotal){
        return .086*subtotal;
    }
    function calculateTotal(subtotal, tax, delivery){
        if(tax === false){
            tax = 0;
        }else{
            tax = calculateTax(subtotal);
        }
        if(delivery === false){
            delivery = 0;
        }else{
            delivery = 25;
        }
        return (subtotal + tax + delivery);
    }
    return(
        <div id="invoice-calculator-container">
            <label htmlFor="iceQuantity1">Ice Quantity</label>
            <label htmlFor="icePrice1">Ice Price</label>
            <input id="iceQuantity1" type="text" placeholder='120 bags' onChange={(e) => update("ice1", e.target.value)}/>
            <input id="icePrice1" type="number" placeholder='$0.00' onChange={(e) => update("price1", e.target.value)}/>
            <h3>Optional</h3>
            <label htmlFor="iceQuantity2">2nd Ice Quantity</label>
            <label htmlFor="icePrice2">2nd Ice Price </label>
            <input id="iceQuantity2" type="number" placeholder='40 bags' onChange={(e) => update("ice2", e.target.value)}/>
            <input id="icePrice2" type="number" placeholder='$0.00' onChange={(e) => update("price2", e.target.value)}/>
            <label htmlFor="taxCheck">Taxed</label>
            <label htmlFor="deliveryCheck">Delivery</label>
            <input id="taxCheck" type="checkbox" onClick={(e)=>setInfo({...info, ["tax"] : (e.target.checked)})}/>
            <input id="deliveryCheck" type="checkbox" onClick={(e)=>setInfo({...info, ["del"] : (e.target.checked)})}/>
            <button type="button" onClick={(e)=>setInfo({...info, ["finished"] : (true)})}>Submit</button>
            <button type="button" onClick={(e)=>setInfo({...info, ["finished"] : (false)})}>Clear</button>
            {info.finished === true && 
            <div>
                <h3>{info.ice1} bags @ {info.price1} = {info.ice1 * info.price1}</h3>
                {info.ice2 > 0 && <h3>{info.ice2} bags @ {info.price2} = {info.ice2 * info.price2}</h3>}
                <h3>Subtotal = {calculateSubtotal(info.ice1,info.price1,info.ice2,info.price2)}</h3>
                {info.tax === true && <h3>Tax: {.086*(calculateSubtotal(info.ice1,info.price1,info.ice2,info.price2))}</h3>}
                {info.del === true && <h3>Delivery: $25</h3>}
                <h3>Total = {calculateTotal(calculateSubtotal(info.ice1,info.price1,info.ice2,info.price2),info.tax, info.del)}</h3>
            </div>}
        </div>
    )
}

export default InvoiceCalculator;