import React, { useEffect, useState } from 'react'
import '../../ui/css/databoard.css'
import SideBar from '../../ui/SideBar'
import { confirmOrderByAdmin, getDetailsOrderByAdmin, getTotalPriceOrderByAdmin, getUserByAdmin } from '../../service/Admin';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmOrder = () => {
    const [order, setOrder] = useState();
    const location = useLocation();
    const data = location.state?.order;
    const idUser = location.state?.idUser ;
    const status = location.state?.status ;
    const [total, setTotal] = useState();
    const [user, setUser] = useState();
    const native = useNavigate();
    const isLogin = localStorage.getItem("isLogin")  

    useEffect(() => {
        if(isLogin == null){
            toast(`Yêu cần đăng nhập`)
            native(`/`)
        }
    },[])

    useEffect(() => {
        getDetailsOrderByAdmin(data, idUser).then(res => {
            setOrder(res);
        })
        getTotalPriceOrderByAdmin(data, idUser).then(res => {
            setTotal(res)
        })
        console.log(status);
    }, [idUser])

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    useEffect(() => {
        if (idUser) {
            getUserByAdmin(idUser).then(res => {
                setUser(res);
            })
        }
    }, [idUser])

    const onHandleConfirm = (data, idUser) => {
        confirmOrderByAdmin(data, idUser).then(res => {
            native("/manageOrder")
            toast("Xác nhận thành công!")
        })
    }


    if (!order || !total || !user ) return <>
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
            <div style={{margin:'0px'}} className='row'>
                <div className='col-3'>
                    <SideBar />
                </div>
                <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg col-9">
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="card my-4">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div style={{ justifyContent: 'space-between' }} className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 d-flex">
                                            <h6 className="text-white text-capitalize ps-3">Chi tiết hóa đơn</h6>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="shoping__cart__table mt-3">
                                                        <table>
                                                            <thead>
                                                                <tr >
                                                                    <th style={{ fontSize: '14px' }} className="shoping__product detailOrder">Sản phẩm</th>
                                                                    <th style={{ fontSize: '14px' }} className='detailOrder'>Giá tiền</th>
                                                                    <th style={{ fontSize: '14px' }} className='detailOrder'>Số lượng</th>
                                                                    <th style={{ fontSize: '14px' }} className='detailOrder'>Tổng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    order.map(value => (
                                                                        <tr>
                                                                            <td className="shoping__cart__item pt-3 pb-3">
                                                                                <img style={{ height: '86px', width: '125px' }} src={value.imageProduct} alt />
                                                                                <h5 style={{ fontSize: '14px' }}>{value.nameProduct}</h5>
                                                                            </td>
                                                                            <td style={{ fontSize: '14px' }} className="shoping__cart__price pt-3 pb-3">
                                                                                {formatNumber(value.price)}đ
                                                                            </td>
                                                                            <td className="shoping__cart__quantity pt-3 pb-3">
                                                                                <div className="quantity">
                                                                                    <div className="pro-qty">
                                                                                        <input style={{ fontSize: '14px', background: "transparent" }} type="text" value={value.quantity} />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td style={{ fontSize: '14px' }} className="shoping__cart__total pt-3 pb-3">
                                                                                {formatNumber(value.price * value.quantity)}đ
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="shoping__continue">
                                                        <div className="shoping__discount">
                                                            <h5 style={{ fontSize: '17px' }}>Thông tin khách hàng</h5>
                                                            <p style={{ marginBottom: '2px' }}>Tên: {user.name}</p>
                                                            <p style={{ marginBottom: '2px' }}>Địa chỉ: {user.address}</p>
                                                            <p style={{ marginBottom: '2px' }}>Số điện thoại: {user.number}</p>
                                                            <p></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div style={{ marginTop: '30px', background: '#fff', textAlign: 'center' }} className="shoping__checkout">
                                                        <h5 style={{ fontSize: '17px', marginBottom: '7px' }}>Tổng tiền</h5>
                                                        <p>Tổng: {formatNumber(total)} đ</p>
                                                        {
                                                            status ? <p></p> : <span onClick={() => onHandleConfirm(data, idUser)} style={{ marginBottom: '2px', padding: '0', 'fontSize': '12px', width: '37%', marginBottom: '2px', float: 'right', marginRight: '120px',borderRadius:'0px' }} className="primary-btn col-lg-4 col-4 ml-30">
                                                                Xác nhận
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main >
            </div >
        </>
    )
}

export default ConfirmOrder