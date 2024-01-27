import $ from 'jquery'
// import './AdminCat.css'
import { useState, useContext, useEffect } from 'react';
import { CatContext } from '../../context/CatContext.js';
import { BACK_END_SERVER as beUrl } from "../../keys/BackEndKeys";

export default function AdminCat() {
  const { allCategories, setAllCategories, isLoading, isError } = useContext(CatContext);
  const [catName, setCatName ] = useState('');
  const [catNameEdit, setCatNameEdit] = useState('');
  const [catID, setCatID] = useState('');
  const [errorInput, setErrorInput] = useState(null); 

  //pagination
  // const [categories, setCategories] = useState([]) // du lieu nay dung de phan trang
  // const [name, setName] = useState('');
  const [page, setPage] = useState(1)
  const pageSize = 7
  const lastIndex = page * pageSize;
  const firstIndex = lastIndex - pageSize;
  const categories = allCategories.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(allCategories.length / pageSize);
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

  // useEffect(() => {
  //   console.log('admincat useefect');
  //   const lastIndex = page * pageSize;
  //   const firstIndex = lastIndex - pageSize;
  //   if (allCategories.length > 0) {
  //     setCategories(allCategories.slice(firstIndex, lastIndex))
  //   }
  // }, [allCategories, page])

  const onPageChange = (index) => {
    setPage(index)
  }

  // const handleSearch = () => {
  //   setAllCategories(allCategories.filter((item) => {
  //     return item.CatName.toLowerCase().includes(name);
  //   }))
  // }
  
  function openAddItemForm() {
      window.$('#addItemModal').modal('show');
  }

  function cancelAddItemForm() {
      window.$('#addItemModal').modal('hide');
  }

  async function submitAddItemForm(e) {
    e.preventDefault();
    setErrorInput(null)
    if (catName === '') {
      setErrorInput(
        'Name is required'
      )
      return
    }

    const entity = {
      CatName : catName
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData.token;
    const data = await fetch(`${beUrl}/api/categories/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    })
    const res = await data.json();
    if (res.success) {
      entity.CatID = res.data.CatID;
      setAllCategories([...allCategories, entity])
    }
    window.$('#addItemModal').modal('hide');
  }

  async function deleteRow(icon, id) {
    // var row = $(icon).closest('tr');
    var confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa hàng này không?');

    if (confirmDelete) {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        const result = await fetch(`${beUrl}/api/categories/delete?CatID=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const data = await result.json();
        if (data.success) {
          setAllCategories(allCategories.filter((item) => item.CatID !== id));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function editRow(catID, catNameEdit) {
    setCatID(catID);
    setCatNameEdit(catNameEdit)

      window.$('#editItemModal').modal('show');
  }
  async function saveChanges() {
    const entity = {
      CatID: catID,
      CatName: catNameEdit,
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData.token;
    const data = await fetch(`${beUrl}/api/categories/update`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    })
    const res = await data.json();
    if (res.success) {
      setAllCategories(prevCategories => {
        const updatedCategories = [...prevCategories];
        updatedCategories.forEach(cat => {
          if (cat.CatID == entity.CatID) {
            cat.CatName = entity.CatName
          }
        })
        return updatedCategories;
      })
    }

    window.$('#editItemModal').modal('hide');
  }
  function cancelEdit() {
      window.$('#editItemModal').modal('hide');
  }

  return (
    <>
      <main className="main-container">
          <div className="main-title">
            <h2>CATEGORIES</h2>
          </div>

          <div className="table-cards">
            <div className="card-body" style={{'minHeight': '65vh'}}>
                <div className="row mb-3">
                    <div className="search container-fluid col-sm-5 col-6 offset-sm-0 offset-0">
                    {/* <form className="d-flex search-item" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {setName(e.target.value)}}/>
                        <div className="btn btn-primary" onClick={() => handleSearch()}>Search</div>
                    </form> */}
                    </div>
                    <div className="btn-add-item d-flex col-sm-4 col-4">
                  <button type="button" className="btn btn-primary ms-auto" onClick = {()=>openAddItemForm()}>
                        <i className="fa-solid fa-circle-plus m-1"></i>
                        Add Category
                    </button>
                    </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Category Name</th>
                      <th scope="col" className="text-center" >Option</th>
                    </tr>
                  </thead>
                  <tbody>
                  { isError == false && isLoading == false && categories &&
                  categories.map(cat => {
                    if(cat.CatID == 7) return ''
                    return <tr key={cat.CatID} >
                              <th scope="row">{cat.CatID }</th>
                              <td>{cat.CatName}</td>
                              <td className="text-center">
                              <button className="btn btn-primary btn-sm me-2" onClick={(event)=>editRow(cat.CatID, cat.CatName)}>
                                  <i className="fa fa-pencil"></i>
                              </button>
                              <button href="" className="btn btn-danger btn-sm" onClick={(event)=>deleteRow(event.target, cat.CatID)}>
                                <i className="fa fa-trash"></i>
                              </button>
                              </td>
                            </tr>
                  })}
                  {
                  isLoading == true && <tr>
                                      <th colSpan={5} style={{ textAlign: 'center' }}>
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
                <ul className="pagination" style={{'margin': '0', 'padding': '25px'}}>
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
      </main>

      {/* <!-- Modal for Add Item --> */}
      <div className="modal fade" id="addItemModal" tabIndex="-1" role="dialog" aria-labelledby="addItemModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form className="modal-content" onSubmit={submitAddItemForm}>
            <div className="modal-header">
              <h5 className="modal-title" id="addItemModalLabel">Add Category</h5>
                          <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" aria-label="Close" onClick={() => cancelAddItemForm()}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="catName">Category name:</label>
              <input type="text" id="catName" name="catName" className="form-control" onChange={(e) => setCatName(e.target.value)} />
              {errorInput && <span style={{'color':'red'}}>{errorInput}</span>}
            </div>
            <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancelAddItemForm()}>Cancel</button>
                          <button type="submit" className="btn btn-primary" >Add</button>
            </div>
          </form>
        </div>
      </div>
      
      {/* <!-- Modal for Edit Item --> */}
      <div className="modal fade" id="editItemModal" tabIndex="-1" role="dialog" aria-labelledby="editItemModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form className="modal-content" method="post" action="/">
            <div className="modal-header">
              <h5 className="modal-title" id="editItemModalLabel">Edit Category</h5>
                          <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" aria-label="Close" onClick={() => cancelEdit()}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="catCode">Category number:</label>
              <input type="text" id="editCatCode" name="editCatCode" className="form-control" readOnly value={catID}/>
      
              <label htmlFor="catName">Category name:</label>
              <input type="text" id="editCatName" name="editCatName" className="form-control" onChange={(e) => setCatNameEdit(e.target.value) } value={catNameEdit} />
            </div>
            <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancelEdit()}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => { saveChanges() }}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </>  
    );
};