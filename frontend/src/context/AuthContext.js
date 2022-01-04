import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducers";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,

  isFecthing: false,

  error: false,
};
export const Authcontext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <Authcontext.Provider
      value={{
        user: state.user,
        isFecthing: state.isFecthing,
        error: state.error,
        dispatch,
      }}>
      {children}
    </Authcontext.Provider>
  );
};
