// import './AdminProduct.css'
import { useEffect, useState } from "react"
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import useFetch from '../../customize/useFetch';
import usePaginationFetch from "../../hooks/usePaginationFetch";
import { BACK_END_SERVER as beUrl } from "../../keys/BackEndKeys";
import "./AdminProduct.css"
export default function AdminProduct() {
  // const navigate = useNavigate();
  const { catID } = useParams()
  // const [searchParams] = useSearchParams()
  // const page = parseInt(searchParams.get("page")) || 1;
  // const name = searchParams.get("keyword") || '';
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [sort, setSort] = useState('none')

  const [allProducts, setAllProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  // const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);
  const renderPagination = () => {
    const maxPagesToShow = 5; // Số trang tối đa được hiển thị
    const middleIndex = Math.ceil(maxPagesToShow / 2);
    let startPage = 1;
    
    if (totalPage > maxPagesToShow) {
      startPage = Math.max(1, page - middleIndex + 1);
      if (page + middleIndex > totalPage) {
        startPage = totalPage - maxPagesToShow + 1;
      }
    }
  
    return Array.from({ length: Math.min(totalPage, maxPagesToShow) }, (_, index) => startPage + index);
  };
  // const { dataFetch, isLoading, isError } = useFetch(`/api/product/get-by-page?catID=${catID}&page=${page}&keyword=${name}`);

  // sort


  const openAddItemForm = () => {
    console.log('open');
  }

  const onPageChange = (index) => {
    console.log(index);
    setPage(index);
    fetchData(index, name, sort)
  }

  const handleSearh = () => {
    setPage(1)
    // setName(value)
    setSort('none')
    fetchData(1, name)
  }

  const handleSort = (e) => {
    const value = e.target.value
    setSort(value);
    setPage(1)
    fetchData(1, name, value)
  }

  const fetchData = async (page, name, sort) => {
    try {
      setIsLoading(true)
      let proData = await fetch(`${beUrl}/api/product/get-by-page?catID=${catID}&page=${page}&keyword=${name}&sort=${sort}`);
      let proRes = await proData.json();
      setAllProducts(proRes.data);
      setIsLoading(false)
      setIsError(false)

      setTotalPage(proRes.totalPage)
    } catch (error) {
      setIsError(true);
      setIsLoading(false)
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('USEREFFECT');
    setPage(1)
    setName('')
    setSort('none')
    fetchData(1, '', '')
    // setPage(1)
  }, [catID])

  async function deleteRow(proID) {
    // var row = $(icon).closest('tr');
    var confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa hàng này không?');

    if (confirmDelete) {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        const result = await fetch(`${beUrl}/api/product/delete?proID=${proID}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const data = await result.json();
        if (data.success) {
          setAllProducts(allProducts.filter((item) => item.ProID !== proID));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
    return (

            <div className="cat-card card">
              <div className="card-header">
                Product
              </div>
              <div className="card-body">
                  <div className="row mb-3">
                      <div className="search col-sm-5 col-5 offset-sm-0 offset-0">
                        <form className="d-flex search-item" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={name} onChange={(e) => setName(e.target.value) } />
                            <div className="btn btn-primary" onClick={(e) => handleSearh()}>Search</div>
                        </form>
                      </div>
                      <div className="btn-add-item d-flex col-sm-3 col-3">
                        <div className="dropdown">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => handleSort(e)} value={sort}>
                          <option value="none">None Sort</option>
                          <option value="asc">Price ASC</option>
                          <option value="desc">Price DSC</option>
                        </select>
                        </div>
                      </div>
                      <div className="btn-add-item d-flex col-sm-4 col-4">
                        <Link to={`/admin/product/add/${catID}`} type="button" className="btn btn-primary ms-auto" onClick={(e) => openAddItemForm()}>
                            <i className="fa-solid fa-circle-plus m-1"></i>
                              Add Product 
                        </Link>
                      </div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr className="text-center" >
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                      </tr>
                    </thead>
                    <tbody>
                    { isError == false && isLoading == false && allProducts?.length > 0 && allProducts.map(pro => {
                      return <tr className="text-center" key={pro.ProID} style={{verticalAlign: 'middle'}}>
                              <th scope="row">{pro.ProID}</th>
                              <th><img src={pro.Image || "https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"} alt="" width="52px" className="rounded-2"/></th>
                              <td>{pro.ProName}</td>
                              <td>{parseFloat(pro.Price).toLocaleString()}</td>
                              <td>{pro.Quantity}</td>
                              <td>
                                <Link to={`/admin/product/edit?catID=${catID}&proID=${pro.ProID}`} className="btn btn-primary btn-sm m-1">
                                  <i className="fa fa-pencil"></i>
                                </Link>
                                <button href="" className="btn btn-danger btn-sm m-1" onClick={(e) => deleteRow(pro.ProID)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                    })
                    }
                    {
                    isLoading == true && <tr>
                                        <th colSpan={6} style={{ textAlign: 'center' }}>
                                            <div>  
                                            <div className="spinner-border" role="status">
                                              <span className="sr-only">Loading...</span>
                                            </div>
                                            </div>
                                        </th>
                                        </tr>
                                        
                    }
                    </tbody>
                  </table>
              </div>
              <div className="card-footer">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <button className="page-link" aria-label="Previous" onClick={() => {
                              if (page != 1) {
                                  onPageChange(1);
                              }
                          }}>
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      <li className="page-item">
                        <button className="page-link" aria-label="Previous" onClick={() => {
                              if (page != 1) {
                                  onPageChange(page-1);
                              }
                          }}>
                          <span aria-hidden="true">&lt;</span>
                        </button>
                      </li>
                      {
                          renderPagination().map((index) => (
                              <li key={index} className={`page-item ${index === page ? 'active' : ''}`}>
                                  <button className="page-link" onClick={() => onPageChange(index)}>
                                      {index}
                                  </button>
                              </li>
                          )
                          )
                      }
                      <li className="page-item">
                        <button className="page-link" aria-label="Next" onClick={() => {
                            if (page != totalPage) {
                                onPageChange(page+1);
                            }
                        }}>
                          <span aria-hidden="true">&gt;</span>
                        </button>
                      </li>               
                      <li className="page-item">
                        <button className="page-link" aria-label="Next" onClick={() => {
                            if (page != totalPage) {
                                onPageChange(totalPage);
                            }
                        }}>
                          <span aria-hidden="true">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
              </div>
            </div>
    )
}