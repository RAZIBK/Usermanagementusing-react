import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



export default function Header() {
        const navigate = useNavigate();
        
        const [cookies,setCookie,removeCookie]=useCookies([]);
    const logOut = ()=>{
        removeCookie('jwt');
        navigate('/register')
    
      };
  return (
    <div>
        <header >
        <button  onClick={logOut}>Log Out</button>
        </header>  
    </div>
  )
}

