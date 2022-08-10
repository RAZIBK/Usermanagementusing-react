import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import { useCookies} from "react-cookie"

export default function AdminLogin() {
    const [cookies,setCookie,removeCookie]=useCookies([]);
    useEffect(()=>{
        const verifyAdmin=async()=>{
          if(!cookies.jwt){
            navigate('/adminlogin')
          }else{
            navigate('/admin')
          }
        };  
        verifyAdmin(); 
      },[cookies,navigate]);
    const navigate =useNavigate()
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
            const{data}=await axios.post('http://localhost:4000/adminlogin',
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
                navigate('/admin')
               }
            }
        }catch(err){ 
            console.log(err);

        }
    };


  return (
    <div className='container'>
        <h1>Admin Login</h1>
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
        </form>
        <ToastContainer/>
    </div>
  )
}
