import React from 'react';

const Features = () => {
  return (
    <>
      {/* Seção Como Funciona */}
      <section id="funciona" className="section-container">
        <div className="split-layout">
          <div className="text-side">
            <h2>Você não é ruim em matemática.<br />O método é que é antigo.</h2>
            <p>A maioria dos cursos ensina cálculo decorando fórmulas. O Recalculando ensina você a <strong>enxergar</strong> a matemática.</p>
            <ul className="benefit-list">
              <li>❌ Chega de "faça assim porque sim"</li>
              <li>✅ Entenda o "porquê" visualmente</li>
              <li>✅ Feedback instantâneo nos exercícios</li>
            </ul>
          </div>
          <div className="image-side">
            <div className="image-placeholder-container">
              <img 
                src="https://placehold.co/600x400/F4F6F8/2962FF?text=Print+da+Interface+Aqui" 
                alt="Visualização da Interface do Curso DeltaX" 
                className="feature-image" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Recursos */}
      <section id="recursos" className="features-section">
        <div className="section-header">
          <h2>Tudo o que você precisa para passar</h2>
        </div>
        
        <div className="grid-features">
          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Aulas Curtas</h3>
            <p>Direto ao ponto. Vídeos de 5 a 10 minutos focados em um único conceito.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🎮</div>
            <h3>Gamificação</h3>
            <p>Ganhe XP, mantenha seu streak e suba de nível enquanto resolve integrais.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🤖</div>
            <h3>Tutor IA 24/7</h3>
            <p>Travou numa questão às 3 da manhã? Nossa IA explica o passo a passo.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;