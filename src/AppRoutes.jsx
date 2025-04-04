import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const AppRoutes = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hero</Link>
        </li>
        <li>
          <Link to="/product">product</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppRoutes;
