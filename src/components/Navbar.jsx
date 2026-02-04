import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Recalculando</Link>
      </div>
      
      <div className="menu">
        <Link to="/como-funciona">Como Funciona</Link>
        <Link to="/recursos">Recursos</Link>
        <Link to="/depoimentos">Depoimentos</Link>
      </div>
      <Link to="/login" className="btn-login">Entrar</Link>
    </nav>
  );
};

export default Navbar;