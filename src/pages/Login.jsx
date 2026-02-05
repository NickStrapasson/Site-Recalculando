import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// --- IMPORTS DO FIREBASE ---
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate(); // Hook para redirecionar

  // Agrupando os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Estado para validação visual do e-mail
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false); // Loading no botão

  // Função auxiliar de validação (Regex)
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validação em tempo real apenas para o campo email
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  };

  // --- FUNÇÃO DE LOGIN REAL ---
  const handleLogin = async (e) => {
    e.preventDefault();

    // Bloqueia se o email estiver inválido visualmente
    if (emailError || !formData.email) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    setLoading(true);

    try {
      // Tenta fazer o login no Firebase
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      navigate('/aulas'); 

    } catch (error) {
      console.error("Erro no login:", error);
      
      // Tratamento de erros comuns
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert("E-mail ou senha incorretos.");
      } else if (error.code === 'auth/too-many-requests') {
        alert("Muitas tentativas falhas. Tente novamente mais tarde.");
      } else {
        alert("Erro ao entrar: " + error.message);
      }
    } finally {
      setLoading(false);
    }
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
              name="email" 
              placeholder="seu@email.com" 
              value={formData.email}
              onChange={handleChange}
              className={emailError ? 'input-error' : ''} 
              required 
            />
            {emailError && <span className="error-msg">Formato de e-mail inválido</span>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              name="password" 
              placeholder="********" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-footer">
          <p>Ainda não tem conta? <Link to="/cadastro">Cadastre-se grátis</Link></p>
          <a href="#" className="forgot-pass" onClick={(e) => { e.preventDefault(); alert("Funcionalidade de recuperar senha será implementada em breve!"); }}>
            Esqueci minha senha
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;