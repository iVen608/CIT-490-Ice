import React, { useEffect, useState }  from 'react';
import {useParams, searchParams, useSearchParams, useNavigate} from 'react-router-dom';
import Customer from '../models/tableViewCustomers';
import "../styles/customerTable.css";
import '../styles/searchBar.css';
function MyTableView(props){
    const [data, setData] = useState({});
    const [search, setSearch] = useState('');
    const [parameters, setParameters] = useSearchParams()
    const query = parameters.get("search");
    const nav = useNavigate();
    useEffect(() => {
        if(!data[0]){
            console.log(`${props.api}?search=${query}`)
            
            fetch(query === null ? props.api : `${props.api}?search=${query}`).then(response => {
                if(response.ok){
                    setData(response.json());
                }else{
                    console.log(response);
                    setData({});
                }})

            }
    }, []);
    return (<>
        <div id="search-bar-container">
                <input id="search-bar-input" type="text" placeholder={`Search for ${props.model}..`} onChange={e => setSearch(e.target.value)}/>
                <button id="search-bar-submit" type="button" onClick={e=>{nav(`?search=${search}`); window.location.reload(false)}}>S</button>
        </div>
        {(data[0]) && <table key="customer-table" className='customer-table'>
                <tr key="header-table-row" className='customer-table-header-row'>
                    {props.header_keys.map(v => {
                        return <th key={`header-${v}`} className='customer-table-header-cell'>{v}</th>
                    })}
                </tr>
                {Object.keys(data).map((v) => 
                    {
                        if(props.model === "customer"){
                            return <Customer key={data[v]._id} _data={data[v]}/>
                        }
                })}
            </table>}
        {!data[0] && <h1>Failed to find customer</h1>}
    </>);
}

export default MyTableView;