import React from 'react'
import '../ui/css/databoard.css'
import { Link } from 'react-router-dom'
const SideBar = () => {
    return (
        <>
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
                <div className="sidenav-header">
                    <Link style={{ width: '100%' }} className="navbar-brand m-0" to="/manageBlog" target="_blank">
                        <i class="fas fa-tasks"></i>
                        <span className="ms-1 font-weight-bold text-white pl-2">Quản Lý</span>
                    </Link>
                </div>
                <hr className="horizontal light mt-0 mb-2" />
                <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white " to="/manageOrder">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">table_view</i>
                                </div>
                                <span className="nav-link-text ms-1">Quản lý hóa đơn</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white " to={"/manageBlog"}>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="fas fa-blog"></i>
                                </div>
                                <span className="nav-link-text ms-1">Quản Lý Blog</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white " to={"/manageProduct"}>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="fab fa-product-hunt"></i>
                                </div>
                                <span className="nav-link-text ms-1">Quản Lý Sản Phẩm</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white " to={"/manageAccount"}>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="fas fa-users"></i>
                                </div>
                                <span className="nav-link-text ms-1">Quản Lý Tài Khoản</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white " to="/">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="fas fa-home"></i>                                </div>
                                <span className="nav-link-text ms-1">Trang Chủ</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidenav-footer position-absolute w-100 bottom-0 ">
                    <div className="mx-3">
                        <a className="btn bg-gradient-primary w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Đăng suất</a>
                    </div>
                </div>
            </aside>

        </>
    )
}

export default SideBar
