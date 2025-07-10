import { useEffect, useState , useContext } from "react";
import locationContext from "./locationcontext";

const Myevents=()=>{
     const { location,updateLocation}= useContext(locationContext);
    const [eventTypes,setEventTypes]=useState(['Sports','Music']);
    const [eventType,setEventType]=useState('Sports');
    const [eventName,setEventName]=useState('Cricket Match');
    const [eventDesc,setEventDesc]=useState('Test');
    const handleEventTypeChange= (e)=>{
     setEventType(e.target.value);
    
    }
    const handleEventNameChange=(e)=>{
      setEventName(e.target.value)
    }
    const handleEventDescChange=(e)=>{
        setEventDesc(e.target.value);
    }
    // useEffect(()=>{},[]); // syntax
    useEffect(()=>{
        console.log('triggered useEffect')
    },[]); // syntax
    return(
        
        
       <div className='container'>
       <h1>MyEvents</h1>
       <p>location:{location}</p>
       <hr/>
       <div className="row">
        <div className="col-md-5">
         <form>
             <div className='form-group'>
             <label>Event Types</label>
            <select className="form-control" value={eventType} onChange={(e)=>handleEventTypeChange(e)}>
            {eventTypes.map((value,index)=>(
                <option key={index} value={value}>{value}</option>
            ))}</select>
            
             </div>
             <div>
                <div className="form-group" >
                    <label >event name:</label>
                    <input type='text' className="form-control"  value={eventName} onChange={(e)=>handleEventNameChange(e)}></input>
                </div>
                <div className="form-group" >
                    <label >event Desc:</label>
                    <input type='text' className="form-control" onChange={(e)=>handleEventDescChange(e)}></input>
                </div>
             </div>
             <button type="submit" className="form-control" value='' onChange={handleEventTypeChange}></button>
             
        </form>
        </div>
        <div className="col-md-7">
            <p>type:{eventType}</p>
             <p>Name:{eventName}</p>
              <p>Desc:{eventDesc}</p>
        </div>
        </div>
        {/* <p>list of all events will be displayed here</p> */}
        <button onClick={handleEventTypeChange}>change event type</button>
        
        </div>
        
        
    )

}
export default Myevents;