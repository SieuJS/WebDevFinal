import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BACK_END_SERVER as beUrl } from "../../keys/BackEndKeys";

export default function AdminEditAccount() {
    const { userId, role } = useContext(AuthContext);
    const [accountInfo, setAccountInfo] = useState({})
    const [errorInput, setErrorInput] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`${beUrl}/api/account/${userId}`)
            const data = await result.json();
            setAccountInfo(data.user);
        }

        fetchData();
    }, [])

    const handleInput = (e) => {
        const newAccountInfo = { ...accountInfo, [e.target.name]: e.target.value }
        setAccountInfo(newAccountInfo);
    }

    const validation = (value) => {
        const errors = {}

        if (value.Name === '') {
            errors.accountName = 'Name is required'
        }

        if (value.DOB === '') {
            errors.accountDOB = 'DOB is required'
        }

        // check valid email
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regexEmail.test(value.Email)) {
            errors.accountEmail = 'Email is invalid'
        }

        return errors   
    }   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validation(accountInfo);
        console.log(errors);
        setErrorInput(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }

        accountInfo.userId = userId
        
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        const result = await fetch(`${beUrl}/api/account/updateAdmin`, {
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
            window.alert('Update successfull')
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
                      Edit Account
                    </div>
                    <div className="card-body">
                        <form method="post">
                            <div className="mb-3">
                                <label htmlFor="inputProductName" className="form-label">Tên người dùng</label>
                                <input type="text" className="form-control" id="accountName" name="Name" onChange={(e) => handleInput(e)} value={accountInfo.Name || '' } />
                              {errorInput.accountName && <span style={{color:'red'}}>{errorInput.accountName}</span>}
                            </div>
                            <div className="mb-3">
                              <label htmlFor="inputProductName" className="form-label">Email</label>
                              <input type="text" className="form-control" id="accountEmail" name="Email" onChange={(e) => handleInput(e)} value={accountInfo.Email || '' }/>
                              {errorInput.accountEmail && <span style={{color:'red'}}>{errorInput.accountEmail}</span>}
                            </div>
                            <div className="mb-3">
                            <label htmlFor="inputProductQuantity" className="form-label">Ngày sinh nhật</label>
                                <input type="date" className="form-control" id="accountDOB" name="DOB" onChange={(e) => handleInput(e)} value={accountInfo.DOB ? accountInfo.DOB.substring(0, 10) : '' }/>
                                {errorInput.accountDOB && <span style={{color:'red'}}>{errorInput.DOB}</span>}
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