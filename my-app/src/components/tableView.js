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
                if(typeof(data[i][v]) !== "object"){
                    list.push(<td>{data[i][v]}</td>)
                };
                
            }
        }
        console.log(data[2]["equipment"]);
        return list;
    }

    function val(i,v){
        console.log(i, v);
        try{
            if(typeof(data[i][v]) !== "object"){
                console.log(data[i][v])
                return data[i][v];
            }else{
                return '0';
            }
        }catch(e){
            console.log(e);
        }
        
        
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
            <tr>
            {Object.keys(data).forEach((v) => 
                {return <h1>Text</h1>})}
            </tr>
            {Object.keys(data).map((v) => 
                {return <tr>{Object.keys(data[v]).map((i) => 
                    {return <td>{val(v, i)}</td>})}
                </tr>})}
            </table>)
    }
}

export default MyTableView;