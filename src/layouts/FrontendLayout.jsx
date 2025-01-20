import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./navbar/Header";
import Footer from "./navbar/Footer";

const FrontendLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default FrontendLayout;
