import React, { useState } from 'react'
import SchemaPanel from './SchemaPanel'
import { IoIosArrowBack } from "react-icons/io";
import './SegmentPanel.css'

function SegmentPanel(props) {
    const [schemaData, setSchemaData] = useState({});
    const [segmentName, setSegmentName] = useState("");
    async function saveSegment() {
        let payload = {
            "segment_name" : segmentName,
            "schema" : []
        }
        for(const schema in schemaData) {
            payload.schema.push({[schema] : schemaData[schema]})
        }
        console.log(payload);
        let response = await fetch("https://webhook.site/e02388e0-08c0-4f10-8910-a005beac3138", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        console.log(response);
        window.location.reload();
    }
    function inputHandler(e) {
        setSegmentName(e.target.value);
    }
  return (
    <div className='segment-container'>
        <div className='segment-panel'>
            <div className='segment-header'>
                <IoIosArrowBack height="2rem" width= "1.5rem"/>
                <span>&nbsp;&nbsp;Saving Segment</span>
            </div>
            <div className='segment-body'>
            <p>Enter the Name of the Segment</p>
            <input className='segment-name-input' type='text' name='segment_name' placeholder='Name of the segment' onInput={(e) => inputHandler(e)}/>
            <p>
                To save your segment, you need to add the schema to build the query
            </p>
            <div className='traits-container'>
                <div className='circle-div green-dot'></div> <span>- User Traits &nbsp;&nbsp;&nbsp;</span>
                <div className='circle-div red-dot'></div> <span>- Group Traits</span>
            </div>
            <SchemaPanel schemaData = {schemaData} setSchemaData = {setSchemaData}></SchemaPanel>
            </div>
            <div className='segment-footer'>
            <button className='save-segment-button' onClick={() => saveSegment()}>Save the Segment</button>
            <button className='cancel-button' onClick={() => props.setSegmentPanelOpen(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default SegmentPanel