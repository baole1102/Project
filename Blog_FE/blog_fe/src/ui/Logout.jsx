import React from 'react'
import '../ui/css/databoard.css'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { register } from '../service/Login&Logout';
import SweetAlert from "sweetalert";


const Logout = () => {
    // const registerAccount = (values, { setErrors }) => {
    //     register(values).then(res => {
    //         SweetAlert(
    //             "Đăng kí thành công!",
    //             `Xin mời bạn đăng nhập để vào hệ thống!`,
    //             "success"
    //         );
    //     }).catch(e => {
    //          SweetAlert(
    //             "Đăng kí thất bại!",
    //             `Vui lòng nhập lại thông tin!`,
    //             "error"
    //         );
    //     })
    // }

    const initialValues = {
        account: "",
        email: "",
        name: "",
        number: "",
        password: ""
    }

    const validationObject = {
        account: Yup.string().required("Tài Khoản không được để trống").min(6, "Tài Khoản từ 6 - 20 kí tự").max(20, "Tài Khoản từ 6 - 20 kí tự").matches("^[a-z0-9_-]+$", "Tài Khoản Vui Lòng Nhập Đúng Định Dạng"),
        email: Yup.string()
            .required("Email Không được để rỗng")
            .matches(/^[\w\-.]+@([\w\-]+\.)+[\w\-]{2,}$/, "Email vui lòng nhập đúng định dạng"),
        name: Yup.string()
            .required("Họ Và Tên không được để rỗng")
            .min(6, "Họ và Tên từ 6 - 45 kí tự")
            .max(45, "Họ và Tên từ 6 - 45 kí tự")
            .matches(
                /^[A-Za-zÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:\s+[A-Za-zÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*\s*$/,
                "Họ Và Tên vui lòng nhập đúng định dạng"
            ),
        number: Yup.string().required("Số Điện Thoại không được để rỗng").matches("^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$", "Số điện thoại vui lòng nhập đúng định dạng"),
        password: Yup.string().required("Mật Khẩu không được để rỗng").min(6, "Mật Khẩu độ dài từ 6-20 kí tự").max(20, "Mật Khẩu độ dài từ 6-20 kí tự"),
    }

    return (
        <main className="main-content  mt-0">
            <section>
                <div className="page-header min-vh-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                                <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                                    style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fillustration-signup.jpg?alt=media&token=fad57f60-043f-4b79-b865-fbc408775b33")', backgroundSize: 'cover' }}>
                                </div>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={Yup.object(validationObject)}
                                onSubmit={(data) => {
                                    // console.log(data);
                                    // registerAccount(data, { setErrors })
                                }}
                            >
                                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                                    <div className="card card-plain">
                                        <div className="card-header">
                                            <h4 className="font-weight-bolder">Đăng ký</h4>
                                            <p className="mb-0">Nhập thông tin để đăng nhập</p>
                                        </div>
                                        <div className="card-body">
                                            <Form role="form">
                                                <div className="input-group input-group-outline mb-3 row ml-1">
                                                    <Field placeholder="Tài khoản" type="text" className="form-control" name="account" />
                                                    <ErrorMessage name="account" component='p'
                                                        className="form-err"
                                                        style={{ fontSize: '13px', margin: '0', color: 'red' }} />
                                                </div>
                                                <div className="input-group input-group-outline mb-3 row ml-1">
                                                    <Field placeholder="Tên" type="text" className="form-control col-12" name="name" /> <br></br>
                                                    <ErrorMessage name="name" component='p'
                                                        className="form-err"
                                                        style={{ fontSize: '13px', margin: '0', color: 'red' }} />
                                                </div>
                                                <div className="input-group input-group-outline mb-3 row ml-1">
                                                    <Field placeholder="Số điện thoại" type="text" className="form-control" name="number" />
                                                    <ErrorMessage name="number" component='p'
                                                        className="form-err"
                                                        style={{ fontSize: '13px', margin: '0', color: 'red' }} />
                                                </div>
                                                <div className="input-group input-group-outline mb-3 row ml-1">
                                                    <Field placeholder="Email" type="text" className="form-control" name="email" />
                                                    <ErrorMessage name="email" component='p'
                                                        className="form-err"
                                                        style={{ fontSize: '13px', margin: '0', color: 'red' }} />
                                                </div>
                                                <div className="input-group input-group-outline mb-3 row ml-1">
                                                    <Field placeholder="Mật khẩu" type="password" className="form-control" name="password" />
                                                    <ErrorMessage name="password" component='p'
                                                        className="form-err"
                                                        style={{ fontSize: '13px', margin: '0', color: 'red' }} />
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Đăng Ký</button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                            <p className="mb-2 text-sm mx-auto">
                                                Bạn đã có tài khoản?
                                                <Link to={"/login"} className="text-primary text-gradient font-weight-bold">Đăng Nhập</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Logout
