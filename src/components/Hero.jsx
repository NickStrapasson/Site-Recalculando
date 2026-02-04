import React from 'react';
import MathCanvas from './MathCanvas';

const Hero = () => {
  return (
    <header className="hero">
      <MathCanvas /> {/* O Canvas importado aqui */}
      
      <div className="hero-content">
        <span className="badge-new">✨ Novo Método Visual</span>
        <h1>Cálculo 1 finalmente <br /><span className="highlight">faz sentido.</span></h1>
        <p>Esqueça os livros densos e aulas monótonas. Aprenda Limites, Derivadas e Integrais com visualização dinâmica e gamificação.</p>
        
        <div className="cta-group">
          <button className="btn-primary" onClick={() => alert('Redirecionando para cadastro...')}>
            Começar Agora Grátis
          </button>
          <button className="btn-secondary">Ver Demo Interativa</button>
        </div>
        
        <div className="trust-badge">
          <small>❤️ Usado por +5.000 estudantes de engenharia</small>
        </div>
      </div>
    </header>
  );
};

export default Hero;