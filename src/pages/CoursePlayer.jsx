import React, { useState } from 'react';
import { courseModules } from '../data/courseData';
import { Link } from 'react-router-dom';

const CoursePlayer = () => {
  // Estado para controlar qual aula está sendo assistida
  // Começa com a primeira aula do primeiro módulo
  const [currentLesson, setCurrentLesson] = useState(courseModules[0].lessons[0]);
  
  // Estado para controlar quais módulos estão abertos na sidebar (Accordion)
  const [expandedModule, setExpandedModule] = useState(courseModules[0].id);

  return (
    <div className="player-layout">
      {/* --- HEADER SIMPLIFICADO --- */}
      <header className="player-header">
        <div className="logo-small">Recalculando <span className="beta-tag">Player</span></div>
        <Link to="/" className="btn-exit">Sair da Aula</Link>
      </header>

      <div className="main-content-grid">
        
        {/* --- COLUNA DA ESQUERDA: VÍDEO --- */}
        <section className="video-area">
          <div className="video-wrapper">
            {/* Placeholder do Vídeo (simulando Youtube) */}
            <div className="video-placeholder">
              <div className="play-button">▶</div>
              <p>Tocando: {currentLesson.title}</p>
            </div>
          </div>
          
          <div className="video-info">
            <h1>{currentLesson.title}</h1>
            <div className="video-actions">
              <button className="btn-action">👍 Gostei</button>
              <button className="btn-action">📝 Anotações</button>
              <button className="btn-action">💬 Dúvidas</button>
            </div>
            <div className="description-box">
              <p>Nesta aula, vamos explorar os conceitos fundamentais de <strong>{currentLesson.title}</strong>. Prepare seu caderno e não esqueça de resolver a lista de exercícios ao final.</p>
            </div>
          </div>
        </section>

        {/* --- COLUNA DA DIREITA: PLAYLIST (SIDEBAR) --- */}
        <aside className="playlist-sidebar">
          <h3>Conteúdo do Curso</h3>
          <div className="modules-list">
            {courseModules.map((module) => (
              <div key={module.id} className="module-item">
                {/* Cabeçalho do Módulo (Clicável para abrir/fechar) */}
                <div 
                  className={`module-header ${expandedModule === module.id ? 'active' : ''}`}
                  onClick={() => setExpandedModule(module.id === expandedModule ? null : module.id)}
                >
                  <span>{module.title}</span>
                  <span className="arrow">{expandedModule === module.id ? '▼' : '▶'}</span>
                </div>

                {/* Lista de Aulas do Módulo */}
                {expandedModule === module.id && (
                  <div className="lessons-list">
                    {module.lessons.map((lesson) => (
                      <div 
                        key={lesson.id} 
                        className={`lesson-item ${currentLesson.id === lesson.id ? 'playing' : ''}`}
                        onClick={() => setCurrentLesson(lesson)}
                      >
                        <div className="lesson-status">
                          {currentLesson.id === lesson.id ? '▶' : '○'}
                        </div>
                        <div className="lesson-info">
                          <span className="lesson-title">{lesson.title}</span>
                          <span className="lesson-duration">{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
};

export default CoursePlayer;