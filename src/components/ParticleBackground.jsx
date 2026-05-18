import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.0008;
      const centerX = canvas.width / 2;
      const helixWidth = Math.min(canvas.width * 0.12, 100);
      const dotSpacing = 25;
      const verticalSpeed = time * 20;

      // Render 3 Helices for a fuller background
      const offsets = [-canvas.width * 0.35, 0, canvas.width * 0.35];
      
      offsets.forEach((offsetX) => {
        const currentCenterX = centerX + offsetX;
        
        for (let y = -50; y < canvas.height + 50; y += dotSpacing) {
          // Add a subtle wave to the Y position
          const adjustedY = (y + verticalSpeed) % (canvas.height + 100) - 50;
          const angle = adjustedY * 0.005 + time;
          
          // Strand 1
          const x1 = currentCenterX + Math.sin(angle) * helixWidth;
          const z1 = Math.cos(angle); 
          const size1 = (z1 + 2) * 1.5;
          const opacity1 = (z1 + 1) / 2 * 0.3 + 0.05;
          
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity1})`;
          ctx.beginPath();
          ctx.arc(x1, adjustedY, size1, 0, Math.PI * 2);
          ctx.fill();

          // Strand 2
          const x2 = currentCenterX + Math.sin(angle + Math.PI) * helixWidth;
          const z2 = Math.cos(angle + Math.PI);
          const size2 = (z2 + 2) * 1.5;
          const opacity2 = (z2 + 1) / 2 * 0.3 + 0.05;

          ctx.fillStyle = `rgba(168, 85, 247, ${opacity2})`;
          ctx.beginPath();
          ctx.arc(x2, adjustedY, size2, 0, Math.PI * 2);
          ctx.fill();

          // Connecting Base Pairs
          if (y % (dotSpacing * 2) === 0) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(opacity1, opacity2) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, adjustedY);
            ctx.lineTo(x2, adjustedY);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="fixed inset-0 -z-10 pointer-events-none opacity-60"
    />
  );
};

export default ParticleBackground;
