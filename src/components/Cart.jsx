import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Checkout from './Checkout';

const Cart = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const token = localStorage.getItem('token');//token

  const [showForm, setShowForm] = useState(false); // Thêm biến trạng thái để điều khiển hiển thị của form

  const handleNameChange = (event) => {

    setName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users');
      const jsonData = await response.json();
      const updatedData = jsonData.data.map((item) => ({
        ...item,
        isChecked: false,
      }));
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };
  //xử lý check
  const handleCheckboxChange = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    setData(updatedData);
    const selectedIds = updatedData
      .filter((item) => item.isChecked)
      .map((item) => item.id);
    setSelectedItems(selectedIds);
  };
  //xoá hàng loạt
  const handleDeleteSelected = async () => {
    try {
      await fetch('https://reqres.in/api/users', {
        method: 'DELETE',
        body: JSON.stringify(selectedItems),

      });

      const updatedData = data.filter((item) => !selectedItems.includes(item.id));
      setData(updatedData);
      setSelectedItems([]);
    } catch (error) {
      console.error(error);
    }
  };
  //xoá 1 sp
  const handleClose = async (item) => {
    try {
      await fetch(`https://reqres.in/api/users/${item.id}`, {
        method: 'DELETE',

      });
      const updatedData = data.filter((cartItem) => cartItem.id !== item.id);
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };
//dong form
const handleFormClose = () => {
  setShowForm(false);
  setCheckoutSuccess(false);
};


  const cartItems = (cartItem) => {
    return (
        <div className="cart-item px-4 my-5 bg-light rounded-3" key={cartItem.id}>
          <button
              onClick={() => handleClose(cartItem)}
              className="close-icon"
              aria-label="Close"
          ></button>
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <img src={cartItem.avatar} alt={cartItem.first_name} />
              </div>
              <div className="col-md-4">
                <h3>{cartItem.title}</h3>
                <p className="lead fw-bold">${cartItem.id}</p>
                <p className="lead fw-bold">{cartItem.first_name}{cartItem.first_name}{cartItem.first_name}</p>
                <p className="lead fw-bold">{cartItem.last_name}{cartItem.first_name}{cartItem.first_name}</p>

                <div className="form-check">
                  <input
                      type="checkbox"
                      className="form-check-input"
                      checked={cartItem.isChecked}
                      onChange={() => handleCheckboxChange(cartItem.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    )};

    const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };
  const calculateTotalPrice = () => {
    const totalPrice = data.reduce((total, item) => {
      if (item.isChecked) {
        return total + (Number(item.id));
      }
      return total;
    }, 0);

    return totalPrice;
  }
  const handleCheckout = () => {
    setShowForm(true); // Hiển thị form thanh toán khi nhấp vào nút "Checkout"
  };
  const button = () => {
    const totalPrice = calculateTotalPrice();

    const handleSubmit = async (event) => {
      event.preventDefault();

      // Prepare the data to send
      const dataToSend = {
        name: name,
        address: address,
        phone: phone,
        selectedItems: selectedItems
      };
      if (name.trim() === '' || address.trim() === '' || phone.trim() === '') {
        alert('Vui lòng điền đầy đủ thông tin');
      }
      else {

      try {
        const response = await fetch('https://reqres.in/api/checkout', {
          method: 'POST',
          body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
          // Handle successful response
          console.log('Checkout successful');
          // Reset the form and selected items
          setName('');
          setAddress('');
          setSelectedItems([]);
          setCheckoutSuccess(true);
        } else {
          // Handle error response
          console.error('Checkout failed');
        }
      } catch (error) {
        console.error(error);
      }
    }

    };

    return (
      <div className="container">
      <div className="row">
        <button className="btn btn-outline-primary"  onClick={handleDeleteSelected}>Delete Selected</button>
        <button className="btn btn-outline-primary" onClick={handleCheckout}>Checkout</button>
        <p> </p>
        <p>Total Price: ${totalPrice}</p>
      </div>

      {/* Hiển thị form thanh toán nếu biến showForm là true */}
      {showForm && (
        <form onSubmit={handleSubmit} className="text-center">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              className="form-control"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <button className="btn btn-outline-primary ms-auto" type="submit">Submit</button>
          <button className="btn btn-outline-primary ms-auto" onClick={handleFormClose}>Close</button>


        </form>
      )}
       {checkoutSuccess && (
        <div className="alert alert-success" role="alert">
          Checkout successful!
        </div>
      )}
    </div>


    );
  };

  // ...

  return (
    <>
      {data.length === 0 && emptyCart()}
      {data.length !== 0 && data.map(cartItems)}
      {data.length !== 0 && button()}
    </>
  );
};

export default Cart;