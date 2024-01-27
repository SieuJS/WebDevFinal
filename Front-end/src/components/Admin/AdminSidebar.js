import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './AdminSidebar.css'
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
export default function AdminSidebar(props) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    return (  
    <aside id="sidebar " className={ + props.show ? "" : "hide"} style = {{width: '15%'}} >
            <div className="sidebar-title">
            <div className="sidebar-brand">
                <span className="material-icons-outlined">shopping_cart</span> STORE
            </div>
            </div>

            <ul className="sidebar-list">
            <li className="sidebar-list-item">
                <NavLink to="/admin/dashboard" className={"sidebar-navlink"} >
                <span className="material-icons-outlined">dashboard</span> Dashboard
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/admin/product/" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">inventory_2</span> Products
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/admin/category" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">category</span> Categories
                </NavLink>
            </li>
            <li className="sidebar-list-item" >
                <NavLink to="/admin/accounts/add" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">groups</span> Accounts
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/"  className={"sidebar-navlink"}>
                <span className="material-icons-outlined">fact_check</span> Inventory
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/admin/transactions"className={"sidebar-navlink"}>
                <span className="material-icons-outlined">poll</span> Transaction
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <Button className={"sidebar-navlink"} onClick={()=> {
                    auth.logout();
                    navigate('/')
                }}>
                <span className="material-icons-outlined">settings</span> Log out
                </Button>
            </li>
            </ul>
        </aside> 

    );
};