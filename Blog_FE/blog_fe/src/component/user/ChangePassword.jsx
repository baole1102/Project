import React, { useEffect, useState } from 'react'
import '../../ui/css/Profile.css'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { channgePassword, checkPassword, getBlogByUserId, getUserById } from '../../service/User'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const [idUser, setIdUser] = useState();
    const [user, setUser] = useState();
    const [blog, setBlog] = useState();
    const [status, setStatus] = useState(false);
    const [showError, setShowError] = useState(``);
    const [currentPassword, setCurrentPassword] = useState();
    const isLogin = localStorage.getItem("isLogin")
    const native = useNavigate();

    useEffect(() => {
        if (isLogin == null) {
            toast(`Yêu cần đăng nhập`)
            native(`/`)
        }
    }, [])

    const handleId = (id) => {
        setIdUser(id);
    }

    // const handlePassword = async (password) => {
    //     console.log(password);
    //     checkPassword(idUser, password).then(res => {
    //         if (res === true) {
    //             setShowError(true);
    //             setCurrentPassword(password);
    //         } else {
    //             setShowError(false);
    //         }
    //     })
    // }
    // console.log(currentPassword);

    useEffect(() => {
        console.log(currentPassword);
    }, [currentPassword])

    useEffect(() => {
        if (idUser) {
            getUserById(idUser).then(res => {
                setUser(res);
            })
            getBlogByUserId(0, idUser).then(res => {
                setBlog(res.content);
            })
        }
        if (user) {
            setStatus(user.status)
        }
    }, [idUser, user])


    if (!user || !blog) return <>
        <Header handleId={handleId} />
        <div className="main">
            <div className="mario_bin"></div>
            <div className="mario_run">
                <div className="mario_run1"></div>
            </div>
            <div className="walls">
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
            </div>
            <div className="text"></div>
        </div>
    </>

    return (
        <>
            <Header handleId={handleId} />
            <div className="container mt-7">
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={user.image} alt="Admin" className="rounded-circle p-1 bg-primary" width={110} />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
                                            <Link to={"/profile"}>
                                                <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 10px 0 5px' }} class="fas fa-user"></i>Thông tin cá nhân</h6>
                                            </Link>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <Link to={"/changePassword"}>
                                                <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 10px 0 5px' }} class="fas fa-key"></i>Đổi mật khẩu</h6>
                                            </Link>
                                        </li>
                                        {
                                            status ?
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <Link to={"/manageBlogMember"}>
                                                        <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 13px 0 5px' }} class="fas fa-blog"></i>Quản lý blog</h6>
                                                    </Link>
                                                    <Link to={"/user/addBlog"}>
                                                        <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 13px 0 5px' }} class="fas fa-bookmark"></i>Thêm blog</h6>
                                                    </Link>
                                                </li> : <></>
                                        }
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <Link to={"/historyProduct"}>
                                                <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 10px 0 5px' }} class="fas fa-history"></i>Lịch sử mua hàng</h6>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <Formik
                                    initialValues={{
                                        password: currentPassword,
                                        newPassword: "",
                                        confirmPassword: ""
                                    }}
                                    validationSchema={Yup.object({
                                        newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới").min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(20, "Mật khẩu không được quá 20 ký tự"),
                                        confirmPassword: Yup.string().required("Vui lòng nhập lại mật khẩu mới").oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp')
                                    })}

                                    onSubmit={value => (
                                        checkPassword(idUser, currentPassword).then(res => {
                                            if (res === true) {
                                                setShowError(true);
                                                channgePassword(idUser, value.confirmPassword).then(
                                                    () => {
                                                        native("/login")
                                                        localStorage.clear()
                                                        Swal.fire({
                                                            title: "Đổi mật khẩu thành công !",
                                                            text: "Vui lòng đăng nhập lại.",
                                                            icon: "success"
                                                        }
                                                        )
                                                    }
                                                )
                                            } else {
                                                setShowError(false);
                                            }
                                        })

                                    )
                                    }

                                >
                                    <Form >
                                        <div className="card-body" >
                                            <div className="row mb-3">
                                                <div className="col-sm-3 d-flex align-items-center">
                                                    <h6 className="mb-0">Mật khẩu cũ:</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field name="password" type="password" className="form-control pl-2" placeholder='Nhập mật khẩu cũ' onChange={(event) =>
                                                        setCurrentPassword(event.target.value)} />
                                                    {showError === false &&
                                                        <div className="errors">
                                                            <p>Mật khẩu cũ của bạn không đúng
                                                            </p>
                                                        </div>}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3 d-flex align-items-center">
                                                    <h6 className="mb-0 ">Mật khẩu mới:</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field name="newPassword" type="password" className="form-control pl-2" placeholder='Nhập mật khẩu mới' />
                                                    <ErrorMessage name="newPassword" component="p"
                                                        className="form-err"
                                                        style={{ margin: '0', color: 'red' }} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3 d-flex align-items-center">
                                                    <h6 className="mb-0">Xác nhận mật khẩu:</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field name="confirmPassword" type="password" className="form-control pl-2" placeholder='Xác nhận mật khẩu mới' />
                                                    <ErrorMessage name="confirmPassword" component="p"
                                                        className="form-err"
                                                        style={{ margin: '0', color: 'red' }} />
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <button type="submit" className="btn__add-new mr-2">
                                                    Cập nhật
                                                </button>
                                            </div>

                                        </div>

                                    </Form>

                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ChangePassword
