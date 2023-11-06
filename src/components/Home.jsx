import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Product from './Product';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [productData, setProductData] = useState([]); // Sử dụng mảng thay vì null


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5015/topsold`);
      const jsonData = await response.json();
      setProductData(jsonData.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="home">
      <div className="home__container">
        
        <div
          id="carouselExampleIndicators"
          className="carousel slide home__carousel"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="assets/images/1.png"
                className="d-block w-100"
                alt="Carousel Image 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="assets/images/2.png"
                className="d-block w-100"
                alt="Carousel Image 2"
              />
            </div>
            {/* Thêm nhiều hình ảnh carousel ở đây */}
          </div>
        </div>
        <div className="home__row">
          <Product />
        </div>
        <p className="ten">Best Saler</p>

        <section className="products1">
          {productData.map((product) => (

            <div className="product-card1" key={product.bookId}>
                
              {/* <a href={`/products/${product.bookId}`}>
                <img src={product.urlImage} alt={product.author} className="product-image" />
              </a> */}
              <div className="product-details">
                <h3 className="product-title">
                  {product.title} {product.last_name}
                </h3>
                <p className="product-price">{product.price} VND</p>
                <p className="product-sold">Sold: {product.sold} </p>
              </div>
              <div className="product-actions">
                <NavLink to={`/products/${product.bookId}`} className="btn btn-buy-now">
                  Buy Now
                </NavLink>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
