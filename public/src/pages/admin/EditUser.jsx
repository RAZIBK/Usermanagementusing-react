import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'

const EditUser=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const navigate=useNavigate()
    const params=useParams();
    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async ()=>{
        console.log(params);
        let resut=await fetch(`http://localhost:4000/admin/getuserdata/${params.id}`)
        resut=await resut.json()
        console.log(resut);
        setName(resut.name);
        setEmail(resut.email)
    }

const UpdateUser=async(e)=> {
    e.preventDefault()
    let resut=await fetch(`http://localhost:4000/admin/useredit/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,email}),
        headers:{
            'Content-Type':'Application/json'
        }
    });
   resut=await resut.json()
   if(resut)navigate("/admin")
 
}

  return (
    <div className='container'>
        <h1>Edit User</h1>
        <form >
            <div>
                <label htmlFor="Name">Email</label>
                <input type="text" name='name' placeholder='Name' value={name}
                onChange={(e) =>{setName(e.target.value )}}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Email' value={email}
                onChange={(e) =>{setEmail(e.target.value )}}

                />
            </div>

            <button onClick={UpdateUser}>Update</button>
        </form>
        {/* <ToastContainer/> */}
    </div>
  )
}

export default EditUser;