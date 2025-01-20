import React, { useContext, useEffect } from "react";
import SweetAlert from "../components/SweetAlert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api/baseURL";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  console.log(isAuth);

  const navigate = useNavigate();
  useEffect(() => {
    const pathName = window?.authPrevlink?.pathname;
    delete window?.authPrevlink;
    if (isAuth.checkAuth && pathName) {
      navigate(pathName);
    } else if (isAuth.checkAuth) {
      // console.log(isAuth);
      navigate("/quiz");
    } else {
    }
  }, [isAuth, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email: email.value,
        password: password.value,
      });

      if (response.status === 200) {
        window.localStorage.setItem("quizToken", response.data?.data.userToken);
        setIsAuth({
          checkAuth: true,
          quizToken: response.data?.data.userToken,
          user_info: response.data?.data.user_info,
        });

        // SweetAlert({
        //   icon: "success",
        //   message: "Login Successful! You can now access your account.",
        // });
        // navigate("/quiz");
      } else {
        SweetAlert({
          icon: "error",
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      SweetAlert({
        icon: "error",
        message:
          "An error occurred while trying to login. Please try again later.",
      });
    }
  };
  return (
    <div className="container mt-4">
      <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xxl-6 m-auto">
        <div className="card">
          <div className="card-header">
            <h2 className="text-center">Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="text-end mx-5">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
