import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Tentativa de login com: ${email} (Simulação)`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bem-vindo de volta</h2>
        <p className="login-subtitle">Continue sua jornada rumo à aprovação.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="********" required />
          </div>

          <button type="submit" className="btn-primary full-width">Entrar</button>
        </form>

        <div className="login-footer">
          <p>Ainda não tem conta? <Link to="/cadastro">Cadastre-se grátis</Link></p>
            <a href="#" className="forgot-pass">Esqueci minha senha</a>
        </div>
      </div>
    </div>
  );
};

export default Login;