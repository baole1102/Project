import React from 'react'
import '../ui/css/Header.css'

import { Link } from 'react-router-dom';
const HeaderNoLogin = () => {    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand" to={"/"}><img src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Flogo.png?alt=media&token=d4fb7cd9-e2c0-46b8-be91-b2fe7699c5d9" alt="..." /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link to={"/product"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" href="#about">Công nghệ</Link></li>
                            <li className="nav-item"><a style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" href="#about">About Us</a></li>
                            <li className="nav-item"><Link to={"/login"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" href="#contact">Đăng Nhập</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default HeaderNoLogin
