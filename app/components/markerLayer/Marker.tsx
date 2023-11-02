import { CanvasSettingsContext } from "@/app/canvasEditor/CanvasContext";
import { MousePositionContext } from "@/app/canvasEditor/page";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";
import { useState, useContext, useEffect } from "react";

type MarkerProps = {
 
  topLeftOffset:Vector2
 
};

const Marker: React.FC<MarkerProps> = ({ topLeftOffset }) => {
  const mousePosition = useContext(MousePositionContext) || { x: 0, y: 0 };
  const { settings } = useContext(CanvasSettingsContext);
  const [currentPosition, setCurrentPosition] = useState<Vector2>({ x: mousePosition.x, y: mousePosition.y });
  const [markerColor, setMarkerColor] = useState<Color>(settings.color);
  const [isDragged, setIsDragged] = useState<Boolean>(false);

  const markerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${currentPosition.x}px`,
    top: `${currentPosition.y}px`,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: markerColor,
    transform: 'translate(-50%, -50%)',
    cursor: 'grab',
  };

  const setInitialPosition = ( ) => {
    console.log(mousePosition.x, topLeftOffset.x,
       mousePosition.y , topLeftOffset.y)
    const initialPosition = {
      x:mousePosition.x - topLeftOffset.x,
      y:mousePosition.y - topLeftOffset.y,
    };
    setCurrentPosition(initialPosition);
  };

  useEffect(() => {
    setInitialPosition()
  }, [ ]); // Dependency on topLeftOffset to re-run the effect when it changes

  const handleMouseDown = (e: React.MouseEvent) => {
    // Also, call the updatePosition function to inform the parent about the drag
    setIsDragged(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(isDragged);
    if (isDragged) {
      const updatedPosition = {
        x: e.clientX - topLeftOffset.x,
        y: e.clientY - topLeftOffset.y,
      };
      console.log('Dragging...', updatedPosition);
      setCurrentPosition(updatedPosition);
      // updateMarkerPosition({ color, updatedPosition, isDragging: true });
    }
  };

  const handleMouseUp = () => {
    setIsDragged(false);
  };

  return (
    <div
      style={markerStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></div>
  );
};

export default Marker;