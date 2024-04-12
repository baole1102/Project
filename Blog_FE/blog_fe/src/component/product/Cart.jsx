import React, { useEffect, useState } from 'react'
import '../../ui/css/DetailsProduct.css'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { add, deleteCart, getListCart, getPaymentCart, getTotalPrice, minus, getCountCart } from '../../service/Cart'
import MySwal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserById } from '../../service/User'
import { useNavigate} from 'react-router-dom'


const Cart = () => {
  const [idUser, setIdUser] = useState(localStorage.getItem('idUser') || "");
  const [listProduct, setListProduct] = useState();
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState();
  const [status, setStatus] = useState(false);
  const [countCartNew, setCountCartNew] = useState();
  const isLogin = localStorage.getItem("isLogin")  
  const native = useNavigate();

  useEffect(() => {
      if(isLogin == null){
          toast(`Yêu cần đăng nhập`)
          native(`/`)
      }
  },[])

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    if (idUser) {
      getUserById(idUser).then(res => {
        setUser(res);
      })
      getListCart(idUser).then(res => {
        setListProduct(res)
      })
      getTotalPrice(idUser).then(res => {
        setTotal(res)
      })
    }
  }, [idUser])

  const handleId = (id) => {
    setIdUser(id);
  }

  const onMinusQuanity = (value) => {
    minus(value.id, idUser).then(res => {
      getListCart(idUser).then(res => {
        setListProduct(res)
      })
      getTotalPrice(idUser).then(res => {
        setTotal(res)
      })
    })
  }

  const onAddQuanity = (value) => {
    add(value.id, idUser).then(res => {
      getListCart(idUser).then(res => {
        setListProduct(res)
      })
      getTotalPrice(idUser).then(res => {
        setTotal(res)
      })
    })

  }

  function check(value) {
    deleteCart(value.id, idUser).then(() => {
      Promise.all([
        getListCart(idUser).then(res => {
          setListProduct(res)
        }),
        getTotalPrice(idUser).then(res => {
          setTotal(res)
        }),
        getCountCart(idUser).then(res => {
          console.log(res);
          setCountCartNew(res)
        })
      ]).catch(error => {
        console.error('Error:', error);
        // Xử lý lỗi nếu cần
      });
    })
  }

  const onHandlePayment = () => {
    getPaymentCart(idUser, total).then(res => {
      if (res == false) {
        setStatus(true)
      } else {
        window.location.href = res
      }
    })
  }

  useEffect(() => {
    if (status == true) {
      MySwal.fire({
        title: "Lỗi",
        text: "Số lượng vượt quá số lượng trong kho của chúng tôi",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
      })
    }
  }, [status])

  const onHandleDeleteProduct = async (e) => {
    MySwal.fire({
      title: "Xóa Sản Phẩm",
      text: `Bạn muốn xóa sản phẩm ${e.nameProduct} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await deleteCart(e.id, idUser);
        MySwal.fire(
          "Xóa thành công!",
          `${e.nameProduct} đã được xóa.`,
          "success"
        );
        getListCart(idUser).then(res => {
          setListProduct(res)
        })
        getTotalPrice(idUser).then(res => {
          setTotal(res)
        })
        getCountCart(idUser).then(res => {
          setCountCartNew(res)
        })
      }
    });
  };

  if (!listProduct || !user) return <>
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
      <Header handleId={handleId} countCartNew={countCartNew} />
      <div style={{ marginTop: '100px' }}>
        <section className="breadcrumb-section set-bg" >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="breadcrumb__text">
                  <h2>Shopping Cart</h2>
                  <div className="breadcrumb__option">
                    <a href="./index.html">Home</a>
                    <span>Shopping Cart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="shoping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping__cart__table">
                  {
                    !listProduct.length == 0 ?
                      <table>
                        <thead>
                          <tr>
                            <th className="shoping__product">Sản phẩm</th>
                            <th>Giá tiền</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {
                            listProduct.map(value => (
                              <tr>
                                <td className="shoping__cart__item">
                                  <img style={{ height: '86px', width: '125px' }} src={value.imageProduct} alt />
                                  <h5>{value.nameProduct}</h5>
                                </td>
                                <td className="shoping__cart__price">
                                  {formatNumber(value.price)}đ
                                </td>
                                <td className="shoping__cart__quantity">
                                  <div className="quantity">
                                    {
                                      value.quantity > 1 ?
                                        <button onClick={() => onMinusQuanity(value)} class="button--minus ">
                                          -
                                        </button> : <span></span>
                                    }
                                    {
                                      value.quantityOfProduct === 0 && (
                                            check(value)
                                        )
                                    }
                                    <div className="pro-qty">
                                      <input type="text" value={value.quantity} />
                                    </div>
                                    {
                                      value.quantityOfProduct > value.quantity ?
                                        <button onClick={() => onAddQuanity(value)} class="button--add ">
                                          +
                                        </button> : <></>
                                    }

                                  </div>
                                </td>
                                <td className="shoping__cart__total">
                                  {formatNumber(value.price * value.quantity)}đ
                                </td>
                                <td className="shoping__cart__item__close">
                                  <span onClick={() => onHandleDeleteProduct(value)} className="icon_close" ><i class="fas fa-times-circle"></i></span>
                                </td>
                              </tr>

                            ))
                          }
                        </tbody>
                      </table> :
                      <div className="col-12 d-flex justify-content-center mt-80 mb-80">
                        <h5 style={{ color: "black", fontSize: '25px' }}>Không có sản phẩm nào !</h5>
                      </div>
                  }
                </div>
              </div>
            </div>
            {
              !listProduct.length == 0 && (
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
                    <div className="shoping__checkout">
                      <h5>Tổng Tiền Giỏ Hàng</h5>
                      <ul>
                        <li>Tổng <span>{formatNumber(total)}đ</span></li>
                      </ul>
                      <div className='row'>
                        <div className='col-8'></div>
                        <a style={{ width: '25%', fontSize: '11px', padding: '0', color: 'white' }} onClick={() => onHandlePayment()} className="primary-btn col-lg-3 col-3 ml-30">Thanh Toán</a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </section >
      </div >
      <Footer />
    </>
  )
}

export default Cart
