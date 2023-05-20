import React, { useEffect, useState }  from 'react';

function MyTableView(){
    const [data, setData] = useState({});
    useEffect(() => {
        if(!data[1]){
            fetch("https://cit-490-ice.onrender.com/api-docs").then(response => response.json()).then(rep => setData(rep));
            console.log(data);
        }
        
    });
    function populateData(){
        let list = [];
        for (const i in data){
            for(const v in data[i]){
                list.push(<td>{data[i][v]}</td>)
            }
        }
        console.log(list);
        return list;
    }
    
    if(data[1]){
        //Object.keys(data).forEach((key) => {console.log(data[key].name)});
        //Object.entries(data).map((i,v) => console.log(Object.keys(i[1])));
        const keys = Object.keys(data[2]);
        const key1 = Object.keys(data);
        Object.values(data[2]).forEach((v) => {console.log(v)})
        return (<table>
            <tr>
            {Object.keys(data[2]).map((key) => {return <th>{key}</th>})}
            </tr>
            <tr>{populateData()}</tr>
            {Object.keys(data).forEach((v) => 
                {<tr>{Object.values(data[v]).forEach((i) => 
                    {return <td>{i}</td>})}
                </tr>})}
            </table>)
    }
    
    
    
}

export default MyTableView;