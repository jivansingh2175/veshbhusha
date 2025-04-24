// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// const AppRoutes = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Hero</Link>
//         </li>
//         <li>
//           <Link to="/product">product</Link>
//         </li>
//         <li>
//           <Link to="/signup">Signup</Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default AppRoutes;


// src/components/AppRoutes.jsx
import React from "react";
import { Link } from "react-router-dom";

const AppRoutes = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Hero</Link></li>
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/account">Account</Link></li> {/* 👈 Added this line */}
        
      </ul>
    </nav>
  );
};

export default AppRoutes;
