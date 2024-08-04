import React, { createContext } from 'react';
import { useReducer } from 'react';
import BgReducer from './BgReducer';

// Initial State
const initialState = {
  darkMode: false,
  grayMode: false,
};

// Create Context
export const BackgroundContext = createContext(initialState);

// Function
const BgProvider = ({ children }) => {
  // State variables
  const [state, dispatch] = useReducer(BgReducer, initialState);
  return (
    <BackgroundContext.Provider
      value={{ darkMode: state.darkMode, grayMode: state.grayMode, dispatch }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export default BgProvider;
