import React from 'react';

const Testimonials = () => {
  const reviews = [
    { name: "Ana Clara", curso: "Engenharia Civil", text: "Eu reprovei em Cálculo 1 duas vezes. Com o Recalculando, passei com 9.0. O método visual mudou tudo." },
    { name: "Lucas M.", curso: "Ciência da Computação", text: "A parte de integrais sempre foi um pesadelo. As animações 3D fizeram clicar na minha cabeça." },
    { name: "Beatriz S.", curso: "Física", text: "O suporte é incrível. O tutor IA me salvou na madrugada antes da prova." },
    { name: "João Pedro", curso: "Engenharia Mecânica", text: "Melhor investimento do semestre. Custa menos que uma aula particular e ensina muito mais." },
  ];

  return (
    <div className="page-container">
      <div className="methodology-header">
        <h1>Histórias de <span className="highlight">Aprovação</span></h1>
        <p>Junte-se a mais de 5.000 alunos que venceram o Cálculo.</p>
      </div>

      <div className="testimonials-grid">
        {reviews.map((review, index) => (
          <div key={index} className="testimonial-card-page">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"{review.text}"</p>
            <div className="user-info">
              <strong>{review.name}</strong>
              <span>{review.curso}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;