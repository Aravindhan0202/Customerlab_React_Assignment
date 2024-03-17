import React, { useState } from 'react'
import { FaWindowMinimize } from "react-icons/fa";
import "./SchemaPanel.css"

const allSchemaList = [
    {"id": 1,"label" : "First Name", "name": "first_name", "type" : "user"},
    {"id": 2,"label":"Last Name","name":"last_name", "type" : "user"},
    {"id": 3,"label": "Gender","name":"gender", "type" : "user"},
    {"id": 4,"label": "Age", "name" :"age", "type" : "user"},
    {"id": 5, "label": "Account Name","name": "account_name", "type": "group"},
    {"id": 6, "label":"City", "name":"city", "type": "group"},
    {"id": 7,"label": "State", "name":"state", "type": "group"},
];
// {"id": 0 ,"label": "Add Schema to Segment"}
function SchemaPanel(props) {
    const [currentSchemaList, setCurrentschemaList] = useState([]);
    function findNextId() {
        let nextID;
        let idFound = -1;
        for(let i=1;i<8;i++) {
            idFound = currentSchemaList.findIndex((schema) => schema.id == i);
            if(idFound == -1) {
                nextID = i;
                break;
            }
        }
        if(idFound != -1 && nextID > 7) {
            nextID = false;
        }
        console.log(nextID);
        return nextID;
    }
    function addSchema(nextId) {
        if(!nextId) {
            nextId = findNextId();
        }
        if(nextId) {
            let nextSchema = allSchemaList.filter((schema) => schema.id == nextId)[0];
            console.log("called", nextSchema);
            setCurrentschemaList([...currentSchemaList, nextSchema]);
        }
    }
    function insertSchema(id) {
        if(id) {
            let idFound = currentSchemaList.findIndex((schema) => schema.id == id); 
            if(idFound == -1) {
                addSchema(id);
            }
        }
    }
    function removeSchema(id) {
        setCurrentschemaList(currentSchemaList.filter(schema => schema.id != id))
    }
    function inputHandler(e) {
        props.setSchemaData({...props.schemaData, [e.target.name] : e.target.value})
        console.log(props.schemaData);
    }
    
  return (
    <div className='schema-container'>
        {
            currentSchemaList.map((schema) => {return (
            <div className='schema-group'>
                <div className={"circle-div " + (schema.type == "user" ? "green-dot" : schema.type == "group" ? "red-dot" : "grey-dot")}></div>
                <input className='schema-input' name= {schema.name} placeholder={schema.label} onInput={(e) => inputHandler(e)}/>
                <button className='remove-schema-button' onClick={() => removeSchema(schema.id)}><FaWindowMinimize width="1.5rem" height="1rem"/></button>
            </div>
            )})
        }
        <div className='schema-group'>
                <div className={"circle-div grey-dot"}></div>
                <select className='schema-input' placeholder={"Add Schema to Segment"} onInput={(e) => insertSchema(e.target.value)}>
                    <option value={false}>Add Schema to Segment</option>
                    {
                        allSchemaList.map((schema) => (
                            <option value={schema.id}>{schema.label}</option>
                        ))
                    } 
                </select>
                <button className='remove-schema-button'><FaWindowMinimize width="1.5rem" height="1rem"/></button>
        </div>
        <button className = "add-schema-button" onClick={() => addSchema()}>+ Add new schema</button>
        <div></div>
    </div>
  )
}

export default SchemaPanel