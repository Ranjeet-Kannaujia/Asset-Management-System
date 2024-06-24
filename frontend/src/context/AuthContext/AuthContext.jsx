import axios from "axios";
import { createContext, useReducer } from "react";
import { LOGIN_SUCCESS, LOGIN_FAILED } from "./authActionType";
export const authContext = createContext();

//Initial state
const INITIAL_STATE = {
  userAuth: null,
  error: null,
  loading: false,
  profile: null,
};

//AuthReducer

const reducer = (state, action) => {
   const {type , payload} = action;
  
  switch(type){
   case LOGIN_SUCCESS :
      // Add user to localstorage
      localStorage.setItem('userAuth', payload.token);   
      return {
         ...state,
         loading : false,
         error : null,
         userAuth : payload,
      };
      case LOGIN_FAILED :
      return {
         ...state,
         loading : false,
         error : payload,
         userAuth : null,
      }
      console.log(state);
  }
};
//provider
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
console.log(state)

  //login Action
  const loginUserAction = async (formData) => {
    // console.log(state);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:9000/login",
        formData,
        config
      );
      console.log(res);
      if (res?.data?.msg === "success") {
        dispatch({
          type:LOGIN_SUCCESS,
          payload: res.data,
        });
         // Redirect to the asset route after successful login
        //  history.push("/asset");
      }
    } catch (error) {
      dispatch({
         type: "LOGIN_FAILED",
         payload: error?.response?.data?.message,
       });
    }
  };

  return (
    <authContext.Provider value = { loginUserAction }>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
