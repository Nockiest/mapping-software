import { useGlobalValue } from "@/app/canvasEditor/CanvasContext";
import { Vector2, Shapes } from "@/public/types/GeometryTypes";
import { LayerNames } from "@/public/types/OtherTypes";
import { followMouseComponent } from "@/app/components/utility/utils";
import { useEffect, useState, ReactNode, useContext } from "react";
import { editorTopLeftPosition, settings } from "@/app/canvasEditor/Signals";
import { Signal } from "@preact/signals";
import { movePosByOffset } from "../utility/CanvasUtils";
// import { MousePositionContext } from "@/app/canvasEditor/MouseContext";
type PointProps = {
  pointTopLeftPosition: Vector2;
  id: string;
  topLeft?: Vector2;
  radius?: number;
  leftClk?: (() => void) | null;
  rightClk?: ((e: React.MouseEvent) => void) | null;
  mouseWheelClk?: ((e: React.MouseEvent) => void) | null;
  styling?: React.CSSProperties;
  onDrag?: (position: Vector2) => void;
  onDelete?: (e: MouseEvent | React.MouseEvent) => void;
  children?: React.ReactNode;
  shape?: Omit<Shapes, "triangle">;
  dragable?: boolean;
  acceptInput?: boolean;
  className?: string;
};
const Point: React.FC<PointProps> = ({
  pointTopLeftPosition,
  id,
  topLeft = editorTopLeftPosition.value,
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
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { GlobalData } = useGlobalValue();
  const { mousePosition, mouseDownTime } = GlobalData;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMouseUp(e);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log("handle mouse down");
    e.preventDefault();
    if (!acceptInput) {
      return;
    }
    if (e.button === 0 && leftClk) {
      leftClk();
      console.log("left clk");
    } else if (e.button === 1 && mouseWheelClk) {
      mouseWheelClk(e);
    } else if (e.button === 2 && rightClk) {
      rightClk(e);
    }
    console.log("SET IS DRAGGING");
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!acceptInput || !isDragging || !dragable || !mousePosition) {
      console.log("NOT ACCEPTING INPUT", !acceptInput, !isDragging, !dragable);
      return;
    }

    const newTopLeftPosition = followMouseComponent(
      { x: e.clientX, y: e.clientY },
      true,
      settings.value.canvasSize,
      topLeft
    );
    const newPosition = movePosByOffset(newTopLeftPosition,  -radius  );

    onDrag?.(newPosition);
  };

  const handleMouseUp = (e: MouseEvent | React.MouseEvent) => {
    setIsDragging(false);
    console.log(
      "HANDLING MOUSE UP",
      mouseDownTime,
      e.button === 2,
      mouseDownTime > 1000
    );
    // Check if right mouse button was pressed and duration is more than  500ms
    if (mouseDownTime && e.button === 2 && mouseDownTime > 500) {
      // Trigger onDelete method
      console.log("HANDLING DELETE");
      onDelete?.(e);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      // window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${pointTopLeftPosition.x}px`,
        top: `${pointTopLeftPosition.y}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderRadius: "50%",
        backgroundColor: "blue",
        cursor: "pointer",
        opacity: acceptInput ? "1" : "0.4",
        ...styling,
      }}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}

      onContextMenu={handleContextMenu}
    >
      {children}
    </div>
  );
};

export default Point;
