import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import ProductDetail from "../components/ProductDetail.js";
import SameProduct from "../components/SameProduct.js"
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { BACK_END_SERVER } from "../keys/BackEndKeys.js";


export default function Detail(props) {
    const {proid} = useParams();
    const {data: product, isPending, Error} = useFetch(BACK_END_SERVER + `/api/product/${proid}`);
    return (
        <>
            <Topbar />
            <Navbar />
            <PageHeader />
            {product && <ProductDetail data= {product}/>}
            {product && <SameProduct proid = {proid}/>}
        </>
    );
};