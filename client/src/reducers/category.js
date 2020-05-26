import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  CATEGORY_ERROR,
} from "../actions/types";

const initialState = {
  categories: [],
  category: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
