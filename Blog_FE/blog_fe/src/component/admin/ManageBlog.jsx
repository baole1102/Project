import React, { useEffect, useState } from 'react'
import '../../ui/css/databoard.css'
import SideBar from '../../ui/SideBar'
import { getAllBlog } from '../../service/BlogService';
import { Link,useNavigate } from 'react-router-dom';
import MySwal from "sweetalert2";
import { deleteBlogByAdmin } from '../../service/Admin';
import ReactPaginate from "react-paginate";
import { getAllCategory } from '../../service/Category';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState();
  const [search, setSearch] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState();
  const isLogin = localStorage.getItem("isLogin")  
  const native = useNavigate();

  useEffect(() => {
      if(isLogin == null){
          toast(`Yêu cần đăng nhập`)
          native(`/`)
      }
  },[])

  useEffect(() => {
    getAllBlog(0, search).then(res => {
      setBlogs(res.content)
      setTotalPages(res.totalPages)
    })
    getAllCategory().then(res => {
      setCategory(res);
    })
  }, [])

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
        if (blogs.length === 1 && currentPage > 0) {
          updatedPage--;
        }
        const result = await getAllBlog(0, search);
        setBlogs(result.content);
        setTotalPages(result.totalPages);
        setCurrentPage(updatedPage);
      }
    });
  };

  const onHandleSearchCategory = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value }.category);
  };

  useEffect(() => {
    getAllBlog(0, search).then(res => {
      setBlogs(res.content)
      setTotalPages(res.totalPages)
    })
  }, [search])

  const handlePageClick = (e) => {
    const pageNumber = e.selected;
    setCurrentPage(pageNumber);
    getAllBlog(pageNumber, search).then(res => {
      setBlogs(res.content)
      setTotalPages(res.totalPages)
    })
  }

  if (!blogs || !category) return (
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
      <div style={{margin:'0px'}} className='row'>
        <div className='col-3'>
          <SideBar />
        </div>
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg col-9">
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div style={{ justifyContent: 'space-between' }} className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 d-flex">
                      <h6  className="text-white text-capitalize ps-3 d-flex align-items-center">Quản lý Blog</h6>
                      <Link style={{ padding: '10px' }} to={"/add/blog"} className="text-secondary font-weight-bold text-white ">
                        Thêm blog <i class="fas fa-plus-circle"></i>
                      </Link>
                      <div style={{ alignItems: 'center' }} className='d-flex mr-30 mb-1'>
                        <h6 style={{ margin: '0' }}>Tìm kiếm</h6>
                        <select style={{ borderRadius: '5px' }} className='ml-10' name='category' onChange={onHandleSearchCategory}>
                          <option value="" selected >--Select Option--</option>
                          {
                            category.map(value => (
                              <option value={value.id} key={value.id}>{value.typeCategory}</option>
                            ))
                          }
                        </select>
                      </div>

                    </div>
                  </div>
                  {
                    blogs.length >= 1 ?
                      <div className="card-body px-0 pb-2">
                        <div className="table-responsive p-0">
                          <table className="table align-items-center mb-5">
                            <tbody style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                              {
                                blogs.map(value => (
                                  <div className="card col-4 ml-10 mr-10 mb-4" style={{ width: '18rem' }}>
                                    <img style={{ width: '100%', height: '172px' }} src={value.imageBlog} className="card-img-top" />
                                    <div className="card-body">
                                      <h5 className="card-title format-manage-title">{value.title}</h5>
                                      <p className="card-text format-manage-content">{value.content}</p>
                                      <div style={{ justifyContent: 'space-between' }} className='d-flex'>
                                        <Link to={`/editBlog/${value.id}`} className="btn btn-primary">Sửa</Link>
                                        <a style={{ background: '#e72626', color: 'white' }} className="btn btn-primary" onClick={() => onHandleDelete(value)}>Xóa</a>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              }
                            </tbody>
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
                          </table>
                        </div>
                      </div> :
                      <div>
                        <span>Không có dữ liệu</span>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ManageBlog
