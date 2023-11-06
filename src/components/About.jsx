import React from 'react'
import { NavLink } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <div className="container py-5 my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-primary fw-bold mb-4">About Us</h1>
                        <p className="lead mb-4">
                        BookStore hiện được xem là một trong những website bán hàng online hàng đầu tại Việt Nam. Và trong đó chắc chắn không thể thiếu sách. Tại thời điểm bắt đầu, Tiki cũng là một website chỉ chuyên về các sản phẩm sách. Nhưng cho đến hiện tại, BookStore cung cấp rất nhiều các mặt hàng khác nhau từ điện thoại, máy tính, thiết bị điện gia dụng, laptop đến hàng tiêu dùng, đồ chơi, thời trang, phụ kiện, … Tuy nhiên, BookStore vẫn giữ được thế mạng trong mảng bán sách online của mình.                        </p>
                        <NavLink to="/contact" className="btn btn-outline-primary px-3">Contact Us</NavLink>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src="/assets/images/about1.png" alt="About Us" height="500px" width="400px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
