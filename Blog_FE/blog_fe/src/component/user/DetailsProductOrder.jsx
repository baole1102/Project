import React, { useEffect, useState } from 'react'
import '../../ui/css/Profile.css'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { getDetailsOrder, getTotalPriceOrder, getUserById } from '../../service/User'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../../ui/css/DetailsProduct.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DetailsProductOrder = () => {
    const [idUser, setIdUser] = useState();
    const [user, setUser] = useState();
    const [status, setStatus] = useState(false);
    const [order, setOrder] = useState();
    const [total, setTotal] = useState();
    const location = useLocation();
    const data = location.state?.order || [];
    const confirm = location.state?.confirm;
    const isLogin = localStorage.getItem("isLogin")
    const native = useNavigate();

    useEffect(() => {
        if (isLogin == null) {
            toast(`Yêu cần đăng nhập`)
            native(`/`)
        }
    }, [])

    useEffect(() => {
        if (idUser) {
            getDetailsOrder(data, idUser).then(res => {
                setOrder(res);
            })
            getTotalPriceOrder(data, idUser).then(res => {
                setTotal(res)
            })
        }

    }, [idUser])

    const handleId = (id) => {
        setIdUser(id);
    }


    useEffect(() => {
        if (idUser) {
            getUserById(idUser).then(res => {
                setUser(res);
            })
        }
        if (user) {
            setStatus(user.status)
        }
    }, [idUser, user])

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    if (!order || !user) return <>
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
                                <div className="card-body">
                                    <table style={{ width: '100%' }}>
                                        <thead>
                                            <tr >
                                                <th className="shoping__product detailOrder">Sản phẩm</th>
                                                <th className='detailOrder'>Giá tiền</th>
                                                <th className='detailOrder'>Số lượng</th>
                                                <th className='detailOrder'>Tổng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.map(value => (
                                                    <>
                                                        <tr >
                                                            <td className="shoping__cart__item">
                                                                <img style={{ height: '86px', width: '125px' }} src={value.imageProduct} alt />
                                                                <h5 className='format-content-product'>{value.nameProduct}</h5>
                                                            </td>
                                                            <td style={{ fontSize: '16px' }} className="shoping__cart__price">
                                                                {formatNumber(value.price)} đ
                                                            </td>
                                                            <td className="shoping__cart__quantity">
                                                                <div className="quantity">
                                                                    <div className="pro-qty">
                                                                        <input style={{ fontSize: '16px', background: "transparent" }} type="text" value={value.quantity} />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style={{ fontSize: '16px' }} className="shoping__cart__total">
                                                                {formatNumber(value.price * value.quantity)} đ
                                                            </td>
                                                        </tr>
                                                        <div className='mb-4'></div>
                                                    </>

                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="shoping__continue">
                                                <div className="shoping__discount">
                                                    <h5 style={{ fontSize: '17px' }}>Thông tin khách hàng</h5>
                                                    <p style={{ marginBottom: '2px' }}>Tên: {user.name}</p>
                                                    <p style={{ marginBottom: '2px' }}>Địa chỉ: {user.address}</p>
                                                    <p style={{ marginBottom: '2px' }}>Số điện thoại: {user.number}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div style={{ marginTop: '30px' }} className="shoping__checkout">
                                                <h5 style={{ fontSize: '17px', marginBottom: '7px' }}>Tổng tiền</h5>
                                                <p style={{ marginBottom: '2px' }}>
                                                    Trạng thái:
                                                    {
                                                        confirm ? <> Đã xác nhận</> : <> Chờ xác nhận</>
                                                    }
                                                </p>
                                                <p>Tổng: {formatNumber(total)} đ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetailsProductOrder
