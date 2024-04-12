import React, { useEffect, useState } from 'react'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { getProductHistory, getUserById } from '../../service/User'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HistoryProduct = () => {
    const [idUser, setIdUser] = useState();
    const [user, setUser] = useState();
    const [status, setStatus] = useState(false);
    const [history, setHistory] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false)
    const native = useNavigate();
    const isLogin = localStorage.getItem("isLogin")  

    useEffect(() => {
        if(isLogin == null){
            toast(`Yêu cần đăng nhập`)
            native(`/`)
        }
    },[])

    const handleId = (id) => {
        setIdUser(id);
    }

    function formatDate(number) {
        return moment(number).format("YYYY-MM-DD HH:mm:ss");;
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

    useEffect(() => {
        console.log(history);
        if (idUser) {
            setLoading(true)
            getProductHistory(page, idUser).then(res => {
                setLoading(false)
                setHistory(prev => prev ? [...prev, ...res.content] : [...res.content]);
                setTotalPages(res.totalPages)
            })
        }
    }, [page, idUser])

    const onCheckDetails = (value) => {
        const confirm = value.confirm;
        native("/detailOrder", { state: { order: formatDate(value.createOrder), confirm } })
    }

    if (!user || !history) return <>
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
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Mã hóa đơn</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Ngày đặt</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                history.map((value, index) => (
                                                    <tr>
                                                        <td>
                                                            <span className="text-secondary text-xs font-weight-bold">HD-{index + 1}</span>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">{formatDate(value.createOrder)}</p>
                                                        </td>
                                                        <td className="align-middle text-center text-sm">
                                                            {
                                                                value.confirm ?
                                                                    <span className="badge badge-sm bg-gradient-success">Đã xác nhận</span>
                                                                    :
                                                                    <span className="badge badge-sm bg-gradient-success">Chờ xác nhận</span>
                                                            }
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <a style={{cursor:'pointer'}} className="text-secondary text-xs font-weight-bold" onClick={() => onCheckDetails(value)} >Xem chi tiết</a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        page < totalPages && (
                                            <div className='row d-flex justify-content-center mt-4'>
                                                <a style={{
                                                    fontSize: '9px',
                                                    color: "black",
                                                    padding: " 0 7px",
                                                    fontSize: "13px", textAlign: 'center',
                                                    cursor:'pointer'
                                                }} className="col-2 mt-60" onClick={() => setPage(page + 1)} >{loading ? "Loading...." : "Show more"}</a>
                                            </div>
                                        )
                                    }
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

export default HistoryProduct
