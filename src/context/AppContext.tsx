import React, {createContext, Dispatch, SetStateAction} from 'react';

interface AppContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    cart: number[];
    setCart: Dispatch<SetStateAction<number[]>>;
  }
  
  export const appContext: AppContextInterface = {
    isAuthenticated: false,
    setIsAuthenticated: () => false,
    cart: [],
    setCart: () => [],
  }
  
  export const AppContext = createContext<AppContextInterface>(appContext);

