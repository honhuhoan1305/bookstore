import React from 'react';
import './main.css';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">BOOKSTORE</h5>
            <p className="about-us">
              BookStore is a leading online sales website in Vietnam, with a focus on books. In fact, Tiki started as a platform specializing in book products!
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/" className="text-dark">Home</a>
              </li>
              <li>
                <a href="/products" className="text-dark">Products</a>
              </li>
              <li>
                <a href="/about" className="text-dark">About</a>
              </li>
              <li>
                <a href="/contact" className="text-dark">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Company Info</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/" className="text-dark">Home</a>
              </li>
              <li>
                <a href="/products" className="text-dark">Products</a>
              </li>
              <li>
                <a href="/about" className="text-dark">About</a>
              </li>
              <li>
                <a href="/contact" className="text-dark">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Design by Hoan
      </div>
    </footer>
  );
};

export default Footer;
