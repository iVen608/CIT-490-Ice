import React, { useEffect, useState }  from 'react';
import {useParams, searchParams, useSearchParams, useNavigate} from 'react-router-dom';
import Customer from '../models/tableViewCustomers';
import CallIn from '../models/tableViewCallTwo';
import RoutesModel from '../models/tableViewRoutes';
import RoutesSmall from '../models/tableViewRoutesEdit';
import RoutesCheckModel from '../models/tableViewCheckRoute';
import DeliveredRoute from '../models/tableViewDeliveredRoute';
import SortCustomer from '../models/customerSort';
import SortCallIn from '../models/callInSort';
import SortRoute from '../models/routeSort';
import SortDelivered from '../models/deliveredSort';
import {getJWT ,sortFunction, filterArrayFunction} from '../utility';
import "../styles/customerTable.css";
import '../styles/searchBar.css';
function MyTableView(props){
    const [data, setData] = useState({});
    const [search, setSearch] = useState('');
    const [parameters, setParameters] = useSearchParams();
    const [sortFilter, setSortFilter] = useState({sort: 'name', filterBy: '', order: 'ascend'});
    const [sortedData, setSortedData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const query = parameters.get("search");
    const token = getJWT();
    const nav = useNavigate();
    useEffect(() => {
            fetch(query === null ? props.api : `${props.api}?search=${query}`, {method: 'GET', credentials: 'include', headers: {'Authorization': `Bearer ${token}`}}).then(response => response.json()).then(_data => {setData(_data); console.log(_data)}).catch(err => console.log("err"))
    }, []);
    useEffect(() => {
        if(data[0]){
            const sorted = sortFunction([...data], sortFilter.sort, sortFilter.order);
            console.log(sortFilter)
            if(sortFilter.filterBy !== "" && sortFilter.filterValue && sortFilter.filterValue !== ""){
                const filtered = filterArrayFunction(sorted, sortFilter.filterBy, sortFilter.filterValue);
                console.log(filtered);
                setSortedData(filtered);
            }else{
                console.log("y")
                setSortedData(sorted);
            }
        }
        
    }, [sortFilter, data])
    useEffect(()=> {
        console.log(data)
        setLoaded(true);
    }, [data])

    return (<>
        {!props.data && <div id="search-bar-container">
                <input id="search-bar-input" type="text" placeholder={`Search for ${props.model}..`} onChange={e => setSearch(e.target.value)}/>
                <button id="search-bar-submit" type="button" onClick={e=>{nav(`?search=${search}`); window.location.reload(false)}}>Search</button>
        </div>}
        {!props.data && props.model === "customer" && <SortCustomer sortFunction={setSortFilter} sortObject={sortFilter} resetData={setSortedData}/>}
        {!props.data && props.model === "callin" && <SortCallIn sortFunction={setSortFilter} sortObject={sortFilter} resetData={setSortedData}/>}
        {!props.data && props.model === "deliveredRoute" && <SortDelivered sortFunction={setSortFilter} sortObject={sortFilter} resetData={setSortedData}/>}
        {!props.data && (props.model === "routes" || props.model === "routesCheck") && <SortRoute sortFunction={setSortFilter} sortObject={sortFilter} resetData={setSortedData}/>}
        {(data[0] || props.data) && loaded && <table key="customer-table" className={props.wide ? 'customer-table margin-left-ten span-two' : 'customer-table-small margin-left-ten span-two'}>
                <tr key="header-table-row" className='customer-table-header-row'>
                    {props.header_keys.map(v => {
                        return <th key={`header-${v}`} className='customer-table-header-cell'>{v}</th>
                    })}
                </tr>
                {!props.data && !sortedData[0] && Object.keys(data).map((v) => 
                    {try{
                        if(props.model === "customer"){
                            return <Customer key={data[v]._id} _data={data[v]}/>
                        }else if(props.model === "callin"){
                            return <CallIn key={data[v]._id} _data={data[v]}/>
                        }else if(props.model === "routes"){
                            const stops_length = data[v].stops.length;
                            return <RoutesModel key={data[v]._id} _data={data[v]} stops_length={stops_length}/>
                        }else if(props.model === "routesCheck"){
                            const stops_length = data[v].stops.length;
                            return <RoutesCheckModel key={data[v]._id} _data={data[v]} stops_length={stops_length}/>
                        }else {
                            const callin_length = data[v].callins.length;
                            return <DeliveredRoute key={data[v]._id} _data={data[v]} callins_length={callin_length} delivered_length={data[v].delivered.length}/>
                        }
                    }catch(err){
                        return <tr><td>err</td></tr>
                    }
                        
                })}
                {!props.data && sortedData[0] && Object.keys(sortedData).map((v) => 
                    {try{
                        if(props.model === "customer"){
                            return <Customer key={sortedData[v]._id} _data={sortedData[v]}/>
                        }else if(props.model === "callin"){
                            return <CallIn key={sortedData[v]._id} _data={sortedData[v]}/>
                        }else if(props.model === "routes"){
                            return <RoutesModel key={sortedData[v]._id} _data={sortedData[v]} stops_length={sortedData[v].stops.length}/>
                        }else if(props.model === "routesCheck"){
                            return <RoutesCheckModel key={sortedData[v]._id} _data={sortedData[v]} stops_length={sortedData[v].stops.length}/>
                        }else {
                            return <DeliveredRoute 
                                        key={sortedData[v]._id} 
                                        _data={sortedData[v]}  
                                        callins_length={sortedData[v].callins.length}
                                        delivered_length={sortedData[v].delivered.length}/>
                        }
                    }catch(err){
                        window.location.reload(true);
                    }
                })

                }
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