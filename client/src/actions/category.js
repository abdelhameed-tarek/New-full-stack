import axios from "axios";
import { CREATE_CATEGORY, CREATE_CATEGORY_FAIL } from "./types";
import { setAlert } from "./alert";

export const addCategory = (userId, name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(name);

  try {
    const res = await axios.post(`/category/create/${userId}`, body, config);
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
      type: CREATE_CATEGORY_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
