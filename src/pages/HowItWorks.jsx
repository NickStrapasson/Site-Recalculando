// src/pages/HowItWorks.jsx
import React from 'react';

const HowItWorks = () => {
  return (
    <div className="page-container">
      <section className="methodology-header">
        <h1>O Método <span className="highlight">Triforce</span></h1>
        <p>Por que nossos alunos aprendem Cálculo 3x mais rápido?</p>
      </section>

      <section className="steps-container">
        {/* Passo 1 */}
        <div className="step-card">
          <div className="step-number">01</div>
          <div className="step-content">
            <h3>Visualização Primeiro</h3>
            <p>O cérebro processa imagens 60.000x mais rápido que texto. Antes de te mostrar a fórmula da Derivada, nós te mostramos o que ela <em>faz</em> geometricamente.</p>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="step-card reverse">
          <div className="step-number">02</div>
          <div className="step-content">
            <h3>Micro-Aulas</h3>
            <p>Nada de vídeos de 50 minutos. Nossas aulas têm média de 7 minutos, focadas em um único conceito por vez. É impossível se perder.</p>
          </div>
        </div>

        {/* Passo 3 */}
        <div className="step-card">
          <div className="step-number">03</div>
          <div className="step-content">
            <h3>Feedback Inteligente</h3>
            <p>Errou o sinal? O sistema te avisa. Errou a regra da cadeia? Ele te sugere uma revisão. Você nunca fica travado sem saber o motivo.</p>
          </div>
        </div>
      </section>
      
      <div style={{textAlign: 'center', margin: '60px 0'}}>
        <button className="btn-primary" onClick={() => window.location.href='/'}>Voltar para o Início</button>
      </div>
    </div>
  );
};

export default HowItWorks;