import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h2>This is home</h2>
      <Link to="/auth/register">Register</Link>
    </div>
  );
};

export default Home;
