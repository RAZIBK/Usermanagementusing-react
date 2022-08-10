import React from 'react'
import { Button } from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import Header from '../user/Header';



async function deleteUser(id){
  await axios.post(`http://localhost:4000/deleteUser/${id}`)
}
async function blockUser(id){
  await axios.put(`http://localhost:4000/blockUser/${id}`)
}
async function unBlockUser(id){
  await axios.put(`http://localhost:4000/unblockUser/${id}`)
}
async function edituser(id){
  await axios.get(`http//localhost:4000/edituser/${id}`)
}
function AdminHome() {
  const navigate = useNavigate();
  
  const [cookies,setCookie,removeCookie]=useCookies([]);
  useEffect(()=>{
    const verifyAdmin=async()=>{
      if(!cookies.jwt){
        navigate('/adminlogin')
      }else{
        const{data}=await axios.post
        ('http://localhost:4000/admin',{},
        {withCredentials:true}
        );
        if(!data.status){
          removeCookie('jwt');
          navigate('/adminlogin');
        }else toast(`HI ${data.admin}`,{theme:'dark'});
      }
    };
    verifyAdmin();
  },[cookies,navigate,removeCookie]);
  // const logOut = ()=>{
  //   removeCookie('jwt');
  //   navigate('/adminlogin')

  // };

  const [user, setUser] = useState([])
  
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:4000/getUser")
    setUser(data)
  }

  useEffect(() => {
    fetchUsers();
    
  }, [user])

  return (
 <div>
  <Header/>
    <h2 className='container'>User Management</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 950 }} aria-label="simple table">
        <TableHead>  
          <TableRow>
            <TableCell align='center'>NAME</TableCell>
            <TableCell align='center'>EMAIL</TableCell>
            <TableCell align='center'>EDIT</TableCell>
            <TableCell align='center'>BLOCK</TableCell>
            <TableCell align='center'>DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align='center'>{row.email}</TableCell>
              <TableCell align='center'><Link to={'/admin/edituser/'+(row._id)}><Button>Edit</Button></Link></TableCell>
              <TableCell align='center'>{row.block?(<Button onClick={()=>unBlockUser(row._id)} >UnBlock</Button>):(<Button onClick={()=>blockUser(row._id)}>Block</Button>)}</TableCell>
              <TableCell  align='center'><Button key={row._id} style=  {{backgroundColor: "red"}} onClick={()=>deleteUser(row._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ToastContainer/>
    </div>
  )
}

export default AdminHome