import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import ProductList from "../components/ProductList.js";

export default function () {
    return (
        <>
            <Topbar />
            <Navbar />
            <PageHeader />
            <ProductList />
        </>
    )
}