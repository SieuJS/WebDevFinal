import { Outlet, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { CatContext } from "../../context/CatContext";

import "./AdminCatProduct.css"

export default function AdminCatProduct() {
  const { allCategories, setAllCategories, isLoading, isError } =
    useContext(CatContext);

  const [page, setPage] = useState(1);
  const pageSize = 7;
  const lastIndex = page * pageSize;
  const firstIndex = lastIndex - pageSize;
  const categories = allCategories.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(allCategories.length / pageSize);
  // const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);
  const renderPagination = () => {
    const maxPagesToShow = 3; // Số trang tối đa được hiển thị
    const middleIndex = Math.ceil(maxPagesToShow / 2);
    let startPage = 1;

    if (totalPage > maxPagesToShow) {
      startPage = Math.max(1, page - middleIndex + 1);
      if (page + middleIndex > totalPage) {
        startPage = totalPage - maxPagesToShow + 1;
      }
    }

    return Array.from(
      { length: Math.min(totalPage, maxPagesToShow) },
      (_, index) => startPage + index
    );
  };

  const onPageChange = (index) => {
    setPage(index);
  };

  return (
    <div className="cat-product-container gap-3">
      {isLoading == true && (
        <div style={{ textAlign: "center" }}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
          <div className="cat-card card">
            <div className="card-header">Category</div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {isError == false &&
                  isLoading == false &&
                  allCategories &&
                  categories.map((cat) => {
                    return (
                      <NavLink
                        to={`/admin/product/${cat.CatID}`}
                        className="list-group-item list-group-item-action"
                        style={{ borderRadius: "6px", margin: "2px 0" }}
                        key={cat.CatID}
                      >
                        {cat.CatName}
                      </NavLink>
                    );
                  })}
              </div>
            </div>
            <div className="card-footer bottom">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      aria-label="Previous"
                      onClick={() => {
                        if (page != 1) {
                          onPageChange(page - 1);
                        }
                      }}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  {renderPagination().map((index) => (
                    <li
                      key={index}
                      className={`page-item ${index === page ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => onPageChange(index)}
                      >
                        {index}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button
                      className="page-link"
                      aria-label="Next"
                      onClick={() => {
                        if (page != totalPage) {
                          onPageChange(page + 1);
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
      
      <Outlet/>
    </div>
  );
}
