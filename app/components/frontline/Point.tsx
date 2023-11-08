import { Vector2, Shapes } from "@/public/types/GeometryTypes";
import { LayerNames } from "@/public/types/OtherTypes";
import { followMouseComponent } from "@/public/utils";
import { useEffect, useState, ReactNode } from "react";

 
export type PointProps = {
    position: Vector2;
    topLeft?: Vector2;
    radius?: number;
    leftClk?: () => void|null;
    rightClk?: (e: React.MouseEvent) => void|null;
    mouseWheelClk?: () => void|null;
    styling?: React.CSSProperties;
    onDrag?: (position: Vector2) => void;
    onDelete?: () => void;
    children: React.ReactNode;
    shape: Omit<Shapes, "triangle">;
    dragable?: boolean
};
const Point: React.FC <PointProps> = ({
    position,
    topLeft = {x:0,y:0},
    radius = 15,
    leftClk,
    rightClk,
    mouseWheelClk,
    styling= {},  
    onDrag = followMouseComponent,
    onDelete,  
    children,
    shape,
    dragable = true,

  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [rightMouseDownTime, setRightMouseDownTime] = useState<number | null>(null);
  
    const handleMouseDown = (e: React.MouseEvent) => {
      if (e.button == 0 && leftClk){ 
        leftClk( )
      } else if   (e.button === 1 && mouseWheelClk) {
        // setRightMouseDownTime(Date.now());
        mouseWheelClk( )
      }  else if   (e.button === 2 && rightClk) {
        rightClk( e); // You can directly pass the component
        setRightMouseDownTime(Date.now());
      }  
      setIsDragging(true);
    };
  
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !dragable) return  
        const newX = e.clientX - topLeft.x + window.scrollX;
        const newY = e.clientY - topLeft.y + window.scrollY;
        
        // Calculate the new position with the center as the clicked point
        const adjustedPosition = {
            x:   newX - radius, // Adjusted for half of the width
            y:   newY - radius, // Adjusted for half of the height
        };
        console.log(e.clientX , topLeft.x , window.scrollX)
        console.log(adjustedPosition  )

        onDrag?.(adjustedPosition);
      
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

      > {children} </ div>
    );
  };
  
  export default Point;