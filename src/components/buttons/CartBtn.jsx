/* import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartBtn = () => {
  const state = useSelector((state) => state.addItem);

  return (
    <>
      <NavLink to="/cart" className="btn btn-outline-primary ms-2">
        <span className="fa fa-shopping-cart me-1"></span> Cart ({state.lengt*quantity})
      </NavLink>
    </>
  );
};

export default CartBtn;
  */


import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartBtn = () => {
  const state = useSelector((state) => state.addItem);
  const quantity = 1; // Số lượng mặc định, bạn có thể thay đổi theo yêu cầu

  const totalQuantity = state.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <NavLink to="/cart" className="btn btn-outline-primary ms-2">
        <span className="fa fa-shopping-cart me-1"></span> Cart ({totalQuantity * quantity})
      </NavLink>
    </>
  );
};

export default CartBtn;
