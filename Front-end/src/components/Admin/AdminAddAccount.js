import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BACK_END_SERVER as beUrl } from "../../keys/BackEndKeys";

export default function AdminAddAccount() {
    const [accountInfo, setAccountInfo] = useState({
        accountName: '',
        accountUser: '',
        accountDOB: '',
        accountEmail: '',
        accountPass: '',
        accountConfirmPass: ''
    })
    const [errorInput, setErrorInput] = useState({});

    const handleInput = (e) => {
        const newAccountInfo = { ...accountInfo, [e.target.name]: e.target.value }
        setAccountInfo(newAccountInfo);
    }

    const validation = async (value) => {
        const errors = {}

        if (value.accountName === '') {
            errors.accountName = 'Name is required'
        }

        if (value.accountUser === '') {
            errors.accountUser = 'User is required'
        } else {
            const result = await fetch(`${beUrl}/api/account/check/${value.accountUser}`)
            const resultResponse = await result.json();
            if (resultResponse.valid) {
                errors.accountUser = 'User is already exists'
            }
        }

        if (value.accountDOB === '') {
            errors.accountDOB = 'DOB is required'
        }

        // check valid email
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regexEmail.test(value.accountEmail)) {
            errors.accountEmail = 'Email is invalid'
        }

        if (value.accountPass === '') {
            errors.accountPass = 'Password is required'
        }

        if (value.accountConfirmPass === '') {
            errors.accountConfirmPass = 'Value is required'
        } else {
            if (value.accountConfirmPass !== value.accountPass)
                errors.accountConfirmPass = 'no match!'
        }


        return errors   
    }   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = await validation(accountInfo);
        console.log(errors);
        setErrorInput(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }
        
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        const result = await fetch(`${beUrl}/api/account/registerAdmin`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountInfo),
        })

        const data = await result.json();
        console.log(data);
        if (data.user) {
            window.alert('register successful')
        }
    }


    return (
        <>    
        <div className="main-title">
            
        </div>

        <div className="row">
            <div className="side-title col-sm-4">
              <div className="table-cards">
                <div className="cat-card card">
                    <div className="card-header">
                        Account Manager
                    </div>
                    <div className="card-body">
                        <div className="list-group list-group-flush">
                            <NavLink to={`/admin/accounts/add`} className="list-group-item list-group-item-action" style={{ borderRadius: "6px", margin: "2px 0" }}>Register Account</NavLink>
                            <NavLink to={`/admin/accounts/edit`} className="list-group-item list-group-item-action" style={{ borderRadius: "6px", margin: "2px 0" }}>Edit Account</NavLink>
                            <NavLink to={`/admin/accounts/changepass`} className="list-group-item list-group-item-action" style={{ borderRadius: "6px", margin: "2px 0" }}>Change Password</NavLink>
                        </div>    
                    </div>
                </div>               
              </div>
            </div>
            <div className="side-title col-sm-8">
                <div className="table-cards">
                  <div className="cat-card card">
                    <div className="card-header">
                      Register Account
                    </div>
                    <div className="card-body">
                        <form method="post">
                            <div className="mb-3">
                              <label htmlFor="inputProductName" className="form-label">Tên người dùng</label>
                              <input type="text" className="form-control" id="accountName" name="accountName" onChange={(e) => handleInput(e)}/>
                              {errorInput.accountName && <span style={{color:'red'}}>{errorInput.accountName}</span>}
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="inputProductPrice" className="form-label">Tên đăng nhập</label>
                                    <input type="text" className="form-control" id="accountUser" name="accountUser" onChange={(e) => handleInput(e)}/>
                                    {errorInput.accountUser && <span style={{color:'red'}}>{errorInput.accountUser}</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="inputProductQuantity" className="form-label">Ngày sinh nhật</label>
                                    <input type="date" className="form-control" id="accountDOB" name="accountDOB" onChange={(e) => handleInput(e)}/>
                                    {errorInput.accountDOB && <span style={{color:'red'}}>{errorInput.accountDOB}</span>}
                                </div>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="inputProductName" className="form-label">Email</label>
                              <input type="text" className="form-control" id="accountEmail" name="accountEmail" onChange={(e) => handleInput(e)}/>
                              {errorInput.accountEmail && <span style={{color:'red'}}>{errorInput.accountEmail}</span>}
                            </div>
                            <div className="mb-3">
                              <label htmlFor="inputProductName" className="form-label">Mật khẩu</label>
                              <input type="text" className="form-control" id="accountPass" name="accountPass" onChange={(e) => handleInput(e)}/>
                              {errorInput.accountPass && <span style={{color:'red'}}>{errorInput.accountPass}</span>}
                            </div>
                            <div className="mb-3">
                              <label htmlFor="inputProductName" className="form-label">Nhập lại Mật khẩu</label>
                              <input type="text" className="form-control" id="accountConfirmPass" name="accountConfirmPass" onChange={(e) => handleInput(e)}/>
                              {errorInput.accountConfirmPass && <span style={{color:'red'}}>{errorInput.accountConfirmPass}</span>}
                            </div>
                            <Link to={`/admin/dashboard`} className="btn btn-secondary me-2">Back</Link>
                            <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Save</button>
                        </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        </>
    );
};