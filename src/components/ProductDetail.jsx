import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/actions/index';

const ProductDetail = () => {
  const [cartBtn, setCartBtn] = useState('Add to Cart');
  const { bookId } = useParams();
  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5015/api/book/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setProductData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCart = async (product) => {
    const productWithQuantity = { ...product };
    try {
      const response = await fetch('https://your-api-endpoint.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productWithQuantity),
      });

      if (response.ok) {
        dispatch(addItem(productWithQuantity));
        console.log('Product added to cart');
        setCartBtn('Remove from Cart');
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  const { title, description, author, ulrImage, price } = productData;

  return (
    <div className="container my-5 py-3">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center mx-auto product">
          <img src={ulrImage} alt={title} height="400px" />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-5 fw-bold">{title}</h1>
          <hr />
          <p className="ten">{author}</p>
          <p className="thongtin">Description: {description}</p>
          <p className="gia">Price: {price} VND</p>
          <button onClick={() => handleCart(productData)} className="btn btn-outline-primary my-5">
            {cartBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
