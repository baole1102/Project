import React, { useEffect, useState } from 'react'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import '../../ui/css/DetailsProduct.css'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, getProductRelated } from '../../service/Product'
import { addToCart, getCountCart } from '../../service/Cart'
import MySwal from "sweetalert2";
import { Link } from 'react-router-dom';

const DetailProduct = () => {
    const [idUser, setIdUser] = useState();
    const [product, setProduct] = useState();
    const { id } = useParams();
    const [countCart, setCountCart] = useState();
    const [relative, setRelative] = useState();
    const native = useNavigate()

    useEffect(() => {
        getProductById(id).then(res => {
            setProduct(res)
        })
    }, [id])

    useEffect(() => {
        getProductRelated().then(res => {
            setRelative(res)
        })
        if (idUser) {
            localStorage.removeItem("checkCartDetail")
            localStorage.removeItem("idProduct")
            localStorage.removeItem("nameProduct")
        }
    }, [])

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleId = (id) => {
        setIdUser(id);
    }
    const onHandleAddProduct = () => {
        if (idUser == null) {
            localStorage.setItem("checkCartDetail", "checkCartDetail")
            localStorage.setItem("idProduct", product.id)
            localStorage.setItem("nameProduct", product.nameProduct)
            native("/login");
        } else {
            addToCart(product.id, idUser).then(res => {
                MySwal.fire({
                    title: "Đặt thành công",
                    text: `${product.nameProduct}` + "đã vào giỏ hàng",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Đồng ý",
                })
            }).then(() => {
                getCountCart(idUser).then(res => {
                    console.log(res);
                    setCountCart(res)
                })
            })
        }

    }

    const onHandleAddProductRelative = (e) => {
        if (idUser == null) {
            localStorage.setItem("checkCartDetail", "checkCartDetail")
            localStorage.setItem("idProduct", e.id)
            localStorage.setItem("nameProduct", product.nameProduct)
            native("/login");
        } else {
            addToCart(e.id, idUser).then(res => {
                MySwal.fire({
                    title: "Đặt thành công",
                    text: `${e.nameProduct}` + "đã vào giỏ hàng",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Đồng ý",
                })
            }).then(() => {
                getCountCart(idUser).then(res => {
                    console.log(res);
                    setCountCart(res)
                })
            })
        }
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function to_slug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');
        // return
        return str;
    }

    if (!product || !relative) return <>
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
            <Header handleId={handleId} countCart={countCart} />
            <>
                <div style={{ marginTop: '80px' }}>
                    <section className="product-details spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="product__details__pic">
                                        <div className="product__details__pic__item">
                                            <img style={{ width: '92%', height: '50%' }} className="product__details__pic__item--large" src={product.imageProduct} alt />
                                        </div>
                                        <div className="product__details__pic__slider owl-carousel">
                                            <img data-imgbigurl="img/product/details/product-details-2.jpg" src="img/product/details/thumb-1.jpg" alt />
                                            <img data-imgbigurl="img/product/details/product-details-3.jpg" src="img/product/details/thumb-2.jpg" alt />
                                            <img data-imgbigurl="img/product/details/product-details-5.jpg" src="img/product/details/thumb-3.jpg" alt />
                                            <img data-imgbigurl="img/product/details/product-details-4.jpg" src="img/product/details/thumb-4.jpg" alt />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="product__details__text">
                                        <h3>{product.nameProduct}</h3>
                                        <div className="product__details__rating">
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star-half-o" />
                                            <span>(18 view)</span>
                                        </div>
                                        <div className="product__details__price">
                                            {formatNumber(product.price)}đ</div>
                                        <p>{product.content}</p>
                                        {product.quantity == 0 ?
                                            <p className="primary-btn" aria-disabled >Hết Hàng</p>
                                            :
                                            <p style={{ borderRadius: '0px' }} onClick={() => onHandleAddProduct()} className="primary-btn ">Thêm vào giỏ hàng</p>
                                        }
                                        <ul>
                                            <li><b>Hàng</b> <span>Trong Kho</span></li>
                                            <li><b>Số lượng</b> <span>{product.quantity}</span></li>
                                            <li><b>Chia sẽ</b>
                                                <div className="share">
                                                    <a href="#"><i class="fab fa-facebook"></i></a>
                                                    <a href="#"><i class="fab fa-twitter"></i></a>
                                                    <a href="#"><i class="fab fa-instagram-square"></i></a>
                                                    <a href="#"><i class="fab fa-pinterest"></i></a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="product__details__tab">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <span style={{ fontSize: "20px", fontWeight: 'bold', color: 'black' }} className="active">Mô tả</span>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                                <div className="product__details__tab__desc">
                                                    <h6>Thông tin sản phẩm</h6>
                                                    <p>{product.content}</p>
                                                    <p>{product.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <section className="related-product">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title related__product__title">
                                        <h2 style={{ fontSize: '30px' }}>Sản Phẩm Liên Quan</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    relative.map(value => (
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <div className="product__item">
                                                <div className="product__item__pic set-bg" >
                                                    <img style={{ width: '100%', height: '95%' }} src={value.imageProduct} alt="" />
                                                    <ul className="product__item__pic__hover">
                                                        <li><a ><i className="fa fa-heart" /></a></li>
                                                        <li><Link to={`/detailProduct/${value.id}` + "/" + to_slug(value.nameProduct) + ".html"}><i className="fa fa-retweet" /></Link></li>
                                                        <li><a onClick={() => onHandleAddProductRelative(value)} ><i className="fa fa-shopping-cart" /></a></li>
                                                    </ul>
                                                </div>
                                                <div className="product__item__text">
                                                    <h6><a >{value.nameProduct}</a></h6>
                                                    <h6>{formatNumber(value.price)}đ</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </>
            <Footer />
        </>
    )
}

export default DetailProduct
