import { useGlobalValue } from "@/app/canvasEditor/CanvasContext";
import { Vector2, Shapes } from "@/public/types/GeometryTypes";
import { LayerNames } from "@/public/types/OtherTypes";
import { followMouseComponent } from "@/app/components/utility/utils";
import { useEffect, useState, ReactNode } from "react";
type PointProps = {
  position: Vector2;
  id: string;
  topLeft?: Vector2;
  radius?: number;
  leftClk?: (() => void) | null;
  rightClk?: ((e: React.MouseEvent) => void) | null;
  mouseWheelClk?: ((e: React.MouseEvent) => void) | null;
  styling?: React.CSSProperties;
  onDrag?: (position: Vector2) => void;
  onDelete?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  shape?: Omit<Shapes, "triangle">;
  dragable?: boolean;
  acceptInput?: boolean;
  className?: string
};
const Point: React.FC<PointProps> = ({
  position,
  id,
  topLeft = { x: 0, y: 0 },
  radius = 15,
  leftClk,
  rightClk,
  mouseWheelClk,
  styling = {},
  onDrag,
  onDelete,
  children,
  shape,
  dragable = true,
  acceptInput = true,
  className,
  // backgroundImage
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { GlobalData } = useGlobalValue();
  const { mouseDownTime } = GlobalData;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMouseUp(e);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!acceptInput) {
      return;
    }
    if (e.button === 0 && leftClk) {
      leftClk();
    } else if (e.button === 1 && mouseWheelClk) {
      mouseWheelClk(e);
    } else if (e.button === 2 && rightClk) {
      rightClk(e);
    }
    console.log("SET IS DRAGGING");
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!acceptInput || !isDragging || !dragable) {
      console.log("NOT ACCEPTING INPUT", !acceptInput, !isDragging, !dragable);
      return;
    }
    const newX = e.clientX - topLeft.x + window.scrollX;
    const newY = e.clientY - topLeft.y + window.scrollY;

    onDrag?.({ x: newX, y: newY });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);
    console.log("HANDLING MOUSE UP", mouseDownTime, e.button === 2, mouseDownTime > 1000);
    // Check if right mouse button was pressed and duration is more than  500ms
    if (mouseDownTime && e.button === 2 && mouseDownTime > 500) {
      // Trigger onDelete method
      console.log("HANDLING DELETE");
      onDelete?.(e);
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderRadius: "50%",
        background: "blue",
        cursor: "pointer",
        opacity: acceptInput ? "1" : "0.4",
        ...styling,
      }}
      className={className}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
    >
      {children}
    </div>
  );
};

export default Point;

