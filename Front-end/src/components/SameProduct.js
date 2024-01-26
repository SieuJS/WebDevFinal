import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { BACK_END_SERVER } from '../keys/BackEndKeys';
import cartSlice from "../redux/cartSlice"
import { useEffect, useState } from 'react';
import useFetch from "../hooks/useFetch.js";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const productCard = require('./ProductCard');

export default (props) => {
    const proid = props.proid;
    const disPatch = useDispatch();
    const handleViewDetail = () => {

    };
    const notify = () => {
        toast("Đã thêm vào giỏ hàng");
    }
    const { data, isPending, Error } = useFetch(BACK_END_SERVER + `/api/product/sameproduct/${proid}`);
    const [sameproducts, setSameproducts] = useState(data);
    useEffect(() => {
        setSameproducts(data)
    }, [data])
    return (
        <div className="container-fluid py-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5">
                    <span className="px-2">You May Also Like</span>
                </h2>
            </div>
            {
                sameproducts && (
                    <div className="row px-xl-5">
                        <div className="col">
                            <OwlCarousel className="owl-carousel related-carousel" loop margin={10} nav items={4}>
                                {sameproducts.map((product) => (
                                    <div className="card product-item border-0" key={product.ProID}>
                                        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                            <img className="img-fluid w-100" src={product.Image} alt="" />
                                        </div>
                                        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                            <h6 className="text-truncate mb-3">{product.ProName}</h6>
                                            <div className="d-flex justify-content-center">
                                                <h6>{product.Price}</h6>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between bg-light border">
                                            <Link to={`/product/${product.ProID}`} className="btn btn-sm text-dark p-0" onClick={handleViewDetail}>
                                                <i className="fas fa-eye text-primary mr-1" />
                                                View Detail
                                            </Link>
                                            <button className="btn btn-sm text-dark p-0" onClick={() => { disPatch(cartSlice.actions.add({ ...product, orderQuantity: 1 })); notify() }}>
                                                <i className="fas fa-shopping-cart text-primary mr-1" />
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                            </OwlCarousel>
                        <ToastContainer/>
                        </div>
                    </div>
                )
            }
        </div>

    )
}