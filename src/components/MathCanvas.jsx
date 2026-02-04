import { useEffect, useRef } from 'react';

const MathCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 20 + 10;
        this.symbols = ['∫', '∑', 'π', '∂', '√', 'ƒ', 'x', 'y'];
        this.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        this.opacity = Math.random() * 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.font = `${this.size}px serif`;
        ctx.fillStyle = `rgba(41, 98, 255, ${this.opacity})`;
        ctx.fillText(this.symbol, this.x, this.y);
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor(width / 15);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    // Inicialização
    resize();
    initParticles();
    animate();

    // Listeners
    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    // Cleanup (Importante no React para não travar a memória)
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="math-canvas" />;
};

export default MathCanvas;