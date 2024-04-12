import React, { useEffect, useState } from 'react'
import '../ui/css/Login.css'
import { Link } from 'react-router-dom'
import { login } from '../service/Login&Logout';
import SweetAlert from "sweetalert";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        account: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [idBlog, setIdBlog] = useState();
    const [favorite, setFavorite] = useState(false)
    const [cartHome, setCartHome] = useState(false);
    const [cartDetail, setCartDetail] = useState(false);
    const [idProduct, setIdProduct] = useState();
    const [title, setTitle] = useState();
    const [nameProduct, setNameProduct] = useState();

    function to_slug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    useEffect(() => {
        const favorite = localStorage.getItem("checkFavorite");
        const idBlog = localStorage.getItem("idBLog")
        const checkCart = localStorage.getItem("checkCart")
        const idProduct = localStorage.getItem("idProduct")
        const checkCartDetail = localStorage.getItem("checkCartDetail")
        const titleBlog = localStorage.getItem("nameBlog")
        const product = localStorage.getItem("nameProduct")
        if (idBlog) {
            setIdBlog(idBlog);
        }
        if (favorite == "checkFavorite") {
            setFavorite(true);
        }
        if (checkCart == "checkCart") {
            setCartHome(true);
        }
        if (idProduct) {
            setIdProduct(idProduct)
        }
        if (checkCartDetail) {
            setCartDetail(true)
        }
        if (titleBlog) {
            setTitle(titleBlog)
        }
        if (product) {
            setNameProduct(product)
        }
    }
        , [])
    const handleLogin = async () => {
        try {
            if (account.account === "", account.password === "") {
                setError("Tên đăng nhập và mật khẩu không được để trống!");
            } else {
                const req = await login(account)
                localStorage.setItem('idUser', req.dataRes.id)
                localStorage.setItem('nameUser', req.dataRes.name)
                localStorage.setItem('image', req.dataRes.image)
                localStorage.setItem('token', req.token)
                localStorage.setItem('role', req.role)
                localStorage.setItem('isLogin', true)
                if (favorite) {
                    navigate(`/detail/${idBlog}` + "/" + to_slug(title) + ".html");
                } else if (cartHome) {
                    navigate(`/product`);
                } else if (cartDetail) {
                    navigate(`/detailProduct/${idProduct}` + "/" + to_slug(nameProduct) + ".html")
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            setError("Tên đăng nhập hoặc mật khẩu không chính xác!");
        }
    }


    const onChangeAccount = (e) => {
        const { name, value } = e.target;
        setAccount((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(account);
    }

    return (
        <main className="main-content  mt-0">
            <div className="page-header align-items-start min-vh-100" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")' }}>
                <span className="mask bg-gradient-dark opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Đăng nhập</h4>
                                        <div className="row mt-3">
                                            <div className="col-2 text-center ms-auto">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fab fa-facebook-f text-white text-lg"></i>
                                                </a>
                                            </div>
                                            <div className="col-2 text-center px-1">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fab fa-github text-white text-lg"></i>
                                                </a>
                                            </div>
                                            <div className="col-2 text-center me-auto">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fab fa-google text-white text-lg"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form role="form" className="text-start">
                                        <div className="input-group input-group-outline my-3">
                                            <input placeholder='Tài khoản' onChange={onChangeAccount} type="text" name='account' className="form-control" />
                                        </div>
                                        <div className="input-group input-group-outline mb-3">
                                            <input placeholder='Mật khẩu' onChange={onChangeAccount} type="password" name='password' className="form-control" />
                                        </div>
                                        <div className="form-check form-switch d-flex align-items-center mb-3">
                                            <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                                            <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Nhớ mật khẩu</label>
                                        </div>
                                        <div className="text-center">
                                            <button onClick={handleLogin} type="button" className="btn bg-gradient-primary w-100 my-4 mb-2">Đăng nhập</button>
                                        </div>
                                        {error !== "" &&
                                            <div className="text-center">
                                                <ul>
                                                    <li style={{ color: 'red', fontSize: '13px' }}>Tên đăng nhập hoặc mật khẩu không đúng</li>
                                                </ul>
                                            </div>
                                        }
                                        <p className="mt-4 text-sm text-center">
                                            Chưa có tài khoản ?
                                            <Link to={"/logout"} className="text-primary text-gradient font-weight-bold">Đăng ký</Link>
                                            <br />
                                            <Link style={{ fontSize: '13px', fontWeight: '600' }} to={"/"} >Trang chủ</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default Login
