import { Vector2, Shapes } from "@/public/types/GeometryTypes";
import { LayerNames } from "@/public/types/OtherTypes";
import { followMouseComponent } from "@/public/utils";
import { useEffect, useState, ReactNode } from "react";

 
export type PointProps = {
  position: Vector2;

  topLeft?: Vector2;
  radius?: number;
  leftClk?: (() => void) | null;
  rightClk?: ((e: React.MouseEvent) => void) | null;
  mouseWheelClk?: (() => void) | null;
  styling?: React.CSSProperties;
  onDrag?: (position: Vector2) => void;
  onDelete?: () => void;
  children?: React.ReactNode;
  shape?: Omit<Shapes, "triangle">;
  dragable?: boolean;
  acceptInput: boolean;
  label?: string;
};

const Point: React.FC<PointProps> = ({
  position,
  topLeft = { x: 0, y: 0 },
  radius = 15,
  leftClk,
  rightClk,
  mouseWheelClk,
  styling = {},
  onDrag = followMouseComponent,
  onDelete,
  children,
  shape,
  dragable = true,
  acceptInput = true,
  label,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rightMouseDownTime, setRightMouseDownTime] = useState<number | null>(null);

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
      setRightMouseDownTime(Date.now());
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

    const adjustedPosition = {
      x: newX - radius,
      y: newY - radius,
    };

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
        opacity: acceptInput ? "0.4" : "1",
        ...styling,
      }}
      onMouseDown={handleMouseDown}
    >
      {label}
    </div>
  );
};

export default Point;
