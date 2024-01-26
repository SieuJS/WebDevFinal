import react from "react";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroupButtonContext } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

export default function Topbar() {
    const auth = useContext(AuthContext);
    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
        }
        else {
            navigate('/search?keyword=');
        }
    }
    return (
        <div className="container-fluid">
            <div className="row bg-secondary py-2 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-dark" href="">FAQs</a>
                        <span className="text-muted px-2">|</span>
                        <a className="text-dark" href="">Help</a>
                        <span className="text-muted px-2">|</span>
                        <a className="text-dark" href="">Support</a>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="text-dark pl-2" href="">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row align-items-center py-3 px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <NavLink to="/" className="text-decoration-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </NavLink>
                </div>
                <div className="col-lg-6 col-6 text-left">
                    <form onSubmit={submitHandler}>
                        <div className="input-group">
                            <input type="text" name="keyword" className="form-control" placeholder="Search for products" onChange={(e) => { setKeyword(e.target.value) }} />
                            <button className="btn btn-primary mx-2 p-0">
                                <span className="px-3 bg-transparent text-white">
                                    <i className="fa fa-search"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-6 text-right">
                    {auth.role !== "admin" && (
                        <button className="btn btn-secondary">
                            <NavLink to={`${auth.isLoggedIn ? "/cart" : "/login"}`} className="px-2">
                                <i className="fas fa-shopping-cart text-primary"></i>
                            </NavLink>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}