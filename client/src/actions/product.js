import axios from "axios";

import { ADD_PRODUCT, PRODUCT_ERROR } from "./types";
import { setAlert } from "./alert";

export const addProduct = (userId, formData) => async (dispatch) => {
  const body = formData;
  try {
    const res = await axios.post(`/product/create/${userId}`, body);
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
