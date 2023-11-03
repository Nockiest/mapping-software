// import { CanvasSettingsContext } from "@/app/canvasEditor/CanvasContext";
import { MousePositionContext } from "@/app/canvasEditor/page";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";
import { useState, useContext, useEffect,useRef } from "react";
import { settings } from "@/app/canvasEditor/StoredSettingsValues";
type MarkerProps = {
 
  topLeftOffset:Vector2
  initialPosition:Vector2
};

const Marker: React.FC<MarkerProps> = ({ topLeftOffset, initialPosition }) => {
  const mousePosition = useContext(MousePositionContext) || { x: 0, y: 0 };
  const [currentPosition, setCurrentPosition] = useState<Vector2>(initialPosition);
  const [isDragged, setIsDragged] = useState<boolean>(false);

  // Store the initial settings locally in the Marker component
  const initialMarkerSettings = useRef(settings.value.markerSettings);
  useEffect(() => {
    console.log('Initial Marker Settings:', initialMarkerSettings.current);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  const markerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${currentPosition.x}px`,
    top: `${currentPosition.y}px`,
    width: `${initialMarkerSettings.current.width}px`,
    height: `${initialMarkerSettings.current.width}px`,
    borderRadius: '50%',
    backgroundColor: initialMarkerSettings.current.color,
    transform: 'translate(-50%, -50%)',
    cursor: 'grab',
  };

  const textBackgroundStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '5px',
    borderRadius: '5px',
  };

  const handleMouseDown = () => {
    setIsDragged(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragged) {
      const updatedPosition = {
        x: e.clientX - topLeftOffset.x,
        y: e.clientY - topLeftOffset.y,
      };
      setCurrentPosition(updatedPosition);
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
    >
      <p style={{ ...textBackgroundStyle, top: '-10px' }}>
        {initialMarkerSettings.current.topValue}
      </p>
      <p style={{ ...textBackgroundStyle, bottom: '-10px' }}>
        {initialMarkerSettings.current.bottomValue}
      </p>
    </div>
  );
};

export default Marker;
 /// set initial position
  // useEffect(() => {
  //   const initialPosition = {
  //     x:mousePosition.x - topLeftOffset.x,
  //     y:mousePosition.y - topLeftOffset.y,
  //   };
  //   // setCurrentPosition(initialPosition);
  // }, [ ]); // Dependency on topLeftOffset to re-run the effect when it changes
