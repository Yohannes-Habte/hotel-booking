import { initialState } from './SearchProvider';

// Search Object
export const SEARCH_ACTION = {
  NEW_SEARCH: 'NEW_SEARCH',
  RESET_SEARCH: ' RESET_SEARCH',
};

const SearchReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_ACTION.NEW_SEARCH:
      return action.payload;
    case SEARCH_ACTION.RESET_SEARCH:
      return initialState;
    default:
      return state;
  }
};

export default SearchReducer;
