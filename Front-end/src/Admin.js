
import { Routes, Route } from 'react-router-dom';

import { useState, useContext } from 'react';

import { AuthContext } from './context/AuthContext';

import CrudAccount from './pages/Admin/CrudAccount';
import AdminSidebar from './components/Admin/AdminSidebar';
import AdminHeader from './components/Admin/AdminHeader';
import Products from './pages/Admin/Products';
import Categories from './pages/Admin/Categories';
import Dashboard from './pages/Admin/Dashboard'
import CatContextProvider from './context/CatContext';
import Landing from './pages/Admin/Landing';
import Transaction from "./pages/Admin/Transaction"
import AdminAddAccount from './components/Admin/AdminAddAccount'
import AdminEditAccount from './components/Admin/AdminEditAccount'

function Admin() {

  const [openSideBar, setOpenSideBar] = useState(true)
  const auth = useContext(AuthContext);
  const closeHandler = () => {
    setOpenSideBar(false)
  } 
  const toggleHandler = () => {
    setOpenSideBar(prev => !prev)
  }


  return (
    <>
    <div className='admin-container page-admin d-flex'>
    <AdminSidebar show = {openSideBar} onClose = {closeHandler}/>
    <div className='flex-grow-1 overflow-x-scroll' style = {{width: '85%'}}>
    <AdminHeader onToggle = {toggleHandler}/>
      <main className="main-container ">
      <CatContextProvider>
        <Routes>
          <Route path='/product/*' exect element={<Products />} />
          <Route path='/category' exect element={<Categories />} />
          <Route path = "/accounts/changepass" exact element = {<CrudAccount/>}/>
          <Route path = "/accounts/add" exact element = {<AdminAddAccount/>}/>
          <Route path = "/accounts/edit" exact element = {<AdminEditAccount/>}/>
          <Route path='/dashboard' exact element={< Landing />} />
          <Route path = "/transactions" element = {<Transaction/>} />
          {/* <Route path='/dashboard' exect element={<Dashboard />} /> */}
        </Routes>
      </CatContextProvider>
      </main>
      </div>
    </div>
    </>
  );
}

export default Admin

