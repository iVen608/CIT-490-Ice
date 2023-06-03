import React, { useEffect, useState }  from 'react';
import Customer from '../models/tableViewCustomers';
function CustomerDetail(props){
    const [data, setData] = useState({});
    useEffect(() => {
        if(!data[0]){
            fetch("https://cit-490-ice.onrender.com/customer/" + props._id).then(response => response.json()).then(rep => setData(rep));
            console.log(data);
        } 
    });
    
    if(data[0]){
        return (<table>
            <tr key="headerRow">
                <th key="header-name">Name</th>
                <th key="header-address">Address</th>
                <th key="header-ice">Ice</th>
                <th key="header-price">Price</th>
                <th key="header-tax">Tax</th>
                <th key="header-del">Delivery</th>
                <th key="header-po">PO</th>
                <th key="header-job">Job</th>
            </tr>
            <Customer _data={data[0]}/>
            </table>)
    }
}

export default CustomerDetail;