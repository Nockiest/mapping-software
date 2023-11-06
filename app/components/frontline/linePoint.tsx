import { Vector2 } from "@/public/types/GeometryTypes";
import { useEffect, useState } from "react";


export type PointProps =  { 
    position: Vector2;
    topLeft?: Vector2;
    radius?: number;
    leftClk?: ()=> void;
    rightClk?: ()=> void;
    mouseWheelClk?: ()=> void;
    styling?: {
        [key: string]: string; // Allow any CSS property
      };   // Optional styling prop
      onDrag?: (position: Vector2) => void; 
    onDelete?: ()=> void // Callback for deletion

}
const Point: React.FC <PointProps> = ({
    position,
    topLeft = {x:0,y:0},
    radius = 15,
    leftClk,
    rightClk,
    mouseWheelClk,
    styling= {}, // Optional styling prop
    onDrag,
    onDelete // Callback for deletion
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [rightMouseDownTime, setRightMouseDownTime] = useState<number | null>(null);
  
    const handleMouseDown = (e: React.MouseEvent) => {
    //   e.preventDefault();
      if (e.button != 0){ return}
      setIsDragging(true);
    //   setDragStart({ x: e.clientX, y: e.clientY });
    };
  
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging   ) {
        console.log(e.clientX , topLeft.x , window.scrollX)
        const deltaX = e.clientX - topLeft.x + window.scrollX;
        const deltaY = e.clientY - topLeft.y + window.scrollY;
      //   const newPosition = { x: position.x + deltaX, y: position.y + deltaY };
  
        
        // Calculate the new position with the center as the clicked point
        const adjustedPosition = {
          x:   deltaX - 5, // Adjusted for half of the width
          y:   deltaY - 5, // Adjusted for half of the height
        };
        console.log(adjustedPosition.x, e.clientX, topLeft.x)
  
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
          ...styling
        }}
        onMouseDown={handleMouseDown}
      />
    );
  };
  
  export default Point;