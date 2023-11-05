import { Vector2 } from "@/public/types/GeometryTypes";
import { useEffect, useState } from "react";

const Point: React.FC<{ position: Vector2; onDrag?: (position: Vector2) => void; topLeft: Vector2 }> = ({
    position,
    onDrag,
    topLeft,
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<Vector2 | null>(null);
  
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    };
  
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragStart) {
        const deltaX = e.clientX - dragStart.x + window.scrollX;
        const deltaY = e.clientY - dragStart.y + window.scrollY;
  
        // Calculate the new position with the center as the clicked point
        const adjustedPosition = {
          x: position.x + deltaX - 5, // Adjusted for half of the width
          y: position.y + deltaY - 5, // Adjusted for half of the height
        };
  
        onDrag?.(adjustedPosition);
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
      setDragStart(null);
    };
  
    useEffect(() => {
      if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      }
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, handleMouseMove, handleMouseUp]);
  
    return (
      <div
        style={{
          position: 'absolute',
          left: `${position.x - 5}px`, // Adjusted for half of the width
          top: `${position.y - 5}px`, // Adjusted for half of the height
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'blue',
          cursor: 'pointer',
        }}
        onMouseDown={handleMouseDown}
      />
    );
  };
  
  export default Point;