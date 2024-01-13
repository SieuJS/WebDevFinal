export default function AdminProduct() {
    return (
    <main className="main-container">
        <div className="row">
            <div className="side-title col-sm-3">
              <div className="table-cards">
                <div className="cat-card card">
                    <div className="card-header">
                        Category
                    </div>
                    <div className="card-body">
                      <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action">The current</a>
                        <a href="#" className="list-group-item list-group-item-action">A second</a>
                        <a href="#" className="list-group-item list-group-item-action">A third</a>
                        <a href="#" className="list-group-item list-group-item-action active">A fourth</a>
                      </div>
                    </div>
                    <div className="card-footer">
                      <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li className="page-item">
                              <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item active"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                              <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                    </div>
                </div>               
              </div>
            </div>
            <div className="side-title col-sm-9">
                <div className="table-cards">
                  <div className="cat-card card">
                    <div className="card-header">
                      Product
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="search col-sm-5 col-5 offset-sm-0 offset-0">
                              <form className="d-flex search-item" role="search">
                                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                  <button className="btn btn-primary" type="submit">Search</button>
                              </form>
                            </div>
                            <div className="btn-add-item d-flex col-sm-3 col-3">
                              <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Sort by
                                </a>

                                <ul className="dropdown-menu">
                                  <li><a className="dropdown-item" href="#">Action</a></li>
                                  <li><a className="dropdown-item" href="#">Another action</a></li>
                                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                              </div>
                            </div>
                            <div className="btn-add-item d-flex col-sm-4 col-4">
                              <a href="/admin/product/add" type="button" className="btn btn-primary ms-auto" onclick="openAddItemForm()">
                                  <i className="fa-solid fa-circle-plus"></i>
                                   Add Product 
                              </a>
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
                            <tr className="text-center" style={{verticalAlign: 'middle'}}>
                              <th scope="row">1</th>
                              <th><img src="https://myshoes.vn/image/cache/catalog/2023/adidas/adi2/giay-adidas-galaxy-6-nam-den-01-500x500.jpg" alt="" width="52px" className="rounded-2"/></th>
                              <td>Shoes</td>
                              <td>23$</td>
                              <td>9</td>
                              <td>
                                <a href="/admin/product/edit" className="btn btn-primary btn-sm me-2">
                                  <i className="fa fa-pencil"></i>
                                </a>
                                <button href="" className="btn btn-danger btn-sm">
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                            <tr className="text-center" style={{verticalAlign: 'middle'}}>
                              <th scope="row">1</th>
                              <th><img src="https://myshoes.vn/image/cache/catalog/2023/adidas/adi2/giay-adidas-galaxy-6-nam-den-01-500x500.jpg" alt="" width="52px" className="rounded-2"/></th>
                              <td>Shoes</td>
                              <td>23$</td>
                              <td>9</td>
                              <td>
                                <a href="/admin/product/edit" className="btn btn-primary btn-sm me-2">
                                  <i className="fa fa-pencil"></i>
                                </a>
                                <button href="" className="btn btn-danger btn-sm">
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                            <tr className="text-center" style={{verticalAlign: 'middle'}}>
                              <th scope="row">1</th>
                              <th><img src="https://myshoes.vn/image/cache/catalog/2023/adidas/adi2/giay-adidas-galaxy-6-nam-den-01-500x500.jpg" alt="" width="52px" className="rounded-2"/></th>
                              <td>Shoes</td>
                              <td>23$</td>
                              <td>9</td>
                              <td>
                                <a href="/admin/product/edit" className="btn btn-primary btn-sm me-2">
                                  <i className="fa fa-pencil"></i>
                                </a>
                                <button href="" className="btn btn-danger btn-sm">
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                      <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li className="page-item">
                              <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item active"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                              <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </main>
    )
}