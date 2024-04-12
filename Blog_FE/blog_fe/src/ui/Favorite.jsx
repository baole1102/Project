import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import { getListFavorite } from '../service/Favorite'
import ReactPaginate from "react-paginate";
import '../ui/css/Main.css'

const Favorite = () => {
    const [idUser, setIdUser] = useState();
    const [blog, setBlog] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    console.log(totalPages);

    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        console.log(idUser);
        if (idUser) {
            getListFavorite(0, idUser).then(res => {
                setBlog(res.content)
                setTotalPages(res.totalPages)
            })
        }
    }, [idUser])

    const handlePageClick = (e) => {
        const pageNumber = e.selected;
        setCurrentPage(pageNumber);
        getListFavorite(pageNumber, idUser).then(res => {
            setBlog(res.content)
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

    if (!blog) return (
        <>
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
    )
    return (
        <>
            <Header handleId={handleId} />
            <section className="section--favorite">
                <div className="container">
                    <div className="row justify-content-between align-items-center d-flex">
                        <div className="col-lg-8 top-left">
                            <h1 style={{ color: 'white' }} className="mb-20">My Blog Favorite</h1>
                        </div>
                    </div>
                </div>
            </section>
            <div className="post-wrapper pt-100">
                <section className="post-area">
                    <div className="container">
                        <div className="row justify-content-center d-flex">
                            <section className="from-blog spad">
                                <div className="container">
                                    <div className="row">
                                        {
                                            blog.map(value => (
                                                <div className="col-lg-4 col-md-4 col-sm-6">
                                                    <div className="blog__item">
                                                        <div className="blog__item__pic">
                                                            <img style={{ height: '250px', width: '90%' }} src={value.imageBlog} alt />
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
                            {totalPages > 1 ?
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
                                </div> : <></>}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Favorite
