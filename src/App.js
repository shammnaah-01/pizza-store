import AddMovie from "./addmovie";
import Menubar from "./menubar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Routes,Route} from 'react-router-dom';
import Myevents from "./myevents";
import locationContext from "./locationcontext";
import Mybookings from "./mybookings";
import Contact from "./contact";
import Login from "./login";
import Home from "./home";
import { useContext } from "react";
import { useState } from "react";

//import locationContext from "./locationcontext";


function App(){
  const [ location,setLocation] = useState('Bangalore');
  const updateLocation=(newLocation)=>{
    setLocation(newLocation);
  }
 // const location= useContext(locationContext);
  return ( 
    <locationContext.Provider value={{location, updateLocation}}>
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">My Show-{location}</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link a class="nav-link" to='/home'>Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link a class="nav-link" to='/movie'>Movies</Link>
      </li>
      <li >
        <Link a class="nav-link dropdown-toggle" to='/events' role="button" data-toggle="dropdown" aria-expanded="false">
          Events
        </Link>
        
      </li>
       <li class="nav-item">
        <Link a class="nav-link" to='/bookings'>Bookings</Link>
      </li> <li class="nav-item">
        <Link a class="nav-link" to='/contact'>Contact</Link>
      </li>
     
    </ul>
    <form class="form-inline my-2 my-lg-0">
      
      <Link to="/login"input type="button" class="btn btn-outline-success my-2 my-sm-0" >Login</Link>
    </form>
  </div>
</nav>
<Routes>
<Route path="/events" element={<Myevents/>}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/bookings" element={<Mybookings/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/movie" element={<AddMovie title="movies"/>}/>
<Route path="/login" element={<Login/>}/>

</Routes>
</div>
</locationContext.Provider>
  );
}  
export default App;