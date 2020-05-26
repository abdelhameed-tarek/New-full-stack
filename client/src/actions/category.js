import axios from "axios";
import { CREATE_CATEGORY, CATEGORY_ERROR, GET_CATEGORIES } from "./types";
import { setAlert } from "./alert";

export const addCategory = (name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(name);

  try {
    const res = await axios.post(`/category/create`, body, config);
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert("Created", "success"));
  } catch (err) {
    dispatch(
      setAlert("Failed! make sure that is category name is unique ", "danger")
    );
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/category");
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
