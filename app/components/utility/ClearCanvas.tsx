import React from 'react';

type CanvasClearProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

const CanvasClear: React.FC<CanvasClearProps> = ({ canvasRef }) => {
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <button onClick={clearCanvas}>
      Clear Canvas
    </button>
  );
};

export default CanvasClear;