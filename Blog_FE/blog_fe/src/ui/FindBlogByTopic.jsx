import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import { findBlogByTopic } from '../service/BlogService'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import { getAllTopic } from '../service/TopicService'
import ReactPaginate from "react-paginate";


const FindBlogByTopic = () => {
    const location = useLocation();
    const data = location.state?.blog || [];
    const idSearch = location.state?.idCate || "";
    const [blogs, setBlogs] = useState(data.content || "")
    const [pageCurrent, setPageCurrent] = useState(data.pageable?.pageNumber || 0);
    const [totalPages, setTotalPages] = useState(data.totalPages || 0);
    const [idCate, setIdCate] = useState(idSearch || "");
    const [topic, setTopic] = useState();
    const [idTopic, setIdTopic] = useState();
    const [idUser, setIdUser] = useState();

    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        if (idCate) {
            getAllTopic(idCate).then(res => {
                setTopic(res)
            })
        }
    }, [idCate])

    const onFindBLog = (id) => {
        findBlogByTopic(0, id).then(res => {
            setBlogs(res.content);
            setIdTopic(id);
            setTotalPages(res.totalPages);
            setPageCurrent(0)
        })
    }

    const handlePageClick = (e) => {
        const pageNumber = e.selected;
        setPageCurrent(pageNumber);
        findBlogByTopic(pageNumber, idTopic).then(res => {
            setBlogs(res.content)
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

    if (!blogs || !topic) return (
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
            <Header handleId={handleId} />
            <div className="post-wrapper pt-100">
                <section className="post-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="single-page-post row">
                                    {blogs.map(value => (
                                        <div className="col-lg-6 col-md-6 single-fashion" key={value.id}>
                                            <img style={{ height: '176px', width: '100%' }} src={value.imageBlog} alt="" />
                                            <div style={{ margin: "10px 0" }}>
                                                <span className="date">{format(new Date(value.createDay), 'dd MMM, yyyy')}</span>
                                            </div>
                                            <h4><Link style={{ fontSize: '20px' }} className='format-content-title hover--a' to={`/detail/${value.id}`+ "/" + to_slug(value.title) + ".html"} >{value.title}</Link></h4>
                                            <p className='format-content'>
                                                {value.content}
                                            </p>
                                            <div className="meta-bottom d-flex justify-content-between">
                                                <p style={{ fontSize: '0.8rem' }}><i className="far fa-eye"></i><span className="lnr lnr-heart" /> {value.viewer} Viewer</p>
                                                <p style={{ fontSize: '0.8rem' }} className='div-img'><span className="lnr lnr-bubble">{value.nameUser}</span><img className="image--user ml-5" src={value.imageUser} alt="" /></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    {totalPages > 8 &&
                                        <ReactPaginate
                                            forcePage={pageCurrent}
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
                                        />}
                                </div>
                            </div>
                            <div className="col-lg-4 sidebar-area ">
                                <div className="single_widget cat_widget">
                                    <h4 style={{ fontSize: '18px' }} className="text-uppercase pb-20 d-flex justify-content-center">Những ngôn ngữ liên quan</h4>
                                    <ul>
                                        {
                                            topic.map(value => (
                                                <li style={{ cursor: 'pointer' }}>
                                                    <a style={{ display: 'block' }} onClick={e => onFindBLog(value.id)}>{value.nameTopic} </a>
                                                </li>

                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default FindBlogByTopic
