import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstant";
import axios from "axios";

// Product List Action
export const listProducts =
  (keyword, ...params) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      var data = JSON.parse(localStorage.getItem("products"));
      if (data == null) {
        data = [];
        localStorage.setItem("products", JSON.stringify([]));
      }
      if (keyword) {
        data = data.filter(
          (product) =>
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.category.toLowerCase().includes(keyword.toLowerCase())
        );
      } else if (keyword == "") {
        data = JSON.parse(localStorage.getItem("products"));
      }

      if (params[0] == "ASC") {
        // assending
        data = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (params[0] == "DESC") {
        // decending
        data = data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      } else if (params[0] == "Rating") {
        data = data.sort(
          (a, b) => parseFloat(b.numReviews) - parseFloat(a.numReviews)
        );
      }
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProductFromList = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    var products = JSON.parse(localStorage.getItem("products"));
    var filterProduct = products.filter((product) => product._id != id);
    localStorage.setItem("products", JSON.stringify(filterProduct));
    JSON.parse(localStorage.getItem("products"));
    const data = JSON.parse(localStorage.getItem("products"));
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
