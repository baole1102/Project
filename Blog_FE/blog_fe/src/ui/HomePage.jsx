import React, { useEffect, useState } from 'react'
import '../ui/css/Main.css'
import Header from './Header'
import Footer from './Footer'
import { getAllBlog, getBlogHighView, getListBlogCurrent, getPageBlog } from '../service/BlogService'
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPaginate from "react-paginate";


const HomePage = () => {
  const [blogs, setBlogs] = useState();
  const [blogHighView, setBlogHighView] = useState();
  const [blogCurrent, setBlogCurrent] = useState();
  const [idUser, setIdUser] = useState(localStorage.getItem("idUser"));
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  const handleId = (id) => {
    setIdUser(id);
  }

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    getBlogHighView().then(res => {
      setBlogHighView(res)
    })
    getListBlogCurrent().then(res => {
      setBlogCurrent(res);
    })
    getPageBlog(0).then(res => {
      setBlogs(res.content);
      setTotalPages(res.totalPages)
    })
  }, [])

  const handlePageClick = (e) => {
    const pageNumber = e.selected;
    setCurrentPage(pageNumber);
    getPageBlog(pageNumber).then(res => {
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

  if (!blogHighView || !blogCurrent || !blogs) return (
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
      <div>
        <Header handleId={handleId} />
        <header className="masthead">
          <div className="container">
            <div className="masthead-subheading">Chào mừng bạn tới Blog của tôi!</div>
            <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
          </div>
        </header>
        <section style={{ padding: '50px 0 0 0' }} className="category-area" id="news">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="menu-content pb-70 col-lg-8">
                <div className="title text-center">
                  <h1 style={{ fontSize: '34px' }} className="mb-2">Blog nổi bật</h1>
                  <p>Blog là nơi tôi chia sẻ những câu chuyện, kinh nghiệm và cảm xúc của mình để kết nối với cộng đồng và lan tỏa sự sáng tạo.</p>
                </div>
              </div>
            </div>
            <div className='row'>
              <Slider {...settings}>
                {
                  blogHighView.map(value => (
                    <div className="col-lg-12 col-md-4 col-sm-6 ">
                      <div className="blog__item">
                        <div className="blog__item__pic">
                          <img style={{ width: '320px', height: '250px' }} src={value.imageBlog} alt />
                        </div>
                        <div className="blog__item__text row">
                          <ul style={{ padding: '0', marginLeft: '14px' }}>
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
              </Slider>
            </div>
          </div>
        </section >
        {/* Start travel Area */}
        <section section className="travel-area section-gap" id="travel" >
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="menu-content pb-70 pt-50 col-lg-8">
                <div className="title text-center">
                  <h1 style={{ fontSize: '34px' }} className="mb-2">Danh sách Blog</h1>
                  <p>
                    Blog là một tài nguyên quan trọng cung cấp các bài viết, thông tin và kiến thức đa dạng về một loạt các chủ đề, từ kinh doanh và công nghệ đến cuộc sống hàng ngày và sức khỏe, giúp người đọc mở rộng hiểu biết và tìm kiếm thông tin hữu ích.</p>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              {blogs && (
                blogs.map(value => (
                  <div className="col-lg-6 ">
                    <div key={value.id} className="single-travel media pb-60">
                      <img style={{ height: 'auto', width: '37%' }} className="img-fluid d-flex mr-2 col-3" src={value.imageBlog} />
                      <div className="dates ml-20">
                        <span>{format(new Date(value.createDay), 'dd MMM, yyyy')}</span>
                      </div>
                      <div className="media-body align-self-center">
                        <h4 className="mt-0"><Link className='hover--a format-content-title' to={`/detail/${value.id}` + "/" + to_slug(value.title) + ".html"}>{value.title}</Link></h4>
                        <p className='format-content'>{value.content}</p>
                        <div className="meta-bottom d-flex justify-content-between">
                          <p style={{ fontSize: '0.8rem' }} ><i class="far fa-eye"></i><span className="lnr lnr-heart ml-10" />{value.viewer} Viewer</p>
                          <p style={{ fontSize: '0.8rem' }} className='div-img'><span className="lnr lnr-bubble">{value.nameUser}</span><img className="image--user ml-5" src={value.imageUser} /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
              }
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
        </section >
        {/* Blog Gan Day */}
        <section section className="fashion-area section-gap" id="fashion" >
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="menu-content pb-40 col-lg-8">
                <div className="title text-center pt-5">
                  <h1 style={{ fontSize: '34px' }} className="mb-3">Blog gần đây</h1>
                  <p>Blog gần đây không chỉ là nền tảng để chia sẻ kiến thức và trải nghiệm cá nhân, mà còn là một công cụ quan trọng cho giao tiếp và tương tác trực tuyến.</p>
                </div>
              </div>
            </div>
            <section className="from-blog spad">
              <div className="container">
                <div className="row">
                  {
                    blogCurrent.map(value => (
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
          </div>
        </section >
      </div >
      <Footer />
    </>
  )
}

export default HomePage
