"use client"
import React, { useRef, useEffect, useState } from 'react';
import CanvasToImage from '../components/CanvasToImg';
import eraseInRadius from '../components/Eraser';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const handleMouseDown = (e) => {
      if (e.button === 2) {
        // Right mouse button is pressed, use EraseInRadius
        const x = e.offsetX;
        const y = e.offsetY;
        eraseInRadius({ canvasRef, position: { x, y }, radius: 10 });
      } else {
        // Left mouse button is pressed, start drawing
        setIsDrawing(true);
        const x = e.offsetX;
        const y = e.offsetY;
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      }
    };

    const handleMouseMove = (e) => {
      if (!isDrawing || !ctx) return;

      const x = e.offsetX;
      const y = e.offsetY;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      if (ctx) {
        ctx.closePath();
      }
    };

    const handleMouseLeave = () => {
      setIsDrawing(false);
      if (ctx) {
        ctx.closePath();
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDrawing]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: '1px solid #000' }}
        onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
      />
      <CanvasToImage canvasRef={canvasRef} />
    </div>
  );
};

export default DrawingCanvas;