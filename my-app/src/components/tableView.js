import React, { useEffect, useState }  from 'react';
import {useParams, searchParams, useSearchParams} from 'react-router-dom';
import Customer from '../models/tableViewCustomers';
import "../styles/customerTable.css"
function MyTableView(){
    const [data, setData] = useState({});
    const [search, setSearch] = useState({});
    const [parameters, setParameters] = useSearchParams()
    const query = parameters.get("search");
    console.log(query);
    useEffect(() => {
        if(!data[1]){
            fetch("https://cit-490-ice.onrender.com/api-docs").then(response => response.json()).then(rep => setData(rep));
        } 
    });
    if(data[1]){
        return (<table key="customer-table" className='customer-table'>
            <tr key="header-table-row" className='customer-table-header-row'>
                <th key="header-name" className='customer-table-header-cell'>Name</th>
                <th key="header-address" className='customer-table-header-cell'>Address</th>
                <th key="header-ice" className='customer-table-header-cell'>Ice</th>
                <th key="header-price" className='customer-table-header-cell'>Price</th>
                <th key="header-tax" className='customer-table-header-cell'>Tax</th>
                <th key="header-del" className='customer-table-header-cell'>Delivery</th>
                <th key="header-po" className='customer-table-header-cell'>PO/Job</th>
            </tr>
            {Object.keys(data).map((v) => 
                {return <Customer key={data[v]._id} _data={data[v]}/>})}
            </table>)
    }
}

export default MyTableView;