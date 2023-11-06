import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10; // Số lượng sản phẩm hiển thị trên mỗi trang

  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const [formData, setFormData] = useState({
    bookId: '',
    title: '',
    author: '',
    description: '',
    categoryName: 'van hoc',
    price: '',
    ulrImage: '',
    quantity: '',
    sold: '0'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5015/api/book');
      const data = await response.json();
      setProducts(data.data.reverse()); // Đảo ngược thứ tự danh sách sản phẩm để sản phẩm mới nhất được hiển thị đầu tiên
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  console.log(formData)
//add book
const handleAddProduct = async () => {
  if (!formData.bookId) {
    // Nếu bookId rỗng, thực hiện hàm addBook
    try {
      const response = await fetch('http://localhost:5015/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newProduct = await response.json();
      setProducts([newProduct, ...products]); // Thêm sản phẩm mới vào đầu danh sách
      setFormData({
        bookId: '',
        title: '',
        author: '',
        description: '',
        categoryName: '',
        price: '',
        ulrImage: '',
        quantity: '',
        sold: '',
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    // Ngược lại, thực hiện hàm updateBook
    handleUpdateProduct(formData.bookId);
    window.location.reload()
  }
};


  //delete book
  const handleDeleteProduct = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5015/api/book/${bookId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Xóa sản phẩm thành công, cập nhật danh sách sản phẩm trên giao diện người dùng
        setProducts(products.filter((product) => product.bookId !== bookId));
      } else {
        console.error('Delete request failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSelectProduct = (productId) => {
    const isSelected = selectedProductIds.includes(productId);

    if (isSelected) {
      setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  //
  const handleDeleteSelectedProducts = async () => {
    try {
      const deleteIds = selectedProductIds.map((id) => ({ id }));
      const response = await fetch('https://reqres.in/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteIds),
      });

      if (response.ok) {
        setProducts(products.filter((product) => !selectedProductIds.includes(product.id)));
        setSelectedProductIds([]);
      } else {
        console.error('Delete request failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };

//update
  const handleUpdateProduct = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:5015/api/book/${bookId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const updatedProduct = await response.json();
      setProducts(
        products.map((product) =>
          product.bookId === bookId ? updatedProduct : product
        )
      );
      const productToUpdate = products.find((product) => product.bookId === bookId);
      if (!productToUpdate) {
        console.error('Product not found');
        return;
      }
      setFormData({
        bookId: productToUpdate.bookId,
        title: productToUpdate.title,
        author: productToUpdate.author,
        ulrImage: productToUpdate.ulrImage,
        price: productToUpdate.price,
        description: productToUpdate.description,
        categoryName: productToUpdate.categoryName,
        quantity: productToUpdate.quantity,
        sold: productToUpdate.sold
      });
      console.log(formData)
    } catch (error) {
      console.error(error);
      console.log(formData)
    }
  };


  

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };




  // Tính toán index bắt đầu và kết thúc của danh sách sản phẩm hiển thị trên trang hiện tại
  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <h1 className='admin'>Admin Manager</h1>
      <div className="input-container">
        <div className="form-group">

        <label>Book ID:</label>
        <input
          type="text"
          name="title"
          required
          value={formData.bookId}
          readOnly
          onChange={handleInputChange}
          placeholder="Can not enter"
        />
        </div>

        <div className="form-group">
        <label>Name Book:</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Name Book"
        />
        </div>

        <div className="form-group">
        <label>Author:</label>
        <input
          type="text"
          name="author"
          required
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Author"
        />
        </div>

        <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          min="1"
          name="price"
          required
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          style={{ width: '100%' }}
        />
        </div>

        <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          name="quantity"
          required
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          title="Enter the quantity"
        />
        </div>

        <div className="form-group">
        <label>Image URL:</label>
        <input
          type="text"
          name="ulrImage"
          required
          value={formData.ulrImage}
          onChange={handleInputChange}
          placeholder="Image"
          title="Enter the image url"
        />
        </div>

        <div className="form-group">
        <label>Sold:</label>
        <input
          type="number"
          min="0"
          name="sold"
          required
          value={formData.sold}
          onChange={handleInputChange}
          placeholder="Sold"
          style={{ width: '100%' }}
        />
        </div>

        <div className="form-group">
        <label>Category:</label>
        <select type="text"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleInputChange}>
          <option value="van hoc" selected>Văn học</option>
          <option value="tho">Thơ</option>
          <option value="tieu thuyet">Tiểu thuyết</option>
          <option value="van xuoi">Văn xuôi</option>
          <option value="khoa hoc">Khoa học</option>
          <option value="giao duc">Giáo dục</option>
          <option value="nghe thuat">Nghệ thuật</option>
          <option value="tinh cam">Tình cảm - lãng mạn</option>
        </select>
        </div>

        <div className="form-group">
        <label>Rating:</label>
        <input
          type="text"
          name="ulrImage"
          required
          readOnly
          value={formData.rating}
          onChange={handleInputChange}
          placeholder="Can not enter"
          title="rating"
        />
        </div>
        <div className="custom-textarea">
        <div className="form-group">
        <label>Description:</label>
          <textarea
          name="description"
          required
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          rows={4}
        />
        </div>
        </div>
      </div>
      


      <button className="admin" onClick={handleDeleteSelectedProducts}>Delete Selected</button>
      <button className="admin" onClick={handleAddProduct}>Add</button>
      <p className='ten'>Product List</p>
      <div className="product-grid1">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-item1">
            <input
              type="checkbox"
              checked={selectedProductIds.includes(product.id)}
              onChange={() => handleSelectProduct(product.id)}
            />
            <div className='admin'>
            <p><strong className="strong" >ID: </strong>{product.bookId}</p>
            <p><strong className="strong" >Book Name: </strong> {product.title}</p>
            <p><strong className="strong" >Author: </strong> {product.author}</p>
            <p><strong className="strong" >Description: </strong>{product.description}</p>
            <p><strong className="strong" >Category: </strong>{product.categoryName}</p>
            <p><strong className="strong" >Price: </strong> {product.price}</p>
            <p><strong className="strong" >Quantity: </strong> {product.quantity}</p>
            <p><strong className="strong" >Sold: </strong> {product.sold}</p>
</div>

            <img className='admin' src={product.ulrImage} alt={product.title} width={100} height={100} />
            <button className="admin" onClick={() => handleDeleteProduct(product.bookId)}>Delete </button>
              <button className="admin"  onClick={() => handleUpdateProduct(product.bookId)}>Update</button>
             

              
            </div>
            
        ))}

      </div>

      <ReactPaginate
        pageCount={Math.ceil(products.length / perPage)}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="Previous"
        nextLabel="Next"
      />
    </div>
  );
};

export default Admin;
