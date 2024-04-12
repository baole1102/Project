import React, { useEffect, useState } from 'react'
import '../../ui/css/databoard.css'
import SideBar from '../../ui/SideBar'
import { getAllOrderByAdmin } from '../../service/Admin';
import ReactPaginate from "react-paginate";
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageConfirmOrder = () => {
    const [order, setOrder] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const native = useNavigate();
    const isLogin = localStorage.getItem("isLogin")  

    useEffect(() => {
        if(isLogin == null){
            toast(`Yêu cần đăng nhập`)
            native(`/`)
        }
    },[])

    useEffect(() => {
        getAllOrderByAdmin(0).then(res => {
            setOrder(res.content)
            setTotalPages(res.totalPages)
        })
    }, [])

    const handlePageClick = (e) => {
        const pageNumber = e.selected;
        setCurrentPage(pageNumber);
        getAllOrderByAdmin(pageNumber).then(res => {
            setOrder(res.content)
            setTotalPages(res.totalPages)
        })
    }

    function formatDate(number) {
        return moment(number).format("YYYY-MM-DD HH:mm:ss");;
    }

    const onCheckDetails = (value) => {
        const idUser = value.idUser
        const status = value.confirm
        console.log(status);
        native("/confirmOrder", { state: { order: formatDate(value.createOrder), idUser,status} })
    }

    if (!order) return <>
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
                                            <h6 className="text-white text-capitalize ps-3">Quản lý hóa đơn</h6>
                                        </div>
                                    </div>
                                    {
                                        order.length >= 1 ?
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <table className="table align-items-center mb-5">
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">STT</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thời gian đặt hàng</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chức năng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    order.map((value, index) => (
                                                                        <tr key={value.id}>
                                                                            <td className="text-center">
                                                                                <span className="text-xs font-weight-bold mb-0">HD-{index + 1}</span>
                                                                            </td>
                                                                            <td className="text-center">
                                                                                <span className="text-xs font-weight-bold mb-0">{formatDate(value.createOrder)}</span>
                                                                            </td>
                                                                            <td className="text-center">
                                                                                <h6 className="mb-0 text-xs">{value.name}</h6>
                                                                            </td>
                                                                            <td className="text-center">
                                                                                {
                                                                                    value.confirm ? (<p className="text-xs font-weight-bold mb-0 ">Đã xác nhận</p>) : (<p className="text-xs font-weight-bold mb-0 ">Chờ xác nhận</p>) 
                                                                                }
                                                                            </td>
                                                                            <td className="align-middle text-center">
                                                                                <a style={{ padding: '10px', cursor:'pointer' }} className="text-secondary text-xs font-weight-bold" onClick={() => onCheckDetails(value)} >Xem chi tiết</a>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                        {totalPages > 1 &&
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <ReactPaginate
                                                                    forcePage={currentPage}
                                                                    breakLabel="..."
                                                                    nextLabel="Trang Sau"
                                                                    onPageChange={handlePageClick}
                                                                    pageRangeDisplayed={2}
                                                                    marginPagesDisplayed={2}
                                                                    pageCount={totalPages}
                                                                    previousLabel="Trang Trước"
                                                                    pageClassName="page-item"
                                                                    pageLinkClassName="page-link"
                                                                    previousClassName="page-item"
                                                                    previousLinkClassName="page-link"
                                                                    nextClassName="page-item"
                                                                    nextLinkClassName="page-link"
                                                                    breakClassName="page-item"
                                                                    breakLinkClassName="page-link"
                                                                    containerClassName="pagination"
                                                                    activeClassName="active"
                                                                />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div> :
                                            <div>
                                                <span>Không có dữ liệu</span>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main >
            </div >
        </>
    )
}

export default ManageConfirmOrder
