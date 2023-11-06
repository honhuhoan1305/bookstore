import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/actions/index';

const Product = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Số trang mặc định là 1
  const [cartBtn, setCartBtn] = useState('Add to Cart');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5015/api/book?page=${currentPage}`);
      const jsonData = await response.json();
      setData(jsonData.data);
      setTotalPages(jsonData.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleAddToCart = async (item) => {
    const productWithQuantity = { ...item, quantity };

    try {
      // Gọi API hoặc xử lý thêm sản phẩm vào giỏ hàng tại đây
      // ...

      dispatch(addItem(productWithQuantity));
      console.log(`Added to cart: ${item.title}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderProductCard = (item) => {
    return (
      <div className="product-card" key={item.bookId}>
        <a href={`/products/${item.bookId}`}>
          <img src={item.ulrImage} alt={item.title} className="product-image" />
        </a>
        <div className="product-details">
          <h3 className="product-title">{item.title}</h3>
          <p className="product-price">{item.price} VND</p>
        </div>
        <div className="product-actions">
          <NavLink to={`/products/${item.bookId}`} className="btn btn-buy-now">
            Buy Now
          </NavLink>
          <button
            className="btn btn-add-to-cart"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  

  return (
    <div className="product-container">
      <p className="ten" style={{ color: 'white' }}>All Product Saler</p>
      <div className="product-header">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="product-list">
        {data
          .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(renderProductCard)}
      </div>
      <div className="product-pagination">
        <button
          className="btn btn-prev-page"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="btn btn-next-page"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
