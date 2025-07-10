import React,{useContext } from "react";
import locationContext from "./locationcontext";

function Contact(){
     const { location,updateLocation}= useContext(locationContext);
    return( <div>
        <h1>Contact List</h1>{location}
    </div>)
}
export default Contact;