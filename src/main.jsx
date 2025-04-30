// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { CartProvider } from './context/cartContext'; // 💡 Import this

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <CartProvider> {/* 🛒 Wrap your App here */}
//       <App />
//     </CartProvider>
//   </StrictMode>
// );


// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { CartProvider } from './context/cartContext.jsx';
// import { WishlistProvider } from './context/wishListContext.jsx'; // ✅ Import

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <CartProvider>
//       <WishlistProvider> {/* ✅ Wrap App here */}
//         <App />
//       </WishlistProvider>
//     </CartProvider>
//   </StrictMode>
// );


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/cartContext.jsx';
import { WishlistProvider } from './context/wishListContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // ✅ Auth context import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* 🔐 Wrap everything inside AuthProvider */} 
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
