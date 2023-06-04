import React, { useState } from 'react';
import './navbar.css'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <div className="logo">Xeno Contact</div>
      <ul className="nav-links">
        {isLoggedIn ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li onClick={handleLogin}>Login</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
