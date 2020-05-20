import { ADD_PRODUCT, PRODUCT_ERROR } from "../actions/types";

const initialState = {
  products: [],
  product: null,
  error: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
