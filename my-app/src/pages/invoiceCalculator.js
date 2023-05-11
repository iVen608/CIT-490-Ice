import React, { useEffect,useState } from 'react';
import '../styles/invoiceCalculator.css';

function InvoiceCalculator(){
    const [info, setInfo] = useState({
        ice1: 0, price1: 0, ice2: 0, price2: 0, tax: false, del: false, finished: false,
    });
    useEffect(() => {
        for(let i in info){
            info[i] = isNaN(info[i]) === true ? 0 : info[i];
        }
        console.log(info);
    });

    function checkValidNumber(value){
        if(isNaN(value)){
            return 0;
        }
        return value;
    }
    function update(key, value){
        /*
            Updates key value in useState to value for ice and quantity;
        */
       
        setInfo({...info, [key] : parseFloat(value)})
    }
    function roundToTwo(value){
        /*
            Bankers rounding notes:
                - if 2nd decimal point is odd and 3rd decimal is 5, round up
                - if 2nd decimal point is even and 3rd decimal is 5, round down

            This function rounds to avoid bankers rounding.
        */
        const x = parseFloat(value).toFixed(3);
        const stringX = x.toString();
        const stringLength = stringX.length;
        const lastTerm = parseInt(stringX.substring(stringLength-1, stringLength)); 
        const secondToLastTerm = parseInt(stringX.substring(stringLength-2, stringLength-1));
        if(secondToLastTerm % 2 === 0 && lastTerm === 5){
            value += .001;
        }
        const roundingResult = parseFloat(value).toFixed(2);
        return roundingResult;
    }
    function calculateSubtotal(quantity, price, quantity2, price2){
        /*
            Calculates subtotal from provided parameters
        */
       quantity = checkValidNumber(quantity);
       price = checkValidNumber(price);
       quantity2 = checkValidNumber(quantity2);
       price2 = checkValidNumber(price2);
        if(quantity2>2){
            return roundToTwo((quantity*price) + (quantity2 * price2));
        }else{
            return roundToTwo(quantity*price);
        }
    }
    function calculateTax(subtotal){
        /*
            Calculates tax based on subtotal parameter.
        */
        return roundToTwo(subtotal * .086);
    }
    function calculateTotal(subtotal, tax, delivery){
        /*
            Calculates total on if tax and/or delivery are selected.
        */
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
        const total = parseFloat(subtotal) + parseFloat(tax) + parseFloat(delivery);
        return roundToTwo(total);
    }
    return(
        <div id="invoice-calculator-container">
            <h1>Invoice Calculator</h1>
            <label class="invoice-label" htmlFor="iceQuantity1">Ice Quantity</label>
            <label class="invoice-label" htmlFor="icePrice1">Ice Price</label>
            <input id="iceQuantity1" class="invoice-number-input" type="number" placeholder='120 bags' onChange={(e) => update("ice1", e.target.value)}/>
            <input id="icePrice1" class="invoice-number-input" type="number" placeholder='$0.00' onChange={(e) => update("price1", e.target.value)}/>
            <h3>Optional</h3>
            <label class="invoice-label" htmlFor="iceQuantity2">2nd Ice Quantity</label>
            <label class="invoice-label" htmlFor="icePrice2">2nd Ice Price </label>
            <input id="iceQuantity2" type="number" class="invoice-number-input" placeholder='40 bags' onChange={(e) => update("ice2", e.target.value)}/>
            <input id="icePrice2" type="number" class="invoice-number-input" placeholder='$0.00' onChange={(e) => update("price2", e.target.value)}/>
            <label class="invoice-label" htmlFor="taxCheck">Taxed</label>
            <label class="invoice-label" htmlFor="deliveryCheck">Delivery</label>
            <input id="taxCheck" type="checkbox" onClick={(e)=>setInfo({...info, ["tax"] : (e.target.checked)})}/>
            <input id="deliveryCheck" type="checkbox" onClick={(e)=>setInfo({...info, ["del"] : (e.target.checked)})}/>
            {/*<button type="button" id="submitButton" onClick={(e)=>setInfo({...info, ["finished"] : (true)})}>Submit</button>
            <button type="button" id="clearButton" onClick={(e)=>setInfo({...info, ["finished"] : (false)})}>Clear</button>*/}
            <h1>Invoice</h1>
            <div>
                {info.price1 > 0 && info.ice1 > 0 && <h3 class="invoice-detail">{info.ice1} bags @ ${roundToTwo(info.price1)} = <span class="blue-text">${roundToTwo(info.ice1 * info.price1)}</span></h3>}
                {info.ice2 > 0 && info.price2 > 0 && <h3 class="invoice-detail">{info.ice2} bags @ ${roundToTwo(info.price2)} = <span class="blue-text">${roundToTwo(info.ice2 * info.price2)}</span></h3>}
                {info.price1 > 0 && info.ice1 > 0 && <h3 class="invoice-detail">Subtotal = <span class="blue-text">${calculateSubtotal(info.ice1,info.price1,info.ice2,info.price2)}</span></h3>}
                {info.tax === true && <h3 class="invoice-detail">Tax = <span class="blue-text">${calculateTax(calculateSubtotal(info.ice1,info.price1,info.ice2,info.price2))}</span></h3>}
                {info.del === true  && <h3 class="invoice-detail">Delivery = <span class="blue-text">$25.00</span></h3>}
                {<h3 class="invoice-detail">Total = <span class="blue-text">${calculateTotal(calculateSubtotal(info.ice1,info.price1,info.ice2,info.price2),info.tax, info.del)}</span></h3>}
            </div>
        </div>
    )
}

export default InvoiceCalculator;