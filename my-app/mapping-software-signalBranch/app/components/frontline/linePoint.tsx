import { Vector2 } from "@/public/types/GeometryTypes";
import { ReactNode, useEffect, useState } from "react";

type PointProps = {
   position: Vector2;
    onDrag?: (position: Vector2) => void; 
    topLeft: Vector2 ;
    radius: number;
    leftClk?: (self: ReactNode) => void ;
    rightClk?: (self: ReactNode) => void;
    mouseWheelClk?: (self: ReactNode) => void;
    styling? 
    onDelete?: (self: ReactNode) => void;
 }

 const Point: React.FC<PointProps & { onDelete?: () => void }> = ({
  position,
  onDrag,
  topLeft,
  radius = 15,
  leftClk,
  rightClk,
  mouseWheelClk,
  styling, // Optional styling prop
  onDelete // Callback for deletion
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rightMouseDownTime, setRightMouseDownTime] = useState<number | null>(null);
 

 

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default context menu
    if (e.button === 0) {
      // Left click
      setIsDragging(true);
      if (leftClk) {
        leftClk(this); // You can directly pass the component
      }
    } else if (e.button === 1 && mouseWheelClk) {
      mouseWheelClk(this);
    } else if (e.button === 2) {
      // Right click
      if (rightClk) {
        const adjustedPosition = {
          x: position.x - radius,
          y: position.y - radius
        };
        rightClk(this); // You can directly pass the component
      } else {
        setRightMouseDownTime(Date.now());
      }
      
 
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - topLeft.x + window.scrollX;
      const deltaY = e.clientY - topLeft.y + window.scrollY;

      // Calculate the new position with the center as the clicked point
      const adjustedPosition = {
        x: deltaX - radius,
        y: deltaY - radius
      };

      onDrag?.(adjustedPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setRightMouseDownTime(null);
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

  useEffect(() => {
    if (rightMouseDownTime) {
      const checkHoldDuration = () => {
        const currentTime = Date.now();
        const holdDuration = currentTime - rightMouseDownTime;

        if (holdDuration >= 1000) {
          // If the hold duration exceeds 1 second, trigger deletion
          onDelete?.();
          setRightMouseDownTime(null);
        }
      };

      const intervalId = setInterval(checkHoldDuration, 100);
      return () => clearInterval(intervalId);
    }
  }, [rightMouseDownTime, onDelete]);

 

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x - radius}px`,
        top: `${position.y - radius}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderRadius: '50%',
        background: 'blue',
        cursor: 'pointer',
        ...styling // Apply optional styling
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Point

 