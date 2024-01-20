import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom";
import {NavLink} from "react-router-dom";

export default function Navbar() {

    const [showCatNav, setShowCatNav] = useState(false);
    const {data: categories, isPending, error} = useFetch('/api/categories');
    function toggleCat() {
        setShowCatNav(prev => !prev);
    }
    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <button className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                        data-toggle="collapse"
                        style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
                        onClick={toggleCat}
                    >
                        <h6 className="m-0">Categories</h6>
                        <i className="fa fa-angle-down text-dark"></i>
                    </button>
                    {showCatNav && (
                        <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical" >
                            <div className="navbar-nav w-100 overflow-hidden" >
                                {
                                    categories && (
                                        categories.map(cat => (
                                            <Link to={`/category/?catid=${cat.CatID}&page=1`} className="nav-item nav-link" key={cat.CatID}>{cat.CatName}</Link>
                                        ))
                                    )
                                }
                            </div>
                        </nav>
                    )}
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <a className="text-decoration-none d-block d-lg-none">
                            <h1 className="m-0 display-5 font-weight-semi-bold">
                                <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
                            </h1>
                        </a>
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                                <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>
                                <NavLink to="/detail" className="nav-item nav-link">Shop Detail</NavLink>
                                
                                <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                            </div>
                            <div className="navbar-nav ml-auto py-0">
                                <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
                                <NavLink to="/register" className="nav-item nav-link">Register</NavLink>
                            </div>
                        </div>
                    </nav>
                    {/* <div id="header-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" style={{height: "410px"}}>
                                <img className="img-fluid" src="img/carousel-1.jpg" alt="Image" />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{maxWidth: "700px"}}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                                            <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                                        </div>
                                    </div>
                            </div>
                            <div className="carousel-item" style={{height: "410px"}}>
                                <img className="img-fluid" src="img/carousel-2.jpg" alt="Image" />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{maxWidth: "700px"}}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                                            <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                            <div className="btn btn-dark" style={{width: "45px", height: "45px"}}>
                                <span className="carousel-control-prev-icon mb-n2"></span>
                            </div>
                        </a>
                        <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                            <div className="btn btn-dark" style={{width: "45px", height: "45px"}}>
                                <span className="carousel-control-next-icon mb-n2"></span>
                            </div>
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    );
}