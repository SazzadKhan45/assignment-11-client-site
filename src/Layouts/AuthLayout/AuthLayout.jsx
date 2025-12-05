import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Login from "../../Pages/Login/Login";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {/*  */}
      <main>
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="mt-10">
        <h2>Footer</h2>
      </footer>
    </div>
  );
};

export default AuthLayout;
