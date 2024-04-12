import React, { useEffect, useState } from 'react'
import '../ui/css/Header.css'
import { getAllCategory } from '../service/Category';
import { Link, useLocation } from 'react-router-dom';
import { checkCount } from '../service/Favorite';
import { getCountCart, getListCart } from '../service/Cart';
import { getUserById } from '../service/User';
import { getPayment } from '../service/Payment';
import MySwal from "sweetalert2";
import SweetAlert from "sweetalert";
import { useNavigate } from "react-router-dom";
import HeaderNoLogin from './HeaderNoLogin';

const Header = (props) => {
  const [category, setCategory] = useState();
  const [idUser, setIdUser] = useState();
  const [count, setCount] = useState();
  const [countC, setCountC] = useState();
  const { handleId, countFavorite, countCart, countCartNew, check } = props;
  const [test, setTest] = useState();
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const price = 500000;
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [image, setImage] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState();

  const onHandlePayment = () => {
    MySwal.fire({
      title: 'Thông tin Vip',
      html: `
        <div class="d-flex justify-content-center">
          <div class="card2">
            <p class="heading">
              Vé Vip
            </p>
            <p>
              + Có thể đăng blog riêng cho bạn
            </p>
            <p id="buyButton">Mua</p>
          </div>
        </div>`

    });

    document.getElementById('buyButton').onclick = onHandlePay;
  }

  const logout = async () => {
    localStorage.clear();
    navigate("/")
    await SweetAlert(
      "Đăng xuất thành công",
      `Cám ơn bạn đã trải nghiệm hệ thống của chúng tôi!`,
      "success"
    );
    setIsLogin(false)
  }

  const onHandlePay = () => {
    getPayment(idUser, price).then(res => {
      window.location.href = res;
    });
  }

  useEffect(() => {
    if (idUser) {
      getUserById(idUser).then(res => {
        setUser(res);
      })
    }
  }, [idUser])


  useEffect(() => {
    setCount(countFavorite);
  }, [countFavorite])

  useEffect(() => {
    setCountC(countCart)
  }, [countCart])

  useEffect(() => {
    setCountC(countCartNew)
  }, [countCartNew])

  useEffect(() => {
    handleId(idUser)
  }, [idUser])

  useEffect(() => {
    getAllCategory().then(res => {
      setCategory(res)
    })
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('nameUser');
    const image = localStorage.getItem('image');
    const idUser = localStorage.getItem('idUser')
    const isLogin = localStorage.getItem("isLogin");
    const token = localStorage.getItem("token")
    if (isLogin) {
      setIsLogin(true)
    }
    setToken(token)
    setRole(role);
    setIdUser(idUser)
    setImage(image)
    setUserName(userName)
  }, [])

  useEffect(() => {
    if (idUser) {
      checkCount(idUser).then(res => {
        setCount(res)
      })
      getCountCart(idUser).then(res => {
        setCountC(res)
      })
    }
  }, [idUser])
  if (!category) return null
  return (
    <>
      {isLogin ?
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
          <div className="container">
            <Link className="navbar-brand" to={"/"}><img src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Flogo.png?alt=media&token=d4fb7cd9-e2c0-46b8-be91-b2fe7699c5d9" alt="..." /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars ms-1" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                {
                  role == "ROLE_USER" && (
                    <li className="nav-item">
                      <div onClick={onHandlePayment} class="tooltip-container">
                        <span class="text-1">Mua Vip 👆</span>
                        <span >Click! 👋</span>
                      </div>
                    </li>
                  )
                }
                <li className="nav-item"><Link to={"/product"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" href="#about">Công nghệ</Link></li>
                <li className="nav-item ml-1"><Link to={"/cart"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" >
                  <i style={{ position: 'relative' }} class="fas fa-shopping-cart">
                    <div style={{ position: 'absolute', top: '-55%', transform: 'translateX(105%)', width: '16px', textAlign: 'center', backgroundColor: '#bee796', borderRadius: '50%' }}>{countC}</div>
                  </i>
                </Link></li>
                <li className="nav-item ml-1"><Link to={"/favorite"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" ><i style={{ position: 'relative' }} class="fas fa-star">
                  <div style={{ position: 'absolute', top: '-55%', transform: 'translateX(105%)', width: '16px', textAlign: 'center', backgroundColor: '#bee796', borderRadius: '50%' }}>{count}</div>
                </i></Link></li>
                <li className="nav-item"><span style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" >{userName}</span></li>
                <li className="nav-item mr-10 ml-10"><img style={{borderRadius:'50%',width:'25px',height:'25px'}} src={image} /></li>
                {role == "ROLE_USER" && (
                  <li className="nav-item">
                    <div style={{ height: '0px' }} class="dropdown">
                      <span style={{ padding: '4px' }} class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-caret-down"></i>
                      </span>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><Link class="dropdown-item" to={'/profile'}>Thông tin </Link></li>
                        <li><a class="dropdown-item" onClick={() => logout()}>Đăng xuất</a></li>
                      </ul>
                    </div>
                  </li>)
                }
                {role == "ROLE_MEMBER" && (
                  <li className="nav-item">
                    <div style={{ height: '0px' }} class="dropdown">
                      <span style={{ padding: '4px' }} class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-caret-down"></i>
                      </span>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><Link class="dropdown-item" to={'/profile'}>Thông tin </Link></li>
                        <li><a class="dropdown-item" onClick={() => logout()}>Đăng xuất</a></li>
                      </ul>
                    </div>
                  </li>)
                }
                {role == "ROLE_ADMIN" &&
                  (<li className="nav-item">
                    <div style={{ height: '0px' }} class="dropdown">
                      <span style={{ padding: '4px' }} class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-caret-down"></i>
                      </span>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><Link class="dropdown-item" to={'/profile'}>Thông tin </Link></li>
                        <li><Link class="dropdown-item" to={'/manageBlog'}>Quản lý</Link></li>
                        <li><a class="dropdown-item" onClick={() => logout()}>Đăng xuất</a></li>
                      </ul>
                    </div>
                  </li>)
                }
              </ul>
            </div>
          </div>
        </nav> :
        <HeaderNoLogin />
      }
    </>
  )
}

export default Header
