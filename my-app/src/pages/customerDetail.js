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
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Ice</th>
                <th>Price</th>
                <th>Tax</th>
                <th>Delivery</th>
                <th>PO</th>
                <th>Job</th>
            </tr>
            <Customer _data={data[0]}/>
            </table>)
    }
}

export default CustomerDetail;