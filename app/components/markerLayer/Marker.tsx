import { CanvasSettingsContext } from "@/app/canvasEditor/CanvasContext";
import { MousePositionContext } from "@/app/canvasEditor/page";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";
import { useState, useContext, useEffect } from "react";

type MarkerProps = {
 
  topLeftOffset:Vector2
  initialPosition:Vector2
};

const Marker: React.FC<MarkerProps> = ({ topLeftOffset, initialPosition }) => {
  const { settings } = useContext(CanvasSettingsContext);
  const mousePosition = useContext(MousePositionContext) || { x: 0, y: 0 };
  const [currentPosition, setCurrentPosition] = useState<Vector2>(initialPosition);
  const [isDragged, setIsDragged] = useState<boolean>(false);

  const markerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${currentPosition.x}px`,
    top: `${currentPosition.y}px`,
    width: `${settings.markerSettings.width}px`, // Use marker width from settings
    height: `${settings.markerSettings.width}px`, // Assuming width and height are the same
    borderRadius: '50%',
    backgroundColor: settings.markerSettings.color, // Use marker color from settings
    transform: 'translate(-50%, -50%)',
    cursor: 'grab',
  };

  const textBackgroundStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the background color and opacity as needed
    padding: '5px', // Adjust the padding as needed
    borderRadius: '5px', // Adjust the border-radius as needed
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
        {settings.markerSettings.topValue}
      </p>
      <p style={{ ...textBackgroundStyle, bottom: '-10px' }}>
        {settings.markerSettings.bottomValue}
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
