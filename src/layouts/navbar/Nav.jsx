import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Nav = () => {
  const { isAuth, logout } = useContext(AuthContext);
  // console.log(isAuth);

  return (
    <div className="container ">
      <div className="d-flex justify-content-between align-items-center">
        <div className="">
          <a className="navbar-brand" href="/#">
            Quiz Maker
          </a>
        </div>
        <div className="">
          <ul className="d-flex ">
            <li className="nav-item list-unstyled">
              <a className="nav-link  active " href="/#" aria-current="page">
                Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            {!isAuth.checkAuth ? (
              <li className="nav-item list-unstyled">
                <a className="nav-link " href="/#login">
                  login
                </a>
              </li>
            ) : (
              <li className="nav-item list-unstyled">
                <a className="nav-link " href="/#logout" onClick={logout}>
                  Logout
                </a>
              </li>
            )}
            {isAuth.checkAuth ? (
              <li className="nav-item list-unstyled">
                <a className="nav-link " href="/#quiz">
                  Quiz
                </a>
              </li>
            ) : (
              <li className="nav-item list-unstyled">
                <a className="nav-link " href="/#">
                  Register Now
                </a>
              </li>
            )}
            <li className="nav-item list-unstyled">
              <a className="nav-link " href="/#result">
                Result
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
