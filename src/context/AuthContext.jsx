import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
// import baseUrl from "../api/baseURL";
import { Navigate } from "react-router-dom";
import baseUrl from "../api/baseURL";
// import axios from "axios";

export const AuthContext = createContext(null);
const AuthContextProvider = ({ children }) => {
  let [isAuth, setIsAuth] = useState({
    checkAuth: false,
    quizToken: null,
    user_info: null,
  });
  useEffect(() => {
    // const response = axios.get(`${baseUrl}/chech-auth`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + window.localStorage.getItem("quizToken"),
    //   },
    // });
    //   console.log(response);

    let token = window.localStorage.getItem("quizToken");
    if (token) {
      setIsAuth({
        checkAuth: true,
        quizToken: token,
        // user_info: response.data.data,
      });
      <Navigate to="/" />;
    }
  }, []);

  const logout = () => {
    setIsAuth(false);
    window.localStorage.removeItem("quizToken");
  };
  const value = { isAuth, setIsAuth, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
