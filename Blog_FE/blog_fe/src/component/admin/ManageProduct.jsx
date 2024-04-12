import React, { useEffect, useState } from 'react'
import '../../ui/css/databoard.css'
import SideBar from '../../ui/SideBar'
import { deleteProductByAdmin, getAllProductByAdmin } from '../../service/Admin';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import MySwal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageProduct = () => {
    const [products, setProducts] = useState();
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const isLogin = localStorage.getItem("isLogin")
    const native = useNavigate();

    useEffect(() => {
        if (isLogin == null) {
            toast(`Yêu cần đăng nhập`)
            native(`/`)
        }
    }, [])

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    useEffect(() => {
        getAllProductByAdmin(0, search).then(res => {
            setProducts(res.content)
            setTotalPages(res.totalPages)
        })
    }, [])

    const onHandLeSearch = () => {
        getAllProductByAdmin(0, search).then(res => {
            console.log(res);
            setProducts(res.content);
            setTotalPages(res.totalPages)
        })
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    const handlePageClick = (e) => {
        const pageNumber = e.selected;
        setCurrentPage(pageNumber);
        getAllProductByAdmin(pageNumber, search).then(res => {
            setProducts(res.content)
            setTotalPages(res.totalPages)
        })
    }

    const onHandleDelete = async (products) => {
        MySwal.fire({
            title: "Xóa Sản Phẩm thất bại",
            text: `Bạn muốn xóa sản phẩm ${products.nameProduct} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy bỏ",
        }).then(async (res) => {
            if (res.isConfirmed) {
                await deleteProductByAdmin(products);
                MySwal.fire(
                    "Xóa thành công!",
                    `${products.nameProduct} đã được xóa.`,
                    "success"
                );
                let updatedPage = currentPage;
                if (products.length === 1 && currentPage > 0) {
                    updatedPage--;
                }
                const result = await getAllProductByAdmin(0, search);
                setProducts(result.content);
                setTotalPages(result.totalPages);
                setCurrentPage(updatedPage);
            }
        });
    };

    if (!products) return <>
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
                                            <h6 className="text-white text-capitalize ps-3 d-flex align-items-center">Quản lý Sản Phẩm</h6>
                                            <Link style={{ padding: '10px' }} to={"/addProduct"} className="text-secondary font-weight-bold text-white ">
                                                Thêm sản phẩm <i class="fas fa-plus-circle"></i>
                                            </Link>
                                            <div className='d-flex justify-content-center align-items-center'>
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
                                        products.length >= 1 ?
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <table className="table align-items-center mb-5">
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">STT</th>
                                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sản Phẩm</th>
                                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên Sản Phẩm</th>
                                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Tiền</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Số lượng</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chức năng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    products.map((value, index) => (
                                                                        <tr key={value.id}>
                                                                            <td>
                                                                                <span className="text-xs font-weight-bold mb-0">{index + 1}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="d-flex px-2 py-1">
                                                                                    <div>
                                                                                        <img src={value.imageProduct} className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h6 className="mb-0 text-sm format-content-product">{value.nameProduct}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <p className="text-xs font-weight-bold mb-0">{formatNumber(value.price)}đ</p>
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">
                                                                                <span className="text-xs font-weight-bold mb-0">{value.quantity}</span>
                                                                            </td>
                                                                            <td className="align-middle text-center">
                                                                                <Link style={{ padding: '10px' }} to={`/editProduct/${value.id}`} className="text-secondary text-xs font-weight-bold  ">Sửa</Link>
                                                                                <a style={{ padding: '10px', cursor: 'pointer' }} className="text-secondary text-xs font-weight-bold" onClick={() => onHandleDelete(value)}>Xóa</a>
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

export default ManageProduct
