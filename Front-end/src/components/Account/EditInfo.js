import { useState, useEffect, useImperativeHandle, useInsertionEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useNavigate } from 'react-router-dom';

export default function EditInfo({ userId }) {
    const navigate = useNavigate();
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [userFormData, setUserFormData] = useState({
        newName: "",
        newUsername: "",
        newEmail: "",
        newDOB: ""
    });

    // dynamic information validation
    const [validNewUsername, setValidNewUsername] = useState(true);
    const [validNewName, setValidNewName] = useState(true);
    const [validNewEmail, setValidNewEmail] = useState(true);

    // edit input field management buttons' states
    // default is true to 'disabled=true' in input tag
    const [usernameBtn, setUsernameBtn] = useState(true);
    const [nameBtn, setNameBtn] = useState(true);
    const [emailBtn, setEmailBtn] = useState(true);
    const [dobBtn, setDobBtn] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const info = await sendRequest(
                    "http://localhost:3000/api/account/11",
                    "GET",
                    {
                        'Content-Type': 'application/json'
                    });
                setUserFormData({
                    newName: info.Name,
                    newUsername: info.Username,
                    newEmail: info.Email,
                    newDOB: info.DOB.substring(0, 10)
                });
            }
            catch (err) {
                throw err;
            }
        }
        fetchUser();
    }, []);

    function handleChange(event) {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        setUserFormData(prevFormData => {
            return {
                ...prevFormData,
                [targetName]: targetValue
            }
        });
        //console.log("handleChange", userFormData);
    }

    async function updateUserInfo(newValues) {
        newValues.ID = 11; // newValues.ID = userID; which is gotten from context
        const response = await sendRequest(
            "/api/account/update",
            "POST",
            {
                "Content-type": "application/json"
            },
            JSON.stringify(newValues)
        );
        return response;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        //console.log("Submit clicked!", userFormData);
        // check existed username
        const newUN = userFormData.newUsername;
        let existedUserName = false;

        if (!usernameBtn) {
            const dataResponse = await sendRequest(`/api/account/check/${newUN}`);
            existedUserName = dataResponse.valid;
            setValidNewUsername(!existedUserName);
        }

        // check valid name
        const name = userFormData.newName;
        const checkName = (name.split(" ").length > 1);
        setValidNewName(checkName);

        // check valid email
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const checkEmail = regex.test(userFormData.newEmail);
        setValidNewEmail(checkEmail);

        //console.log("before send request", validNewUsername, validNewName, validNewEmail);
        console.log("state of disabled edit buttons", usernameBtn, nameBtn, emailBtn, dobBtn);
        if ((!existedUserName && checkName && checkEmail) || !dobBtn) {
            // Prepare data:
            // Only update the data of the field which is enabling the editor button
            const newValues = {
                newUsername: usernameBtn ? null : userFormData.newUsername,
                newName: nameBtn ? null : userFormData.newName,
                newEmail: emailBtn ? null : userFormData.newEmail,
                newDOB: dobBtn ? null : userFormData.newDOB
            };

            if(!usernameBtn || !nameBtn || !emailBtn || !dobBtn) {
                const result = updateUserInfo(newValues);
                console.log("send request result", result);
            }
            navigate("/account");
        }
    }

    function manageUsernameFieldEnable(e) {
        e.preventDefault();
        setUsernameBtn(prev => !prev);
    }
    function manageNameFieldEnable(e) {
        e.preventDefault();
        setNameBtn(prev => !prev);
    }
    function manageEmailFieldEnable(e) {
        e.preventDefault();
        setEmailBtn(prev => !prev);
    }
    function manageDOBFieldEnable(e) {
        e.preventDefault();
        setDobBtn(prev => !prev);
    }
    return (
        <>
            {isLoading && (<LoadingSpinner asOverlay />)}
            <div className="info-title mb-4">
                <h3>Your profile</h3>
                <p className="text-warning">Click the edit button next to the field which you want to update</p>
            </div>
            <form onSubmit={handleSubmit} className="info-content">
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Username:</p>
                        </div>
                        <div className="col-8">
                            <div>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="newUsername"
                                    value={userFormData.newUsername}
                                    style={{ width: "200px" }}
                                    disabled={usernameBtn}
                                    className="mr-2">
                                </input>
                                <button onClick={manageUsernameFieldEnable}
                                    className="btn-primary">
                                    {usernameBtn && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    )}
                                    {!usernameBtn && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {(!validNewUsername && !usernameBtn) && <p className="text-danger">* This username is in use.</p>}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Your full name:</p>
                        </div>
                        <div className="col-8">
                            <div>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="newName"
                                    value={userFormData.newName}
                                    style={{ width: "200px" }}
                                    disabled={nameBtn}
                                    className="mr-2">
                                </input>
                                <button onClick={manageNameFieldEnable}
                                    className="btn-primary">
                                    {nameBtn && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    )}
                                    {!nameBtn && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {!validNewName && <p className="text-danger">* You name has to be at least two words.</p>}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Email:</p>
                        </div>
                        <div className="col-8">
                            <div>

                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="newEmail"
                                    value={userFormData.newEmail}
                                    style={{ width: "200px" }}
                                    disabled={emailBtn}
                                    className="mr-2">
                                </input>
                                <button onClick={manageEmailFieldEnable}
                                    className="btn-primary">
                                    {emailBtn && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    )}
                                    {!emailBtn && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {!validNewEmail && <p className="text-danger">* Invalid email. Please try again.</p>}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Date of birth:</p>
                        </div>
                        <div className="col-8">
                            <div>
                                <input
                                    type="date"
                                    onChange={handleChange}
                                    name="newDOB"
                                    value={userFormData.newDOB}
                                    style={{ width: "200px" }}
                                    disabled={dobBtn}
                                    className="mr-2">
                                </input>
                                <button onClick={manageDOBFieldEnable}
                                    className="btn-primary">
                                    {dobBtn && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    )}
                                    {!dobBtn && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                        </div>
                        <div className="col-8">
                            <button
                                className="btn btn-success"
                                onClick={(e) => handleSubmit}
                                type='submit'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}