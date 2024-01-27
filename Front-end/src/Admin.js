import Products from './pages/Admin/Products';
import Categories from './pages/Admin/Categories';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard'
import CatContextProvider from './context/CatContext';
import Landing from './pages/Admin/Landing';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import AdminAddAccount from './components/Admin/AdminAddAccount';
import AdminEditAccount from './components/Admin/AdminEditAccount';
import { Navigate } from 'react-router-dom';

import AdminSidebar from './components/Admin/AdminSidebar';
import AdminHeader from './components/Admin/AdminHeader';
function Admin() {

  const [openSideBar, setOpenSideBar] = useState(true)
  const auth = useContext(AuthContext);
  const closeHandler = () => {
    setOpenSideBar(false)
  } 

  const toggleHandler = () => {
    setOpenSideBar(prev => !prev)
  }

  console.log(openSideBar)

  return (
    <div className='admin-container page-admin d-flex'>
    <AdminSidebar show = {openSideBar} onClose = {closeHandler}/>
    <div className='flex-grow-1 overflow-x-scroll'>
    <AdminHeader onToggle = {toggleHandler}/>
      <main className="main-container ">
      <CatContextProvider>
        <Routes>
          <Route path='/product/*' exect element={<Products />} />
          <Route path='/category' exect element={<Categories />} />
          <Route path='/dashboard' exect element={< Landing />} />
          <Route path='/account/add' exect element={< AdminAddAccount />} />
          <Route path='/account/edit' exect element={< AdminEditAccount />} />
          {/* <Route path='/dashboard' exect element={<Dashboard />} /> */}
        </Routes>
      </CatContextProvider>
      </main>
      </div>
    </div>
  );
}

export default Admin

