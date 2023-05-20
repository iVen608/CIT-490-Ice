import React, { useEffect, useState }  from 'react';
import Customer from '../models/tableViewCustomers';
function MyTableView(){
    const [data, setData] = useState({});
    useEffect(() => {
        if(!data[1]){
            fetch("https://cit-490-ice.onrender.com/api-docs").then(response => response.json()).then(rep => setData(rep));
            console.log(data);
        }
        
    });
    
    if(data[1]){
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
            {Object.keys(data).map((v) => 
                {return <Customer _data={data[v]}/>})}
            </table>)
    }
}

export default MyTableView;