import React, { useEffect, useState } from 'react'
import SideBar from '../../ui/SideBar'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import 'react-quill/dist/quill.snow.css';
import '../../ui/css/Button.css'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import storage from '../../config/firebase'
import { editProductByAdmin, getProductByAdmin } from '../../service/Admin';
import { getAllTypeProduct } from '../../service/Product';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const param = useParams();
    const navigate = useNavigate();
    const [typeProduct, setTypeProduct] = useState();
    const [idCate, setIdCate] = useState(0);
    const [imgUpload, setImgUpload] = useState(null);
    const [imgUrls, setImgUrls] = useState([]);
    const [product, setProduct] = useState();

    const isLogin = localStorage.getItem("isLogin")  

    useEffect(() => {
        if(isLogin == null){
            toast(`Yêu cần đăng nhập`)
            navigate(`/`)
        }
    },[])

    useEffect(() => {
        const { id } = param;
        getProductByAdmin(id).then(res => {
            console.log(res);
            setProduct(res)
        })
    }, [param])
    useEffect(() => {
        getAllTypeProduct().then(res => {
            setTypeProduct(res)
        })
    }, [])

    const validationObject = {
        content: Yup.string().required("Tên không được để trống").min(2, "Tên Blog ít nhất 2 ký tự").max(255, "Tên Blog tối đa 255 ký tự"),
        nameProduct: Yup.string().required("Tên không được để trống").min(2, "Tên Blog ít nhất 2 ký tự").max(255, "Tên Blog tối đa 255 ký tự"),
        typeProductId: Yup.string().required("Vui lòng chọn ít nhất một loại sản phẩm"),
        price: Yup.number().required("Vui lòng nhập giá tiền").min(0, "Nhập số dương"),
        description: Yup.string().max(65535, "Nội dung tối đa 65535 ký tự").required("Vui lòng nhập mô tả"),
        quantity: Yup.number().required("Vui lòng nhập số lượng").min(0, "Nhập số dương"),
    }
    const imgListRef = ref(storage, "images/")

    const UploadFiles = (files) => {
        Promise.all(
            files.map(file => {
                const imgRef = ref(storage, `images/${file.name}`);
                return uploadBytes(imgRef, file).then(snapshot => {
                    return getDownloadURL(snapshot.ref)
                })
            })
        ).then(urls => {
            setImgUrls(urls)
        })
    }

    useEffect(() => {
        if (imgUpload) {
            UploadFiles(imgUpload);
        }
    }, [imgUpload]);

    useEffect(() => {
        if (product) {
          setImgUrls(product.imageProduct)
        }
      }, [product, imgUrls])

    const handleSelectFiles = (e) => {
        const files = Array.from(e.target.files);
        setImgUpload(files)
    }

    const handleSelectChange = (e, setFieldValue) => {
        const { name, value } = e.target;
        setFieldValue(name, value)
        setIdCate(e.target.value);
    };


    if (!typeProduct || !product) return (
        <div class="main">
            <div class="mario_bin"></div>
            <div class="mario_run">
                <div class="mario_run1"></div>
            </div>
            <div class="walls">
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
            </div>
            <div class="text"></div>
        </div>
    )

    return (
        <>
            <div style={{margin:'0px'}} className='row'>
                <div className='col-3'><SideBar />
                </div>
                <div className='col-9'>
                    <main class="main-content position-
      relative max-height-vh-100 h-100 border-radius-lg">
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div >
                                    <section className="home-section">
                                        <div className="container body_movie bg-white">
                                            <h1 style={{ paddingTop: "20px", display: 'flex', justifyContent: 'center' }}>Chỉnh Sửa Sản Phẩm</h1>
                                            <Formik initialValues={
                                                {
                                                    idProduct: product.id,
                                                    content: product.content,
                                                    description: product.description,
                                                    nameProduct: product.nameProduct,
                                                    imageProduct: imgUrls,
                                                    price: product.price,
                                                    quantity: product.quantity,
                                                    typeProductId: product.typeProductId
                                                }
                                            }
                                                validationSchema={Yup.object(validationObject)}
                                                onSubmit={(data) => {
                                                    data.imageProduct = imgUrls
                                                    console.log(data);
                                                    editProductByAdmin(data).then(res => {
                                                        console.log(res);
                                                        Swal.fire({
                                                            title: "Blog đã được lưu thành công!",
                                                            html: "Chuyển hướng màn hình sau <b>2</b> giây.",
                                                            timer: 2000,
                                                            timerProgressBar: true,
                                                            willClose: () => {
                                                                setTimeout(() => {
                                                                    navigate("/manageProduct")
                                                                }, 1000);
                                                            }
                                                        });
                                                    })
                                                }}
                                                render={({
                                                    setFieldValue
                                                }) => (
                                                    <div className="container-fluid mb-5">
                                                        <Form >
                                                            <div className="tab-content" id="myTabContent">
                                                                <div className="tab-pane fade show active" id="info" role="tabpanel"
                                                                    aria-labelledby="info-tab">
                                                                    <div className="row mt-2 d-flex justify-content-center">
                                                                        <div className="col-12">
                                                                            <div className="row mt-3">
                                                                                <div className="col-2 d-flex align-items-center">
                                                                                    <b>Ảnh sản phẩm</b><span
                                                                                        style={{ color: 'red' }}>&nbsp;*</span>
                                                                                </div>
                                                                                <div className="col row"
                                                                                    style={{ marginLeft: "initial" }}>
                                                                                    <div className="custom-file col">
                                                                                        <input
                                                                                            onChange={handleSelectFiles}
                                                                                            type="file"
                                                                                            id="inputPoster"
                                                                                            accept="image/*"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <Field type="hidden" className="form-control"
                                                                                name="imageProduct" value={imgUrls} />
                                                                            <div className="row mt-3">
                                                                                <div className="col-2
                                   d-flex align-items-center">
                                                                                    <b>Tên sản phẩm</b><span
                                                                                        style={{ color: 'red' }}>&nbsp;*</span>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <Field type="text" className="form-control"
                                                                                        name="nameProduct" />
                                                                                    <ErrorMessage name="nameProduct" component='p'
                                                                                        className="form-err"
                                                                                        style={{ margin: '0', color: 'red' }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-3">
                                                                                <div className="col-2
                                   d-flex align-items-center">
                                                                                    <b>Nội dung</b><span
                                                                                        style={{ color: 'red' }}>&nbsp;*</span>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <Field type="text" className="form-control"
                                                                                        name="content" />
                                                                                    <ErrorMessage name="content" component='p'
                                                                                        className="form-err"
                                                                                        style={{ margin: '0', color: 'red' }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-3">
                                                                                <div className="col-2 d-flex align-items-center">
                                                                                    <b>Loại sản phẩm</b><span style={{ color: 'red' }}>&nbsp;*</span>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <Field as="select" className="custom-select" name="typeProductId"
                                                                                        onChange={(e) => handleSelectChange(e, setFieldValue)}>
                                                                                        <option value="" disabled>--Option Select--</option>
                                                                                        {typeProduct.map((value) => (
                                                                                            <option key={value.id} value={value.id}>
                                                                                                {value.typeProduct}
                                                                                            </option>
                                                                                        ))}
                                                                                    </Field>
                                                                                    <ErrorMessage name="typeProductId" component='p'
                                                                                        className="form-err"
                                                                                        style={{ margin: '0', color: 'red' }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-3">
                                                                                <div className="col-2
                                   d-flex align-items-center">
                                                                                    <b>Giá tiền</b><span
                                                                                        style={{ color: 'red' }}>&nbsp;*</span>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <Field style={{ padding: '0.375rem 0.3rem 0.375rem 0.75rem' }} type="text" className="form-control"
                                                                                        name="price" />
                                                                                    <ErrorMessage name="price" component='p'
                                                                                        className="form-err"
                                                                                        style={{ margin: '0', color: 'red' }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-3">
                                                                                <div className="col-2
                                   d-flex align-items-center">
                                                                                    <b>Số lượng</b><span
                                                                                        style={{ color: 'red' }}>&nbsp;*</span>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <Field style={{ padding: '0.375rem 0.3rem 0.375rem 0.75rem' }} type="text" className="form-control"
                                                                                        name="quantity" />
                                                                                    <ErrorMessage name="quantity" component='p'
                                                                                        className="form-err"
                                                                                        style={{ margin: '0', color: 'red' }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-3">
                                                                                <div className="col-2
                                   d-flex align-items-center">
                                                                                    <b>Mô tả</b><span
                                                                                        style={{ color: 'red' }}>&nbsp;*</span>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <Field as='textarea' rows={5} name="description" className='form-control' style={{ width: '100%' }} />
                                                                                    <ErrorMessage name="description " component='p'
                                                                                        className="form-err"
                                                                                        style={{ margin: '0', color: 'red' }} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-center mt-3">
                                                                    <div>
                                                                        <button type="submit" className="btn__add-new mr-2">
                                                                            Lưu lại
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <Link to="/manageProduct">
                                                                            <button type="button" className="btn__add-new">Quay lại
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-2"></div>
                                                        </Form>
                                                    </div>
                                                )}
                                            >
                                            </Formik>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            </div>
        </>
    )
}

export default EditProduct
