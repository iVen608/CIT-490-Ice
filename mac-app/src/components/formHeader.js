import {React, useState} from "react";

function FormHeader(props){
    const [confirm, setConfirm] = useState(false)
    return(<div className="form-action-header">
            {props.response && props.response.text && <p className={`status-message ${props.response.status ? "success" : "failure"}`}>{props.response.text || "Testing text vneovevioeveionveoiveonveonveoveoveovneo"}</p>}
            <h1 className="form-title">{props.title}</h1>
            {props.method === "PUT" && <>
                <button type="button" className="form-button-edit" onClick={props.toggle}>Edit</button>
                <button type="button" className="form-button-delete" onClick={e => setConfirm(true)}>Delete</button>
                {confirm && <>
                <h1 className="form-title">{`Are you sure about deleting this ${props.element || ""}?`}</h1>
                <button className="form-button-delete" onClick={props.delete}>Yes</button>
                <button className="form-button-edit" onClick={e => setConfirm(false)}>No</button>
            </>}
            </>}
        </div>)
}

export default FormHeader;