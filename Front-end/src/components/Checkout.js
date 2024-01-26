import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import cartSlice from "../redux/cartSlice"
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import { BACK_END_SERVER } from "../keys/BackEndKeys";

export default function Checkout() {
    const disPatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.cart);
    var total = 0;
    products.forEach(element => {
        total += element.Price * element.orderQuantity;
    });
    const handlePlaceOrder = (products, total) => {  //Lưu ý: Trong mỗi product có thêm thuộc tính orderQuantity: số lượng sản phẩm này được mua
        //Kiểm tra xem còn đủ hàng không
        let check = 1;
        products.forEach(product => {
            if (product.Quantity < product.orderQuantity) {
                alert(`Số lượng sản phẩm ${product.ProName} còn lại trong kho là ${product.Quantity}. Mong bạn đặt lại`);
                check = 0;
                return;
            }
        })
        if (check==0) {
            return;
        }

        const data = {};
        data.info = {
            fullname: $('#fullname').val(),
            address: $('#address').val(),
            email: $('#email').val(),
            phone: $('#phonenumber').val()
        }
        data.products = products;
        data.total = total;

        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        fetch(BACK_END_SERVER + '/api/order/placeorder', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json()
        })
        .then((data) => {
            if (data.isSuccess) {
                disPatch(cartSlice.actions.remove());
                alert("DAT HANG THANH CONG",data.message)
                navigate('/');
            }
            else {
                alert("DAT HANG KHONG THANH CONG",data.message);
            }
        })
    }
    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-8">
                    <div className="mb-4">
                        <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                        <form id="infoForm">
                            <div className="row">
                                <div className="col-md-12 form-group">
                                    <label>Full Name</label>
                                    <input className="form-control" type="text" placeholder="John" name="fullname" id="fullname" />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label>Address Line</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="123 Street"
                                        name="address"
                                        id="address"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="example@email.com"
                                        name="email"
                                        id="email"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="+123 456 789"
                                        name="phonenumber"
                                        id="phonenumber"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <div className="collapse mb-4" id="shipping-address">
                        <h4 className="font-weight-semi-bold mb-4">Shipping Address</h4>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input className="form-control" type="text" placeholder="John" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input className="form-control" type="text" placeholder="Doe" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="example@email.com"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="+123 456 789"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 1</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="123 Street"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 2</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="123 Street"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Country</label>
                                <select className="custom-select">
                                    <option selected="">United States</option>
                                    <option>Afghanistan</option>
                                    <option>Albania</option>
                                    <option>Algeria</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>City</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="New York"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>State</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="New York"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>ZIP Code</label>
                                <input className="form-control" type="text" placeholder={123} />
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="col-lg-4">
                    <div className="card border-secondary mb-5">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="font-weight-medium mb-3">Products</h5>
                            {
                                products && products.map((item) => (
                                    <div className="d-flex justify-content-between">
                                        <p>{item.ProName} x{item.orderQuantity} </p>
                                        <p>{item.orderQuantity * item.Price}đ</p>
                                    </div>
                                ))
                            }
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between mb-3 pt-1">
                                <h6 className="font-weight-medium">Subtotal</h6>
                                <h6 className="font-weight-medium">{total}đ</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6 className="font-weight-medium">Shipping</h6>
                                <h6 className="font-weight-medium">0đ</h6>
                            </div>
                        </div>
                        <div className="card-footer border-secondary bg-transparent">
                            <div className="d-flex justify-content-between mt-2">
                                <h5 className="font-weight-bold">Total</h5>
                                <h5 className="font-weight-bold">{total}đ</h5>
                            </div>
                        </div>
                        <div className="card-footer border-secondary bg-transparent">
                            <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={() => handlePlaceOrder(products,total)}>
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}