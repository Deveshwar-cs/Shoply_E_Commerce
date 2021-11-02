import { SET_SEARCH_QUERY, CLEAR_SEARCH_QUERY } from '../actions/types';

const initialState = { text: '' };

export const searchReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        text: payload,
      };
    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        text: '',
      };
    default:
      return state;
  }
};

export default searchReducer;
