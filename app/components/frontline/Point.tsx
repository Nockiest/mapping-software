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
  centerPosition: Vector2;
  id: string;
  topLeft?: Vector2;
  radius?: number;
  leftClk?: (() => void) | null;
  rightClk?: ((e: React.MouseEvent) => void) | null;
  mouseWheelClk?: ((e: React.MouseEvent) => void) | null;
  styling?: React.CSSProperties;
  onDrag?: (position: Vector2) => void;
  onLeftBtnPress?: (e: MouseEvent | React.MouseEvent) => void;
  onRightBtnPress?: (e: MouseEvent | React.MouseEvent) => void;
  children?: React.ReactNode;
  shape?: Omit<Shapes, "triangle">;
  dragable?: boolean;
  acceptInput?: boolean;
  className?: string;
};
const Point: React.FC<PointProps> = ({
  centerPosition,
  id,
  topLeft = editorTopLeftPosition.value,
  radius = 15,
  leftClk,
  rightClk,
  mouseWheelClk,
  styling = {},
  onDrag,
  onLeftBtnPress,
  onRightBtnPress,
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
      return;
    }

    // Check if the left (bit position 0) or right (bit position 1) mouse button is pressed
    if ((e.buttons & 1) !== 0   ) {
      const newCenterPosition= followMouseComponent(
        { x: e.clientX, y: e.clientY },
        true,
        settings.value.canvasSize,
        topLeft
      );
      // const newPosition = movePosByOffset(newTopLeftPosition, -radius);
        // console.log('handling on drag', newPosition, isDragging)
        onDrag?.(newCenterPosition);


    }
  };



  const handleMouseUp = (e: React.MouseEvent|MouseEvent  ) => {
    setIsDragging(false);
    if (isDragging){
      console.log('reverting is drawing')
    }
    console.log(
      "HANDLING MOUSE UP",
      mouseDownTime,
      e.button === 2,
      mouseDownTime > 1000
    );
    // Check if right mouse button was pressed and duration is more than  500ms
    if (mouseDownTime &&   mouseDownTime > 500) {
      // Trigger onDelete method
      console.log("HANDLING DELETE");
      if (e.button === 1) {
        onLeftBtnPress?.(e)
      } else if ( e.button === 2 ) {
        onRightBtnPress?.(e);
      }

    }
  };

  useEffect(() => {

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${centerPosition.x - radius  }px`,
        top: `${centerPosition.y - radius  }px`,
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
      {/* <p className="text-white z-50">{Math.round(centerPosition.x ) } {Math.round(centerPosition.y )}</p>
      <p className="text-black z-50">{Math.round(centerPosition.x - radius ) } {Math.round(centerPosition.y - radius )}</p> */}
    </div>
  );
};

export default Point;
