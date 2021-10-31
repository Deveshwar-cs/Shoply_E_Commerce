import { SET_SEARCH_QUERY, CLEAR_SEARCH_QUERY } from '../actions/types';

// Set search query

export const setSearchQuery = (text) => ({
  type: SET_SEARCH_QUERY,
  payload: text,
});

export const clearSearchQuery = () => ({ type: CLEAR_SEARCH_QUERY });
