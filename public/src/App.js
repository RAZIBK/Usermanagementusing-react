import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Home from './pages/user/Home';
import AdminLogin from './pages/admin/AdminLogin'
import AdminHome from './pages/admin/AdminHome'
import EditUser from './pages/admin/EditUser'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/adminlogin' element={<AdminLogin/>}/>
      <Route exact path='/admin' element={<AdminHome/>}/>
      <Route exact path='/admin/edituser/:id' element={<EditUser/>}/>

    </Routes>
    </BrowserRouter>

  )
}

export default App