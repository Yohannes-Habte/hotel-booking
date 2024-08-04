import React, { useReducer } from 'react';
import { createContext } from 'react';
import SearchReducer from './SearchReducer';

// Initial State
export const initialState = {
  destination: '',
  dates: [],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext(initialState);
const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initialState);
  return (
    <SearchContext.Provider
      value={{
        destination: state.destination,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
