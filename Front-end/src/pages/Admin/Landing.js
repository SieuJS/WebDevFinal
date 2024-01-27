import React from "react";
import { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import { GET_PAGE_USERS as getUsersUrl } from "../../keys/BackEndKeys";

import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import ShopChart from "../../components/Admin/components/Chart";
import Statistic from "../../components/Admin/Statistic";
import AdminTable from "../../components/Admin/AdminTable";
import { BACK_END_SERVER  } from "../../keys/BackEndKeys";

import io from "socket.io-client";

import './Landing.css'

function Landing() {
  const auth = useContext(AuthContext);

  const [usersData, setUsersData] = useState(undefined);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [reqUrl, setReqUrl] = useState(getUsersUrl);
  const [page, setPage] = useState();
  const [totalPage, setTotalPage] = useState();

  // for stat
  const [socket, setSocket] = useState();
  const [statData, setStatData] = useState();

  // useEffect(()=> {
  //   function onConnect () {
  //     setSocketConnected(true);
  //   };

  //   function onDisconnect() {
  //     setSocketConnected(false);
  //   }

  //   function onGetStat(data) {
  //     setStatData(prev => [...prev, data]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('stat', onGetStat);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('stat', onGetStat);
  //   };

  // }, [])

  useEffect(() => {
    if (auth.isLoggedIn) {
      setSocket(
        io.connect(BACK_END_SERVER, {
          query: { token: `Bearer ${auth.token}` },
        })
      );
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {
    // no-op if the socket is already connected
    if (socket) {
      socket
        .on("connect", () => {
          console.log("connect success");
        })
        .on("connect_error", (err) => {
          console.log("err");
          console.log(err);
        })
        .on("statistic", (data) => {
          setStatData(data);
        });
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const banHandler = (userId, permission) => {
    setUsersData(usersData.map((user) => user.ID === userId ? {...user, Permission:permission} : user))
  }

  // for pagination
  const limit = 5;
  useEffect(() => {
    const fetchUsers = async () => {
      let data;
      try {
        data = await sendRequest(reqUrl);
        setUsersData(data.data);
        setPage(data.start);
        setTotalPage(data.totalPage);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  const onPageChange = async (nextPage) => {
    let data;
    try {
      data = await sendRequest(`${reqUrl}?limit=5&start=${nextPage}`);
      setUsersData(data.data);
      setPage(data.start);
      setTotalPage(data.totalPage);
    } catch (err) {}
  };
  let pagination = [];
  for (let i = 1; i <= totalPage; i++) {
    pagination.push(
      <li key={i} className={`page-item ${i === page ? "active" : ""}`}>
        <button
          className="page-link"
          onClick={async () => {
            await onPageChange(i);
          }}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <>
      <Statistic data={statData} />
      <div class="stat-container">

          <div class=" charts-card ">
            <h2 class="chart-title text-light">Real Time Report</h2>
            <ShopChart data={statData} />
          </div>
          <div class="charts-card overflow-x-scroll">
            <h2 class="chart-title text-light">Users Board</h2>
            <div className="btn-add-item d-flex">
              <Link to="/admin/account/add" type="button" className="btn btn-primary ms-auto">
                  <i className="fa-solid fa-circle-plus m-1"></i>
                  Add Account Admin
              </Link>
            </div>
            <AdminTable usersData={usersData} banHandler = {banHandler}/>
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
    </>
  );
}

export default Landing;
