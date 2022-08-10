import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useCookies} from "react-cookie"
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'


export default function Login() {
    const [cookies,setCookie,removeCookie]=useCookies([]);
    const navigate =useNavigate()
    useEffect(()=>{
        const verifyUser=async()=>{
          if(!cookies.jwt){
            // navigate('/login')
          }else{
            navigate('/')
          }
        };
        verifyUser();
      },[cookies,navigate]);
    const [values,setValues]=useState({
        email:'',
        password:'',
    });
    const generateError=(err)=>toast.error(err,{
        position:'bottom-right'
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const{data}=await axios.post('http://localhost:4000/login',
            {
                ...values,
                
            },{
                withCredentials:true,
            }); 
            if(data){
               if(data.errors){
                const {email,password}=data.errors;
                if(email)generateError(email);
                else if(password)generateError(password)
               }else{
                navigate('/')
               }
            }
        }catch(err){ 
            console.log(err);

        }
    };


  return (
    <div className='container'>
        <h1>Login Account</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Email' onChange={(e) =>setValues({ ...values,[e.target.name]:e.target.value })}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='Password' onChange={(e) =>setValues({ ...values,[e.target.name]:e.target.value })}/>
            </div>
            <button type='submit'>Submit</button>
            <span>
                Already have an account? <Link to="/register">Register</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}
