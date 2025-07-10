import { useContext } from "react";
import locationContext from "./locationcontext";

function Home(){
     const { location,updateLocation}= useContext(locationContext);
    return( <div>
        <h1>Home List</h1>
        <p>location:{location}</p>
        <button    onClick={()=>updateLocation('newyork')}>change location</button>
        <select onChange={(e)=>{updateLocation(e.target.value)}}>
            <option value='bangalore'>Bangalore</option>
            <option value='Mumbai'>Mumbai</option>
            <option value='Pune'>Pune</option>
            <option value='New york'>New york</option>
            <option value='Dubai'>Dubai</option>
        </select>
    </div>)
}
export default Home;