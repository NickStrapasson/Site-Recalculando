import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    nome: '', sobrenome: '', email: '', idade: '',
    instituicao: '', curso: '', senha: ''
  });

  const [errors, setErrors] = useState({ email: '' });

  // --- NOVOS ESTADOS PARA A API ---
  const [sugestoes, setSugestoes] = useState([]); // Lista de faculdades encontradas
  const [buscando, setBuscando] = useState(false); // Loading
  const [mostrarLista, setMostrarLista] = useState(false); // Controla se a lista aparece

  // Validação de Email (Mantida)
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // --- FUNÇÃO PARA BUSCAR NA API ---
  const buscarInstituicoes = async (termo) => {
    if (termo.length < 3) {
      setSugestoes([]);
      setMostrarLista(false);
      return;
    }

    setBuscando(true);
    try {
      // Busca universidades no Brasil com o nome digitado
      const response = await fetch(`http://universities.hipolabs.com/search?name=${termo}&country=Brazil`);
      const data = await response.json();
      
      // Limita a 5 resultados para não poluir a tela
      setSugestoes(data.slice(0, 5)); 
      setMostrarLista(true);
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
    } finally {
      setBuscando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));

    // Se estiver digitando no campo instituição, chama a API
    if (name === 'instituicao') {
      buscarInstituicoes(value);
    }

    // Validação de Email
    if (name === 'email') {
      setErrors(prev => ({
        ...prev, 
        email: value && !validateEmail(value) ? 'E-mail inválido' : ''
      }));
    }
  };

  // --- QUANDO O USUÁRIO CLICA NA SUGESTÃO ---
  const selecionarInstituicao = (nomeInstituicao) => {
    setFormData(prev => ({ ...prev, instituicao: nomeInstituicao }));
    setMostrarLista(false); // Esconde a lista
    setSugestoes([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Corrija o e-mail."); return;
    }
    console.log('Enviando:', formData);
    alert(`Cadastro realizado! Bem-vindo(a) ${formData.nome}`);
  };

  // Lógica para destravar o curso (agora precisa ter selecionado algo)
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

          {/* --- CAMPO DE INSTITUIÇÃO COM AUTOCOMPLETE --- */}
          <div className="form-group position-relative">
            <label>Instituição de Ensino</label>
            <input 
              type="text" 
              name="instituicao"
              placeholder="Digite para buscar (ex: USP)" 
              value={formData.instituicao} 
              onChange={handleChange}
              // Fecha a lista se o usuário clicar fora (blur) é complexo, vamos simplificar
              autoComplete="off" 
            />
            {buscando && <span className="loading-text">Buscando...</span>}

            {/* LISTA DE SUGESTÕES FLUTUANTE */}
            {mostrarLista && sugestoes.length > 0 && (
              <ul className="suggestions-list">
                {sugestoes.map((uni, index) => (
                  <li key={index} onClick={() => selecionarInstituicao(uni.name)}>
                    {uni.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-group">
            <label>Curso <small>(Libera após selecionar instituição)</small></label>
            <input 
              type="text" name="curso"
              placeholder={isCursoDisabled ? "Selecione a instituição acima" : "Ex: Engenharia"}
              value={formData.curso} onChange={handleChange}
              disabled={isCursoDisabled}
              className={isCursoDisabled ? 'input-disabled' : ''}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-primary full-width">Cadastrar</button>
        </form>

        <div className="login-footer">
          <p>Já tem uma conta? <Link to="/login">Fazer Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;