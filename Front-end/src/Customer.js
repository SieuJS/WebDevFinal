import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import ProductList from "./pages/ProductList.js"
import Account from './pages/AccountLayout.js';
import Checkout from './pages/Checkout.js'
import { AuthContext } from './context/AuthContext.js';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

function Customer() {
  const {isLoggedIn} = useContext(AuthContext)
  const routes = (
    <>
      <Route path='/cart' exact element={< Cart />} />
      <Route path='/checkout' exact element = {< Checkout />} />
    </>
  )
  return (
    <>
      <Routes>
        {routes}
        {/* <Route path='/*' element={<Navigate to = "/login" replace = {true} />} /> */}
      </Routes>
    </>
  );
}

export default Customer