import React from "react";
import { useEffect ,useState } from "react";
import { useHttpClient } from '../../hooks/http-hook';

import { GET_PAGE_USERS as getUsersUrl } from '../../keys/BackEndKeys';

import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import ShopChart from "../../components/Admin/components/Chart";
import Statistic from "../../components/Admin/Statistic";
import AdminTable from "../../components/Admin/AdminTable";

function Landing() {
  const [usersData, setUsersData]= useState(undefined);
  const {isLoading, error, sendRequest, clearError} =  useHttpClient()
  const [reqUrl, setReqUrl] = useState(getUsersUrl);
  const [page ,setPage] = useState();
  const [totalPage, setTotalPage] = useState();
  const limit = 5;
  useEffect( () => {
    const fetchUsers = async () => {
      let data ; 
      try {
        data = await sendRequest(reqUrl);
        setUsersData(data.data);
        setPage(data.start);
       setTotalPage (data.totalPage);
      }
      catch(err) {
        console.log(err);
      }
      
    }
    fetchUsers();
  },[sendRequest]);

  const  onPageChange = async (nextPage) => {
    let data;
    try {
      data = await sendRequest(`${reqUrl}?limit=5&start=${nextPage}`);
      setUsersData(data.data);
      setPage(data.start);
     setTotalPage (data.totalPage);
    }
    catch(err){
    }
  }
  let pagination = []
  for (let i = 1 ; i <= totalPage; i ++){
    pagination.push(
      <li key={i} className={`page-item ${i===page ? "active" : "" }`}>
        <button className="page-link" onClick={async () => {await onPageChange(i)}}>
          {i}
        </button>
      </li>
    )
  }

  return (
    <div className="grid-container page-admin">
      <AdminHeader />
      <AdminSidebar />
      <main className="main-container">
        <Statistic />

        <div class="row">
            <div className="col-xl-6 col-lg-12">
              <div class=" charts-card ">
                <h2 class="chart-title text-light">Monthly Report</h2>
                <ShopChart />
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div class="charts-card overflow-x-scroll">
                <h2 class="chart-title text-light">Users Board</h2>
                <AdminTable usersData = {usersData} />
                <div className="card-footer d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Previous"
                onClick={async () => {
                  if (page != 1) {
                    await onPageChange(page - 1);
                  }
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
                {pagination}
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Next"
                onClick={async () => {
                  if (page != totalPage) {
                    await onPageChange(page + 1);
                  }
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}

export default Landing;
