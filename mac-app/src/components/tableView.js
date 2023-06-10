import React, { useEffect, useState }  from 'react';
import {useParams, searchParams, useSearchParams, useNavigate} from 'react-router-dom';
import Customer from '../models/tableViewCustomers';
import CallIn from '../models/tableViewCallTwo';
import RoutesModel from '../models/tableViewRoutes';
import RoutesSmall from '../models/tableViewRoutesEdit';
import RoutesCheckModel from '../models/tableViewCheckRoute';
import "../styles/customerTable.css";
import '../styles/searchBar.css';
function MyTableView(props){
    const [data, setData] = useState({});
    const [search, setSearch] = useState('');
    const [parameters, setParameters] = useSearchParams()
    const query = parameters.get("search");
    const nav = useNavigate();
    useEffect(() => {
        if(!props.data){
            const token = window.localStorage.getItem("token");
            fetch(query === null ? props.api : `${props.api}?search=${query}`, {method: 'GET', credentials: 'include', headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(_data => {setData(_data); console.log(_data)}).catch(err => console.log("err"))
            //fetch("http://localhost:4000/customer/", {credentials: 'include', headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(_data => {setData(_data); console.log(_data)}).catch(err => console.log(err))
               
        }
    }, []);
    return (<>
        {!props.data && <div id="search-bar-container">
                <input id="search-bar-input" type="text" placeholder={`Search for ${props.model}..`} onChange={e => setSearch(e.target.value)}/>
                <button id="search-bar-submit" type="button" onClick={e=>{nav(`?search=${search}`); window.location.reload(false)}}>S</button>
        </div>}
        {(data[0] || props.data) && <table key="customer-table" className='customer-table'>
                <tr key="header-table-row" className='customer-table-header-row'>
                    {props.header_keys.map(v => {
                        return <th key={`header-${v}`} className='customer-table-header-cell'>{v}</th>
                    })}
                </tr>
                {!props.data && Object.keys(data).map((v) => 
                    {
                        if(props.model === "customer"){
                            return <Customer key={data[v]._id} _data={data[v]}/>
                        }else if(props.model === "callin"){
                            return <CallIn key={data[v]._id} _data={data[v]}/>
                        }else if(props.model === "routes"){
                            return <RoutesModel key={data[v]._id} _data={data[v]}/>
                        }else if(props.model === "routesCheck"){
                            return <RoutesCheckModel key={data[v]._id} _data={data[v]}/>
                        }
                })}
                {props.data && props.data.map((v) => 
                        {
                            console.log(props.data);
                        return <RoutesSmall key={v.id} _data={v} click={() => {
                            const arr = props.data.filter(i => i.id !== v.id);
                            props.funct(arr);
                        }}/>
                    })}
            </table>}
        {(!data[0] && !props) && <h1>Failed to find customer</h1>}
    </>);
}

export default MyTableView;