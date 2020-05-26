import axios from "axios";
import queryString from "query-string";
import {
  ADD_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_PRODUCT,
  RELATED_PRODUCTS,
} from "./types";
import { setAlert } from "./alert";

export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/product/create`, formData);
    dispatch(setAlert("Product Craeted", "success"));
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Failed! Please try again", "danger"));
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getSortedProducts = (sortBy) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/product/list/of/products?sortBy=${sortBy}&order=desc&limit=6`
    );
    if (sortBy === "sold") {
      dispatch({
        type: GET_PRODUCT_BY_SELL,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PRODUCT_BY_ARRIVAL,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getRelatedProducts = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/related/products/${id}`);
    dispatch({
      type: RELATED_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFilteredByProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`/product/list/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const list = (params) => {
  const query = queryString.stringify(params);
  console.log(query);
  return fetch(`/product/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
