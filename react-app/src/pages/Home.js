import react from "react";
import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import Featured from "../components/Featured.js";
import Categories from "../components/Categories.js";
import Products from "../components/Products.js";
import Footer from "../components/Footer.js";
import './style.css'

export default function Home() {
    return (
        <>
            <Topbar />
            <Navbar />
            <Featured />
            <Categories />
            <Products />
            <Footer />
        </>
    );
}