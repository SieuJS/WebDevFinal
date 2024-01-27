import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BACK_END_SERVER } from "../../keys/BackEndKeys";
import { Button, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, Typography, Fade, Box} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "@mui/material/Modal";
import "./Transaction.css";

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


function Transaction() {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [trans, setTrans] = useState();
  const [curPage, setCurPage] = useState(1);
  const [searchPattern, setSearchPattern] = useState();
  const [userID, setUserID] = useState();


  // error 


  const [openSuccessModal, setOpenSuccessModal] =useState(false)

  const handleClose = () => {
    
    setOpenSuccessModal(false);
    clearError();
  }

// useEffect(() => {
//   if(error) {
//     setOpenSuccessModal(true)
//   }
// },[error])
  console.log(userID)
  useEffect(() => {
    const fetchTrans = async () => {
      let data;
      try {
        data = await sendRequest(
          `${BACK_END_SERVER}/api/admin/trans/get-by-page?${
            userID ? `userID=${userID}&` : ""
          }page=${curPage}`
        );
      } catch (err) {
        
      }
      setTrans(data);

    };
    fetchTrans();

  }, [sendRequest, curPage]);

  const onPageChange = (e, p) => {
    setCurPage(p);
  };
  const onSearch =async (e) => {
    e.preventDefault();
    let data;
    setUserID(searchPattern)
    setTrans(undefined)
      try {
        data = await sendRequest(
          `${BACK_END_SERVER}/api/admin/trans/get-by-page?${
            userID ? `userID=${userID}&` : ""
          }page=${curPage}`
        );
      } catch (err) {
        
      }
      setTrans(data);
  }

  return (
    <div className="chart-card">
      {
        error &&
       <Modal
        open = {!!error}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in = {!!error}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Can not query
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
               {error ? error : ""}
            </Typography>
          </Box>
        </Fade>
      </Modal>
  }
      <div className="card-header d-flex justify-content-between">
        <h2>TRANSACTIONS LIST</h2>
        <form className="trans-search">
          <input
            type="text"
            className="form-control m-0"
            onChange={(e) => setSearchPattern(e.target.value)}
          />
          <Button
            onClick={onSearch}
            variant="contained"
          >
            <SearchIcon />
          </Button>
        </form>
      </div>
      <div className="card-body">
      {isLoading && (
            <div className="d-flex justify-content-center w-100">
              <ClipLoader
                loading={isLoading}
                size={200}
                aria-label="Loading Spinner"
                color="#ffff"
              />
              </div>
            )}
        <table className="table">
          <thead>
            <tr className="text-center">
              <th scope="col">ID TRANS</th>
              <th scope="col">ID TRADER</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">ID ORDER</th>
              <th scope="col">STATUS</th>
              <th scope="col">BALANCE</th>
              <th scope="col">DATE</th>
            </tr>
          </thead>
          <tbody className="trans-body">
   
            {trans &&
              trans.data &&
              trans.data.map((tran, index) => {
                return (
                  <tr key={index} style={{textAlign: 'center'}}>
                    <td>{tran.TransID}</td>
                    <td>{tran.AccID}</td>
                    <td>{tran.Amount}</td>
                    <td>{tran.OrderID}</td>
                    <td>{tran.Status}</td>
                    <td>{tran.Balance}</td>
                    <td>{tran.Date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="card-header">
        <Pagination
          className="pagination text-light"
          count={(trans && trans.totalPage) || 1}
          defaultPage={curPage}
          color="primary"
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Transaction;
