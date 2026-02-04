import React from 'react';

const Resources = () => {
  return (
    <div className="page-container">
      <div className="methodology-header">
        <h1>O Arsenal do <span className="highlight">Estudante</span></h1>
        <p>Ferramentas projetadas para eliminar suas dúvidas.</p>
      </div>

      <div className="resources-grid-detailed">
        {/* Item 1 */}
        <div className="resource-detail-card">
          <div className="icon-large">🎥</div>
          <h3>Aulas em 4K com Animações</h3>
          <p>Não usamos lousa e giz. Usamos Python e Manim (engine gráfica) para gerar animações que mostram o comportamento das funções em tempo real.</p>
        </div>

        {/* Item 2 */}
        <div className="resource-detail-card">
          <div className="icon-large">📝</div>
          <h3>Listas de Exercícios Inteligentes</h3>
          <p>As listas se adaptam ao seu nível. Se você errar o básico, o sistema sugere revisão de Pré-Cálculo automaticamente.</p>
        </div>

        {/* Item 3 */}
        <div className="resource-detail-card">
          <div className="icon-large">🤖</div>
          <h3>Mentor IA (CálculoGPT)</h3>
          <p>Tire foto da sua questão e nossa IA explica o passo a passo, sem apenas dar a resposta final.</p>
        </div>

        {/* Item 4 */}
        <div className="resource-detail-card">
          <div className="icon-large">🏆</div>
          <h3>Certificado Verificado</h3>
          <p>Ao concluir o curso, receba um certificado com carga horária para usar como horas complementares na faculdade.</p>
        </div>
      </div>
    </div>
  );
};

export default Resources;