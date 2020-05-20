import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import category from "./category";
import product from "./product";

export default combineReducers({
  alert,
  auth,
  category,
  product,
});
