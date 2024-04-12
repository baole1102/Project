import React, { useEffect, useState } from 'react'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { getUserById } from '../../service/User'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllBlogByMember } from '../../service/Member'
import ReactPaginate from "react-paginate";
import { deleteBlogByAdmin } from '../../service/Admin';
import MySwal from "sweetalert2";

const ManageBlogUser = () => {
    const [idUser, setIdUser] = useState();
    const [user, setUser] = useState();
    const [status, setStatus] = useState(false);
    const [blog, setBlog] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const native = useNavigate();
    const isLogin = localStorage.getItem("isLogin")

    useEffect(() => {
        if (isLogin == null) {
            toast(`Yêu cần đăng nhập`)
            native(`/`)
        }
    }, [])

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

    useEffect(() => {
        if (idUser) {
            getAllBlogByMember(0, idUser).then(res => {
                setBlog(res.content)
                setTotalPages(res.totalPages)
            })
        }
    }, [idUser])

    const handlePageClick = (e) => {
        const pageNumber = e.selected;
        setCurrentPage(pageNumber);
        getAllBlogByMember(pageNumber, idUser).then(res => {
            setBlog(res.content)
            setTotalPages(res.totalPages)
        })
    }

    const onHandleDelete = async (blog) => {
        MySwal.fire({
            title: "Xóa Blog",
            text: `Bạn muốn xóa blog ${blog.title} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy bỏ",
        }).then(async (res) => {
            if (res.isConfirmed) {
                await deleteBlogByAdmin(blog);
                MySwal.fire(
                    "Xóa thành công!",
                    `${blog.title} đã được xóa.`,
                    "success"
                );
                let updatedPage = currentPage;
                if (blog.length === 1 && currentPage > 0) {
                    updatedPage--;
                }
                const result = await getAllBlogByMember(updatedPage, idUser);
                setBlog(result.content);
                setTotalPages(result.totalPages);
                setCurrentPage(updatedPage);
            }
        });
    };

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
                                <div className="card-body">
                                    <table className="table align-items-center mb-5">
                                        <thead style={{ textAlign: 'center' }}>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">STT</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Tên Blog</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày tạo</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                blog.map((value, index) => (
                                                    <tr style={{ textAlign: 'center' }} key={value.id}>
                                                        <td>
                                                            <span className="text-secondary text-xs font-weight-bold">{index + 1}</span>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">{value.title}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">{value.createDay}</p>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <Link style={{ cursor: 'pointer', margin: '0 5px' }} className="text-secondary text-xs font-weight-bold" to={`/edit/${value.id}`} ><i class="fas fa-edit"></i></Link>
                                                            <a style={{ cursor: 'pointer', margin: '0 5px' }} className="text-secondary text-xs font-weight-bold" onClick={() => onHandleDelete(value)} ><i class="fas fa-trash-alt"></i></a>
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
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ManageBlogUser
