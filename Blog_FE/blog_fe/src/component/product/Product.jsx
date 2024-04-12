import React, { useEffect, useState } from 'react'
import Header from '../../ui/Header';
import Footer from '../../ui/Footer';
import '../../ui/css/Product.css'
import { getAllProduct, getAllTypeProduct, getBlogForProduct } from '../../service/Product';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, getCountCart } from '../../service/Cart'
import MySwal from "sweetalert2";
import { format } from 'date-fns';
import ReactPaginate from "react-paginate";


const Product = (props) => {
    const native = useNavigate()
    const [idUser, setIdUser] = useState();
    const [products, setProducts] = useState();
    const [countCartNew, setCountCartNew] = useState();
    const [blog, setBlog] = useState();
    const [typeProduct, setTypeProduct] = useState();
    const [idType, setIdType] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    

    useEffect(() => {
        if(idUser){
            localStorage.removeItem("checkCart")
        }
        getAllProduct(0, idType).then(res => {
            setProducts(res.content);
            setTotalPages(res.totalPages)
        })
        getAllTypeProduct().then(res => {
            setTypeProduct(res);
        })
    }, [])

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        getBlogForProduct().then(res => {
            setBlog(res)
        })
    }, [])

    const onHandleAddProduct = (e) => {
        if (idUser == null) {
            localStorage.setItem("checkCart", "checkCart")
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
                    setCountCartNew(res)
                })
            })
        }
    }

    const onHandleSeach = (e) => {
        getAllProduct(0, e).then(res => {
            setIdType(e)
            setProducts(res.content)
            setTotalPages(res.totalPages)
            setCurrentPage(0);
        })
    }

    const handlePageClick = (e) => {
        const pageNumber = e.selected;
        setCurrentPage(pageNumber);
        getAllProduct(pageNumber, idType).then(res => {
            setProducts(res.content)
            setTotalPages(res.totalPages)
        })
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

    const outOfStock = (e) => {
        MySwal.fire({
            title: "Đặt không thành công",
            text: "Sản phẩm "+ `${e.nameProduct}`+" đã hết hàng",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
        })
    }

    if (!products || !blog || !typeProduct) return (
        <div class="main">
            <div class="mario_bin"></div>
            <div class="mario_run">
                <div class="mario_run1"></div>
            </div>
            <div class="walls">
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
            </div>
            <div class="text"></div>
        </div>
    )
    return (
        <>
            <Header handleId={handleId} countCartNew={countCartNew} />
            <>
                <div className="header_section">
                    <div className="banner_section layout_padding">
                        <div className="container">
                            <div id="banner_slider" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">
                                            <div className="col-md-6">
                                            </div>
                                            <div className="col-md-6 mb-10">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Featured Section Begin */}
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title pb-0 mt-5">
                                    <h2>Sản Phẩm</h2>
                                </div>
                                <div className="featured__controls">
                                    <ul>
                                        {
                                            typeProduct.map(value => (
                                                <li className={idType === value.id ? 'active' : ''} onClick={() => onHandleSeach(value.id)}>{value.typeProduct}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row featured__filter">
                            {
                                products.map(value => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                                        <div className="featured__item">
                                            <div className="featured__item__pic set-bg" >
                                                <img style={{ width: '100%', height: '95%' }} src={value.imageProduct} alt="" />

                                                <ul className="featured__item__pic__hover">
                                                    <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                    <li><Link to={`/detailProduct/${value.id}` + "/" + to_slug(value.nameProduct) + ".html"}><i className="fa fa-retweet" /></Link></li>
                                                    {
                                                        value.quantity == 0 ? <li><a onClick={() => outOfStock(value)} ><i className="fa fa-shopping-cart" /></a></li> : <li><a onClick={() => onHandleAddProduct(value)} ><i className="fa fa-shopping-cart" /></a></li>

                                                    }
                                                </ul>
                                            </div>
                                            <div className="featured__item__text">
                                                <h6><Link to={`/detailProduct/${value.id}` + "/" + to_slug(value.nameProduct) + ".html"}>{value.nameProduct}</Link></h6>
                                                <h6>{formatNumber(value.price)}đ</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
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
                </section>
                {/* Blog Section Begin */}
                <section className="from-blog spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title from-blog__title">
                                    <h2>Blog Công Nghệ</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                blog.map(value => (
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img style={{ height: '200px', width: '90%' }} src={value.imageBlog} alt />
                                            </div>
                                            <div className="blog__item__text">
                                                <ul style={{ padding: '0' }}>
                                                    <li><i className="fa fa-calendar-o" /><i class="far fa-calendar-alt"></i> {format(new Date(value.createDay), 'dd MMM, yyyy')}</li>
                                                    <li><i className="fa fa-comment-o" /> <i class="far fa-eye"></i><span className="lnr lnr-heart ml-10" />{value.viewer} Viewer</li>
                                                </ul>
                                                <Link style={{ color: 'black', fontWeight: 'bold' }} className="card1-title ml-0" to={`/detail/${value.id}` + "/" + to_slug(value.title) + ".html"}>{value.title}</Link>
                                                <p className="format-content-new">{value.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>

            </>
            <Footer />
        </>

    )
}

export default Product
