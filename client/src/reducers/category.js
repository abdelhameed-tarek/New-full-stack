import { CREATE_CATEGORY, CREATE_CATEGORY_FAIL } from "../actions/types";

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
    case CREATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
