import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  var products = JSON.parse(localStorage.getItem("products"));
  const data = products.find((product) => product._id == id);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};
