import React from 'react';
import { Link } from 'react-router-dom';
import '../style/style.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">abacaX</h1>
        <nav className="nav-links">
          <Link to="/">Início</Link>
          <Link to="/create">Criar Post</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
