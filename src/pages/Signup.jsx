import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// --- IMPORTS DO FIREBASE ---
import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const navigate = useNavigate(); // Hook para redirecionar o usuário
  
  const [formData, setFormData] = useState({
    nome: '', sobrenome: '', email: '', idade: '',
    instituicao: '', curso: '', senha: ''
  });

  const [errors, setErrors] = useState({ email: '' });

  // --- ESTADOS VISUAIS ---
  const [sugestoes, setSugestoes] = useState([]); 
  const [buscando, setBuscando] = useState(false); 
  const [mostrarLista, setMostrarLista] = useState(false); 
  const [loadingCadastro, setLoadingCadastro] = useState(false); // Novo estado de loading

  // --- LÓGICA DE SENHA ---
  const checkPasswordRules = (senha) => {
    return {
      length: senha.length >= 8,
      numbers: (senha.match(/\d/g) || []).length >= 2,
      special: /[!@#$%^&*(),.?":{}|<>_+\-=]/.test(senha)
    };
  };

  const passStatus = checkPasswordRules(formData.senha);
  const isPasswordValid = Object.values(passStatus).every(Boolean);

  // --- FUNÇÕES AUXILIARES ---
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const buscarInstituicoes = async (termo) => {
    if (termo.length < 3) {
      setSugestoes([]); setMostrarLista(false); return;
    }
    setBuscando(true);
    try {
      const response = await fetch(`http://universities.hipolabs.com/search?name=${termo}&country=Brazil`);
      const data = await response.json();
      setSugestoes(data.slice(0, 5)); setMostrarLista(true);
    } catch (error) { console.error(error); } finally { setBuscando(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'instituicao') buscarInstituicoes(value);
    
    if (name === 'email') {
      setErrors(prev => ({
        ...prev, 
        email: value && !validateEmail(value) ? 'E-mail inválido' : ''
      }));
    }
  };

  const selecionarInstituicao = (nome) => {
    setFormData(prev => ({ ...prev, instituicao: nome }));
    setMostrarLista(false); setSugestoes([]);
  };

  // --- FUNÇÃO DE ENVIO (ATUALIZADA COM FIREBASE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações Finais
    if (!validateEmail(formData.email)) {
      alert("Corrija o e-mail."); return;
    }
    
    if (!isPasswordValid) {
      alert("A senha não atende aos requisitos de segurança."); return;
    }

    setLoadingCadastro(true); // Ativa o loading

    try {
      // 1. Cria o usuário na Autenticação
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      const user = userCredential.user;

      // 2. Salva os dados no Banco de Dados (Firestore)
      // Usamos o UID como chave para facilitar a busca depois
      await setDoc(doc(db, "users", user.uid), {
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        email: formData.email,
        idade: formData.idade,
        instituicao: formData.instituicao,
        curso: formData.curso,
        createdAt: new Date() // Data de criação
      });

      alert("Cadastro realizado com sucesso!");
      navigate('/login'); // Redireciona para o login

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      
      // Tratamento de erros comuns
      if (error.code === 'auth/email-already-in-use') {
        alert("Este e-mail já está em uso.");
      } else if (error.code === 'auth/weak-password') {
        alert("A senha é muito fraca.");
      } else {
        alert("Erro ao cadastrar: " + error.message);
      }
    } finally {
      setLoadingCadastro(false); // Desativa o loading independente do resultado
    }
  };

  const isCursoDisabled = formData.instituicao.trim() === '';

  return (
    <div className="login-container">
      <div className="login-card signup-card-adjust">
        <h2>Crie sua conta</h2>
        <p className="login-subtitle">Comece a aprender Cálculo do jeito certo.</p>

        <form onSubmit={handleSubmit}>
          
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Sobrenome</label>
              <input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row with-flex">
            <div className="form-group" style={{flex: 1}}>
              <label>Idade</label>
              <input type="number" name="idade" value={formData.idade} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{flex: 3}}>
              <label>E-mail</label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange}
                className={errors.email ? 'input-error' : ''} required 
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
          </div>

          <div className="form-group position-relative">
            <label>Instituição de Ensino</label>
            <input 
              type="text" name="instituicao" placeholder="Digite para buscar..." 
              value={formData.instituicao} onChange={handleChange} autoComplete="off" 
            />
            {buscando && <span className="loading-text">Buscando...</span>}
            {mostrarLista && sugestoes.length > 0 && (
              <ul className="suggestions-list">
                {sugestoes.map((uni, index) => (
                  <li key={index} onClick={() => selecionarInstituicao(uni.name)}>{uni.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-group">
            <label>Curso</label>
            <input 
              type="text" name="curso" 
              placeholder={isCursoDisabled ? "Selecione a instituição" : "Ex: Engenharia"}
              value={formData.curso} onChange={handleChange} disabled={isCursoDisabled}
              className={isCursoDisabled ? 'input-disabled' : ''}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" name="senha" 
              value={formData.senha} onChange={handleChange} required 
              className={formData.senha && !isPasswordValid ? 'input-warning' : ''}
            />
            
            <div className="password-requirements">
              <p className={passStatus.length ? 'valid' : ''}>
                {passStatus.length ? '✅' : '○'} Mínimo de 8 caracteres
              </p>
              <p className={passStatus.numbers ? 'valid' : ''}>
                {passStatus.numbers ? '✅' : '○'} Pelo menos 2 números
              </p>
              <p className={passStatus.special ? 'valid' : ''}>
                {passStatus.special ? '✅' : '○'} 1 caractere especial
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary full-width" 
            disabled={!isPasswordValid || loadingCadastro}
            style={{ 
              opacity: (!isPasswordValid || loadingCadastro) ? 0.6 : 1, 
              cursor: (!isPasswordValid || loadingCadastro) ? 'not-allowed' : 'pointer' 
            }}
          >
            {loadingCadastro ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="login-footer">
          <p>Já tem uma conta? <Link to="/login">Fazer Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;