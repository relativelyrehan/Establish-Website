/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useReducer } from 'react';
import { ACCESS_TOKEN_KEY, ESTABLISH_USER } from '../constants';

import { appReducer } from './reducer';

export const StateContext = createContext(null);

const ContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, {
    isLogin:
      typeof window !== 'undefined' &&
        window.localStorage.getItem(ACCESS_TOKEN_KEY) !== null
        ? true
        : false,
    user:
      typeof window !== 'undefined' &&
        window.localStorage.getItem(ESTABLISH_USER) !== null
        ? JSON.parse(window.localStorage.getItem(ESTABLISH_USER))
        : {},
  });
  return (
    <StateContext.Provider value={[appState, dispatch]}>
      {props.children}
    </StateContext.Provider>
  );
};

export default ContextProvider;
