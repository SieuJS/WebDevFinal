import React, { useEffect, useState, useContext } from "react";

import Input from "../../components/Auth/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_COMPARE_STR } from "../../utils/validators";

import { Backdrop, Button , Typography, Fade, Box} from "@mui/material";
import ClipLoader from 'react-spinners/ClipLoader';


import { useHttpClient } from "../../hooks/http-hook";

import "./CrudAccount.css";
import { AuthContext } from "../../context/AuthContext";
import { BACK_END_SERVER } from "../../keys/BackEndKeys";
import Admin from "../../Admin";

import Modal from '@mui/material/Modal';
import { NavLink } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CrudAccount() {
  const [disableEdit, setDisableEdit] = useState(true);

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [admin, setAdmin] = useState("");

  const [openSuccessModal, setOpenSuccessModal] =useState(false)

  const handleClose = () => {
    
    setOpenSuccessModal(false);
    if(error){
      clearError();
    }

  }


  useEffect(() => {
    const fetchAdmin = async () => {
      let data;
      try {
        data = await sendRequest(
          `${BACK_END_SERVER}/api/account/${auth.userId}`
        );
        setAdmin(data.user);
      } catch (err) {}
    };
    fetchAdmin();
  }, [sendRequest, auth]);

  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(() => {
    if (!disableEdit) {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: admin.Username,
            isValid: true,
          },
          password: {
            value: admin.Password,
            isValid: true,
          },
          oldPassword: undefined,
          newPassword: undefined,
          newRePassword: undefined,
        },
        true
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          password: undefined,
          username: {
            value: admin.Username,
            isValid: true,
          },
          oldPassword: {
            value: admin.Password,
            isValid: true,
          },
          newPassword: {
            value: "",
            isValid: false,
          },
          newRePassword: {
            value: "",
            isValid: false,
          },
        },
        true
      );
    }
  }, [disableEdit, admin]);

  const submitHandler = async (event) => {
    event.preventDefault()
    if(!disableEdit) {
        let data ;
        try {
            data =await sendRequest(`${BACK_END_SERVER}/api/admin/changePassword`, 'POST', {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${auth.token}`
            }, JSON.stringify(
                {
                    oldPassword : formState.inputs.oldPassword.value,
                    newPassword : formState.inputs.newPassword.value
                }
            ))
            
        }

        catch(err){
            console.log("erro",err)
        }

        if(!error) {
          console.log("data",data)
        }
        setDisableEdit(true);
        setOpenSuccessModal(true)
        
    }
  };

  return (
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
          { isLoading && <ClipLoader
            loading = {isLoading}
            size={200}
            aria-label="Loading Spinner"
          />}
          <div className="cat-card card">
            <div className="card-header text-center">Account</div>
            <div className="card-body">
                
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openSuccessModal}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={openSuccessModal}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Password {error && "can't"} changed!!
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {error ? error : "Change password success"}
                </Typography>
              </Box>
            </Fade>
          </Modal>

              <form>
                {admin && (
                    <Input
                      className="form-control"
                      element="input"
                      id="username"
                      onInput={inputHandler}
                      type="text"
                      lable="User name"
                      initialValue={admin.Username}
                      validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE()]}
                      errorText={{
                        MINLENGTH: "Chiều dài lớn hơn 5",
                        REQUIRE: "Ô này không được để trống",
                      }}
                      disabled={true}
                    />)
                }
                    {admin && disableEdit  &&(
                      <Input
                        className="form-control"
                        element="input"
                        id="password"
                        onInput={inputHandler}
                        type="password"
                        lable="Password"
                        initialValue={admin.Password}
                        validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE()]}
                        errorText={{
                          MINLENGTH: "Chiều dài lớn hơn 5",
                          REQUIRE: "Ô này không được để trống",
                        }}
                        disabled={disableEdit}
                      />
                    )}

                {!disableEdit && (
                  <>
                    <Input
                      className="form-control"
                      element="input"
                      id="oldPassword"
                      onInput={inputHandler}
                      type="password"
                      lable="Old Password"
                      validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE()]}
                      errorText={{
                        MINLENGTH: "Chiều dài lớn hơn 5",
                        REQUIRE: "Ô này không được để trống",
                      }}
                      disabled={disableEdit}
                    />
                      <Input
                        className="form-control"
                        element="input"
                        id="newPassword"
                        onInput={inputHandler}
                        type="password"
                        lable="New Password"
                        validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE()]}
                        errorText={{
                          MINLENGTH: "Chiều dài lớn hơn 5",
                          REQUIRE: "Ô này không được để trống",
                          COMPARE_STR: "Mật khẩu không trùng khớp",
                        }}
                        disabled={disableEdit}
                      />
                    <Input
                      className="form-control"
                      element="input"
                      id="newRePassword"
                      onInput={inputHandler}
                      type="password"
                      lable="Repate new password"
                      validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE(),VALIDATOR_COMPARE_STR(
                        formState.inputs.newPassword.value
                      )]}
                      errorText={{
                        MINLENGTH: "Chiều dài lớn hơn 5",
                        REQUIRE: "Ô này không được để trống",
                        COMPARE_STR: "Mật khẩu không trùng khớp",
                      }}
                      disabled={disableEdit}
                    />
                  </>
                )}
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => setDisableEdit((prev) => !prev)}
                    type="button"
                  >
                    {disableEdit ? "EDIT" : "LOCK"}
                  </button>
                  {!disableEdit && (
                    <button className="btn btn-primary" onClick={submitHandler}
                    disabled = {!formState.isValid}>
                      SUBMIT
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrudAccount;
