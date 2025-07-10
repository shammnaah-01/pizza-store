import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import { data } from "react-router-dom";
import { useNavigate } from "react-router";

const Login=()=>{
    const navigate=useNavigate(); //initialization 
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const LoginUser=(e)=>{
        e.preventDefault();
        const data={
            email:email,
            password:password
        }

    fetch('http://localhost:8000/user/login',{
        method : 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(response=>{
        if(response.ok){
            return response.json();

        }else{
            alert('login failed')
        }
        

    }).then(data=>{
        if(data.nessage==='Invalid crtedentials'){
            alert('Invalid credentials')
            return;
        }
        console.log('login successfull:',data);
        localStorage.setItem('token',data.token);
        localStorage.setItem('firstname',data.data);
        navigate("/home");  //redirect to the home page
    }).catch(error=>{
        console.log('error:',error);
        alert('an error occured while loggin in');
    })
}
    return (
        <div className="container">
            <h1>Login</h1>
            <hr/>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}  placeholder="enter your password" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={LoginUser}>Login</button>
            </form>
        </div>
    )
}
export default Login;