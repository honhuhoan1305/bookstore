export const addItem = (product) => {
    return {
        type : "ADDITEM",
        payload : product
    }
}

export const delItem = (product) => {
    return {
        type : "DELITEM",
        payload : product
    }
}

  // actions/index.js

export const updateQuantity = (item, newQuantity) => {
    return {
      type: 'UPDATE_QUANTITY',
      payload: {
        item: item,
        quantity: newQuantity
      }
    };
  };
  