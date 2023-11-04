// import { CanvasSettingsContext } from "@/app/canvasEditor/CanvasContext";
import { MousePositionContext } from "@/app/canvasEditor/page";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";
import { useState, useContext, useEffect,useRef } from "react";
import { settings } from "@/app/canvasEditor/Signals";
import Image from "next/image";
type MarkerProps = {
 
  topLeftOffset:Vector2
  initialPosition:Vector2
  canvasSize: Vector2
};

const Marker: React.FC<MarkerProps> = ({ topLeftOffset, initialPosition, canvasSize }) => {
  const mousePosition = useContext(MousePositionContext) || { x: 0, y: 0 };
  const [currentPosition, setCurrentPosition] = useState<Vector2>(initialPosition);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [canRemove, setCanRemove] = useState(false);
  
 
  // Store the initial settings locally in the Marker component
  const initialMarkerSettings = useRef(settings.value.markerSettings);
 
  const imageUrl = initialMarkerSettings.current.image instanceof File
  ? URL.createObjectURL(initialMarkerSettings.current.image)
  : initialMarkerSettings.current.image;

  const markerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${currentPosition.x}px`,
    top: `${currentPosition.y}px`,
    width: `${initialMarkerSettings.current.width}px`,
    height: `${initialMarkerSettings.current.width}px`,
    fontSize: `${initialMarkerSettings.current.width / 2}px`,
    borderRadius: '50%',
    border: "1px solid black",
    backgroundColor: initialMarkerSettings.current.color,
    // backgroundImage: `url(${settings.value.image})`, // Set the background image
    // backgroundSize: 'cover', // Adjust the background size as needed
    transform: 'translate(-50%, -50%)',
    cursor: 'grab',
    userSelect: 'none',
    zIndex: isDragged ?   10 : 1
  };

  const textBackgroundStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '5px',
    borderRadius: '5px',
    userSelect: 'none',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    borderRadius: '50%', // Match the marker's border radius
  };

  const handleMouseDown = () => {
    setIsDragged(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragged) {
      // Calculate updated position
      const updatedPosition = {
        x: Math.min(Math.max(e.clientX - topLeftOffset.x + window.scrollX, 0), canvasSize.x),
        y: Math.min(Math.max(e.clientY - topLeftOffset.y + window.scrollY, 0), canvasSize.y),
      };

      setCurrentPosition(updatedPosition);
    }
  };

  const handleMouseUp = () => {  
    setIsDragged(false);
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the default context menu

    // Check if the marker is loaded before allowing destruction
    if (canRemove) {
      // Call the onDestroy callback to remove the marker from the parent component
      const markerElement = e.currentTarget as HTMLDivElement;
      markerElement.remove();
      // Log a message to the console
      console.log('Marker destroyed!');
    }
    setCanRemove(true)
  };
  return (
    <div
      style={markerStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      <p style={{ ...textBackgroundStyle, top: '-10px' }}>
        {initialMarkerSettings.current.topValue}
      </p>
      {initialMarkerSettings.current.width > 20 && (
        <>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {initialMarkerSettings.current.image&& <Image
              src={imageUrl}
              alt="Marker Image"
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
            />}
          </div>
          <p style={{ ...textBackgroundStyle, bottom: '-10px' }}>
            {initialMarkerSettings.current.bottomValue}
          </p>
        </>
      )}
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
