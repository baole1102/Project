import React, { useEffect, useState } from 'react'
import '../ui/css/Main.css'
import Header from './Header'
import Footer from './Footer'
import { findBlogByTopic, getBlogById } from '../service/BlogService'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCategory } from '../service/Category'
import MyFacebookComments from './MyFacebookComments'
import { getAllTopic } from '../service/TopicService'
import { checkFavoriteCount, getCountAndAddFavorite } from '../service/Favorite'


const DetailBlog = () => {
    const [blog, setBlog] = useState();
    const [categorys, setCategorys] = useState();
    const [idCate, setIdCate] = useState();
    const [topic, setTopic] = useState();
    const [listSearch, setListSearch] = useState();
    const [idTopic, setIdTopic] = useState();
    const [count, setCount] = useState();
    const [idUser, setIdUser] = useState();
    const [checkFavorite, setCheckFavorite] = useState();
    const native = useNavigate()
    const param = useParams();
    const { id } = param;


    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        if (blog) {
            setIdCate(blog.idCategory);
        }
    }, [blog])

    useEffect(() => {
        if (idCate) {
            getAllTopic(idCate).then(res => {
                setTopic(res)
            })
        }
    }, [idCate])
    useEffect(() => {
        getAllCategory().then(res => {
            setCategorys(res)
        })
    }, [])

    useEffect(() => {
        const { id } = param;
        getBlogById(id).then(res => {
            setBlog(res)
        })
    }, [param])

    useEffect(() => {
        if (listSearch) {
            native("/findBlogByTopic", { state: { blog: listSearch, idCate } })
        }
    }, [listSearch])

    const onFindBLog = (id) => {
        findBlogByTopic(0, id).then(res => {
            setListSearch(res);
            setIdTopic(id);
        })
    }

    const onHandleFavorite = (id, idUser) => {
        if (idUser == null) {
            localStorage.setItem("checkFavorite", "checkFavorite")
            localStorage.setItem("idBLog", id)
            localStorage.setItem("nameBlog",blog.title)
            native("/login");
        } else {
            getCountAndAddFavorite(id, idUser).then(res => {
                setCount(res)
            }
            )
        }
    }
    useEffect(() => {
        if ((idUser)) {
            // localStorage.removeItem("idBlog")
            localStorage.removeItem("checkFavorite")
        }
    }, [])

    useEffect(() => {
        if (idUser) {
            checkFavoriteCount(idUser, id).then(res => {
                setCheckFavorite(res)
            })
        }
    }, [count, idUser])

    if (!blog || !topic) return (
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
            <Header handleId={handleId} countFavorite={count} />
            <div className="post-wrapper pt-100">
                <section className="post-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div key={blog.id} className="col-lg-8">
                                <div className="single-page-post">
                                    <div className='d-flex justify-content-center'>
                                        <img style={{ width: '80%', height: '18rem' }} className="img-fluid" src={blog.imageBlog} alt />
                                    </div>
                                    <div className="top-wrapper ">
                                        <div className="row d-flex justify-content-between">
                                            <h2 style={{ width: '100%' }} className="col-lg-8 col-md-12 text-uppercase">
                                                {blog.title}
                                            </h2>
                                        </div>
                                    </div>
                                    <p id='contentHTML' className="single-post-content" style={{ img: { width: '50%' } }} dangerouslySetInnerHTML={{ __html: blog.description }} />
                                    <section className="comment-sec-area pt-80 pb-80">
                                        <div className="container">
                                            <MyFacebookComments id={id} />
                                            <div className="fb-comments" data-href="https://hocweb90ngay.com" data-width={1000} data-numposts={5} />
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="col-lg-4 sidebar-area ">
                                <div className="single_widget about_widget">
                                    <img style={{ objectFit: 'cover', height: '50px', height: '50px',width:'50px',borderRadius:'50%' }} src={blog.imageUser}  />
                                    <h2 className="text-uppercase">{blog.nameUser}</h2>
                                    <p>
                                        {blog.title}
                                    </p>
                                    <div className="social-link">
                                        <a onClick={() => onHandleFavorite(blog.id, idUser)} >
                                            {checkFavorite == 1 ?
                                                <button style={{ background: '#7979ff' }} className="btn">
                                                    <i class="far fa-star"></i> <span style={{ color: 'red' }}>Favorite</span> </button> :
                                                <button className="btn">
                                                    <i class="far fa-star"></i> Favorite</button>
                                            }
                                        </a>
                                        <a href="#"><button className="btn"><i className="fa fa-twitter" aria-hidden="true" /> follow</button></a>
                                    </div>
                                </div>
                                <div className="single_widget cat_widget">
                                    <h4 style={{ fontSize: '18px' }} className="text-uppercase pb-20 d-flex justify-content-center">Những công nghệ liên quan</h4>
                                    <ul>
                                        {
                                            topic.map(value => (
                                                <li style={{cursor:'pointer'}} onClick={e => onFindBLog(value.id)}>
                                                    <a >{value.nameTopic} </a>
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

export default DetailBlog
