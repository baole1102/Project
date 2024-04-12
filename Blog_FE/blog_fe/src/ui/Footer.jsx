import React from 'react'
import '../ui/css/Footer.css'

const Footer = () => {
  return (
    <footer className="footer-area section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-3  col-md-12">
            <div className="single-footer-widget">
              <h6 style={{color:'#8d2424'}}>Thông tin về trang Blog </h6>
              <ul className="footer-nav">
                <li><a href="#">Về chúng tôi</a></li>
                <li><a href="#">Liên lạc</a></li>
                <li><a href="#">Gửi phản hồi cho chúng tôi</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6  col-md-12">
            <div style={{justifyContent:'center',display:'flex'}} className="single-footer-widget newsletter">
              <h6 style={{color:'#8d2424'}}>Copyright © Your Website 2023</h6>

            </div>
          </div>
          <div className="col-lg-3  col-md-12">
            <div  className="single-footer-widget mail-chimp ">
              <h6 style={{color:'#8d2424'}} className="mb-20">Kết nối với chúng tôi</h6>
              <ul className="instafeed d-flex flex-wrap">
                <li><i className="fab fa-facebook-f text-white text-lg"></i></li>
                <li><i className="fab fa-github text-white text-lg"></i></li>
                <li><i className="fab fa-google text-white text-lg"></i></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer
