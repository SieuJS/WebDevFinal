import { Link, useParams, useSearchParams } from "react-router-dom";
import FileInput from "./FileInput";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../customize/useFetch";
import { CatContext } from "../../context/CatContext";
import { BACK_END_SERVER as beUrl } from "../../keys/BackEndKeys";

export default function AdminEditProduct() {
    const preset_key = "zjqlggti"
    const cloud_name = "dscoavwex"
    const folder = "eshopper"
    const [searchParams] = useSearchParams()
    const catID = searchParams.get("catID")
    const proID = searchParams.get("proID")
    const navigate = useNavigate();

    const [isLoad, setIsLoad] = useState(false);
    const [fileList, setFileList] = useState(null)
    const { dataFetch, isLoading, isError } = useFetch(`${beUrl}/api/product/get-by-pro/${proID}`);
    const { allCategories, setAllCategories} = useContext(CatContext);
    const [proInfo, setProInfo] = useState({})
    const [errorInput, setErrorInput] = useState({});

    useEffect(() => {
        console.log(dataFetch);
        if (dataFetch.data && dataFetch.data.length > 0) {
            setProInfo(dataFetch.data[0]);
        }
    }, [dataFetch])

    const validation = (value) => {
        const errors = {}

        const regexNumber = /^[0-9]\d*$/;
        if (value.ProName === '') {
            errors.proName = 'Name is required'
        }

        console.log(parseInt(value.Price));
        if (!regexNumber.test(parseInt(value.Price))) {
            errors.proPrice = 'Price is invalid'
        }

        console.log(parseInt(value.Quantity));
        if (!regexNumber.test(parseInt(value.Quantity))) {
            errors.proQuantity = 'Quantity is invalid'
        }
        return errors
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validation(proInfo)
        setErrorInput(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }
        const entity = {
            proName: proInfo.ProName,
            proPrice: proInfo.Price,
            proQuantity: proInfo.Quantity,
            proTinyDes: proInfo.TinyDes,
            proFullDes: proInfo.FullDes,
            catID: proInfo.CatID,
            proID: proID
        }

        console.log(entity);

        // const formData = new FormData();

        // for (const key in entity) {
        //     formData.append(key, entity[key]);
        // }

        if (fileList) {
            setIsLoad(true);
            const formDataCloud = new FormData()
            formDataCloud.append('file', fileList)
            formDataCloud.append('upload_preset', preset_key);
            formDataCloud.append('folder', folder)
            const resCloud = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: formDataCloud
            })
            const dataCloud = await resCloud.json();
            setIsLoad(false)
            console.log(dataCloud.secure_url);
            if (dataCloud.secure_url) {
                // formData.append('proImage', file);
                entity.proImage = dataCloud.secure_url
            }
            // formData.append('proImage', fileList);
        }

        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        const res = await fetch(`${beUrl}/api/product/update`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity),
        })

        const data = await res.json();
        navigate(-1);
    }
    
    return (
        <>    
        <div className="main-title">
            <h2>           
                <Link to={`/admin/product/${catID}`} className="btn btn-secondary me-3">
                    <i className="fa-solid fa-left-long"></i>
                </Link>
                ADD PRODUCT
            </h2>
        </div>

        <div className="row">
            {isLoad == true && (
                <div style={{ textAlign: "center" }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <div className="side-title col-sm-4">
              <div className="table-cards">
                <div className="cat-card card">
                    <div className="card-header">
                        Add Images
                    </div>
                    <div className="card-body">
                        <div style={{'textAlign': 'center'}}>
                            <img src={proInfo.Image} alt="" className = "file-input-label_image"/>
                            <p style={{'marginTop': '8px'}}>Current Image</p>
                        </div>
                        <FileInput
                        file={fileList}
                        setFile={setFileList}/>
                    </div>
                </div>               
              </div>
            </div>
            <div className="side-title col-sm-8">
                <div className="table-cards">
                  <div className="cat-card card">
                    <div className="card-header">
                      Add Information
                    </div>
                    <div className="card-body">
                        <form method="post">
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="inputProductName" className="form-label">Name Product</label>
                                    <input type="text" className="form-control" id="productName" name="productName" onChange={(e) => setProInfo({...proInfo, ProName: e.target.value})} value={proInfo.ProName || '' } />
                                    {errorInput.proName && <span style={{color:'red'}}>{errorInput.proName}</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="inputProductName" className="form-label">Category</label>
                                    <select id="editCategory" name="editCategory" className="form-control" onChange={(e) => setProInfo({...proInfo, CatID: e.target.value})} value={proInfo.CatID}>
                                        {allCategories && allCategories.length > 0 &&
                                            allCategories.map(cat => {
                                                return <option key={cat.CatID} value={cat.CatID}>{cat.CatName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="inputProductPrice" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="productPrice" name="productPrice" value={parseFloat(proInfo.Price) || '0'} onChange={(e) => setProInfo({ ...proInfo, Price: e.target.value })} />
                                    {errorInput.proPrice && <span style={{color:'red'}}>{errorInput.proPrice}</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="inputProductQuantity" className="form-label">Quantity</label>
                                    <input type="number" className="form-control" id="productQuantity" name="productQuantity" value={proInfo.Quantity || '0' } onChange={(e) => setProInfo({...proInfo, Quantity: e.target.value})}  />
                                    {errorInput.proQuantity && <span style={{color:'red'}}>{errorInput.proQuantity}</span>}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" name="description" rows="3" value={proInfo.TinyDes || ''} onChange={(e) => setProInfo({...proInfo, TinyDes: e.target.value})} ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Full Description</label>
                                <textarea className="form-control" id="fullDescription" name="fullDescription" rows="3" value = {proInfo.FullDes || '' } onChange={(e) => setProInfo({...proInfo, FullDes: e.target.value})}  ></textarea>
                            </div>
                            <Link to={`/admin/product/${catID}`} className="btn btn-secondary me-2">Back</Link>
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