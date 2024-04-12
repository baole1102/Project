import React, { useEffect, useState } from 'react'
import '../../ui/css/databoard.css'
import SideBar from '../../ui/SideBar'
import { deleteAccountByAdmin, getAllAccountByAdmin } from '../../service/Admin';
import ReactPaginate from "react-paginate";
import MySwal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom'


const ManageAccount = () => {
    const [accounts, setAccounts] = useState();
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const isLogin = localStorage.getItem("isLogin")  
    const native = useNavigate();

    useEffect(() => {
        if(isLogin == null){
            toast(`Yêu cần đăng nhập`)
            native(`/`)
        }
    },[])

    useEffect(() => {
        getAllAccountByAdmin(0, search).then(res => {
            setAccounts(res.content)
            setTotalPages(res.totalPages)
        })
    }, [])

    const onHandLeSearch = () => {
        getAllAccountByAdmin(0, search).then(res => {
            setAccounts(res.content);
            setTotalPages(res.totalPages)
        })
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    const handlePageClick = (e) => {
        const pageNumber = e.selected;
        setCurrentPage(pageNumber);
        getAllAccountByAdmin(pageNumber, search).then(res => {
            setAccounts(res.content)
            setTotalPages(res.totalPages)
        })
    }

    const onHandleDelete = async (accounts) => {
        MySwal.fire({
            title: "Xóa Tài Khoản",
            text: `Bạn muốn xóa tài khoản ${accounts.name} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy bỏ",
        }).then(async (res) => {
            if (res.isConfirmed) {
                await deleteAccountByAdmin(accounts);
                MySwal.fire(
                    "Xóa thành công!",
                    `${accounts.name} đã được xóa.`,
                    "success"
                );
                let updatedPage = currentPage;
                if (accounts.length === 1 && currentPage > 0) {
                    updatedPage--;
                }
                const result = await getAllAccountByAdmin(updatedPage, search);
                setAccounts(result.content);
                setTotalPages(result.totalPages);
                setCurrentPage(updatedPage);
            }
        });
    };

    if (!accounts) return <>
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
                                            <h6 className="text-white text-capitalize ps-3">Quản lý Tài Khoản</h6>
                                            <div className='d-flex justify-content-center'>
                                                <input placeholder='Tìm kiếm..' type="text" className='input_tesst' onChange={onSearch} />
                                                <button style={{
                                                    width: "1.6rem",
                                                    backgroundColor: "transparent",
                                                    backgroundImage: "none",
                                                    border: "none"
                                                }} onClick={() => onHandLeSearch()}><i className="fas fa-search" /></button>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        accounts.length >= 1 ?
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <table className="table align-items-center mb-5">
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">STT</th>
                                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên</th>
                                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Số điện thoại</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Role</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chức năng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    accounts.map((value, index) => (
                                                                        <tr key={value.id}>
                                                                            <td>
                                                                                <span className="text-xs font-weight-bold mb-0">{index + 1}</span>
                                                                            </td>
                                                                            <td style={{ textAlign: 'center' }}>
                                                                                <div className="d-flex justify-content-center align-items-center px-2 py-1">
                                                                                    <div>
                                                                                        <img src={value.image} className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h6 className="mb-0 text-sm">{value.name}</h6>
                                                                            </td>
                                                                            <td >
                                                                                <p className="text-xs font-weight-bold mb-0">{value.number}</p>
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">
                                                                                <span className="text-xs font-weight-bold mb-0">{value.email}</span>
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">
                                                                                <span className="text-xs font-weight-bold mb-0">{value.role}</span>
                                                                            </td>
                                                                            <td className="align-middle text-center">
                                                                                <a style={{ padding: '10px' }} className="text-secondary text-xs font-weight-bold" onClick={() => onHandleDelete(value)}>Xóa</a>
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

export default ManageAccount
