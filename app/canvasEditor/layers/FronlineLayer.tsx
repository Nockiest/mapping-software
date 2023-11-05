import React, {useContext, useState, useEffect} from 'react'
import { MousePositionContext } from '../page'
import { Vector2 } from '@/public/types/GeometryTypes';
import { settings } from '../Signals';
import { useCanvas } from '../CanvasContext';
import Point from '@/app/components/frontline/linePoint';
 
const FrontlineLayer = () => {
  const mousePosition = useContext(MousePositionContext);
  const { forntlineCanvasRef } = useCanvas();
  const [points, setPoints] = useState<Vector2[]>([]);
  const [topLeft, setTopLeft] = useState<Vector2>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = forntlineCanvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (rect) {
      setTopLeft({ x: rect.left, y: rect.top });
    }
  }, [forntlineCanvasRef, settings.value.activeLayer]);

  useEffect(() => {
    const canvas = forntlineCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) {
        return
    }
    if (settings.value.activeLayer === 'frontLine' && mousePosition) {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas?.width!, canvas?.height!);

      // Draw lines
      if (points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx?.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = 'blue'; // Change color as needed
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }, [mousePosition, settings.value.activeLayer, forntlineCanvasRef, points]);

  const handleRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (settings.value.activeLayer === 'frontLine') {
      const rect = forntlineCanvasRef.current?.getBoundingClientRect();
      const x = e.clientX - rect!.left;
      const y = e.clientY - rect!.top;
      setPoints((prevPoints) => [...prevPoints, { x, y }]);
    }
  };

  const handlePointDrag = (index: number, newPosition: Vector2) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      newPoints[index] = newPosition;
      return newPoints;
    });
  };

  return (
    <div className="absolute top-0" onContextMenu={(e) => e.preventDefault()}>
      <canvas
        width={800}
        height={600}
        className="border-2 canvas-rectangle"
        ref={forntlineCanvasRef}
        style={{
          pointerEvents: settings.value.activeLayer === 'frontLine' ? 'auto' : 'none',
          opacity: settings.value.activeLayer === 'frontLine' ? '1' : '0.4',
        }}
        onContextMenu={handleRightClick}
      />
      {points.map((point, index) => (
        <Point
          key={index}
          position={point}
          topLeft={topLeft} // Pass the topLeft position
          onDrag={(newPosition) => handlePointDrag(index, newPosition)}
        />
      ))}
    </div>
  );
};

export default FrontlineLayer;