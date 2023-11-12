import { useGlobalValue } from "@/app/canvasEditor/CanvasContext";
import { Vector2, Shapes } from "@/public/types/GeometryTypes";
import { LayerNames } from "@/public/types/OtherTypes";
import { followMouseComponent } from "@/public/utils";
import { useEffect, useState, ReactNode } from "react";
type PointProps = {
  position: Vector2;

  topLeft?: Vector2;
  radius?: number;
  leftClk?: (() => void) | null;
  rightClk?: ((e: React.MouseEvent) => void) | null;
  mouseWheelClk?: (() => void) | null;
  styling?: React.CSSProperties;
  onDrag?: (position: Vector2) => void;
  onDelete?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  shape?: Omit<Shapes, "triangle">;
  dragable?: boolean;
  acceptInput?: boolean;
};
 
const Point: React.FC<PointProps> = ({
  position,
  topLeft = { x: 0, y: 0 },
  radius = 15,
  leftClk,
  rightClk,
  mouseWheelClk,
  styling = {},
onDrag ,//= followMouseComponent,
  onDelete,
  children,
  shape,
  dragable = true,
  acceptInput = true,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { GlobalData } = useGlobalValue();
  const { mouseDownTime } = GlobalData;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!acceptInput) {
      console.log("NOT ACCEPTING INPUT");
      return;
    }
    if (e.button === 0 && leftClk) {
      leftClk();
    } else if (e.button === 1 && mouseWheelClk) {
      mouseWheelClk();
    } else if (e.button === 2 && rightClk) {
      rightClk(e);
    }
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!acceptInput || !isDragging || !dragable) {
      console.log("NOT ACCEPTING INPUT", !acceptInput, !isDragging, !dragable);
      return;
    }
    const newX = e.clientX - topLeft.x + window.scrollX;
    const newY = e.clientY - topLeft.y + window.scrollY;

    onDrag?.({x:newX,y:newY});
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(false);
    // Check if right mouse button was pressed and duration is more than 1500ms
    if (mouseDownTime &&  e.button === 2 &&  mouseDownTime  > 1000) {
      // Trigger onDelete method
      onDelete?.(e);
    }
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
  }, [isDragging  ]);

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
        opacity: acceptInput ? "1" : "0.4",
        ...styling,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

 
export default Point;
 
