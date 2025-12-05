import React from "react";
import { Link } from "react-router";

const NavLinks = () => {
  return (
    <li className="">
      <Link to="/">Home</Link>
      <Link>Services</Link>
      <Link>Blogs</Link>
      <Link>Contact Us</Link>
    </li>
  );
};

export default NavLinks;
