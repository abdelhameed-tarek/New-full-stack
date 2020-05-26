import {
  ADD_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_PRODUCT,
  RELATED_PRODUCTS,
} from "../actions/types";

const initialState = {
  products: [],
  product: null,
  productsByArrival: [],
  productsBySell: [],
  relatedProducts: [],
  error: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case RELATED_PRODUCTS:
      return {
        ...state,
        relatedProducts: payload,
        loading: false,
      };
    case GET_PRODUCT_BY_ARRIVAL:
      return {
        ...state,
        productsByArrival: payload,
        loading: false,
      };
    case GET_PRODUCT_BY_SELL:
      return {
        ...state,
        productsBySell: payload,
        loading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product: [payload, ...state.products],
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
