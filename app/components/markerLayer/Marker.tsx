import { Vector2 } from '@/public/types/GeometryTypes';
import { Color } from '@/public/types/OtherTypes';
import {useState} from 'react';


type MarkerProps = {
    color: string;
    position: { x: number; y: number };
    // isDragging: boolean;
    draggingMarker:any;
    setDraggingMarker: () => void;
    updateMarkerPosition: (marker: Marker) => void; // Define the prop
  };
 
  
  const Marker: React.FC<MarkerProps> = ({ color,  draggingMarker, setDraggingMarker, updateMarkerPosition }) => {
    // const [isDragging, setIsDragging] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<Vector2>({x:0,y:0})
    const markerStyle: React.CSSProperties = {
      position: "absolute",
      left: `${currentPosition.x}px`,
      top: `${currentPosition.y}px`,
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: color,
      transform: "translate(-50%, -50%)",
      cursor: "grab", // Set cursor to indicate draggable
    };
  
    const handleMouseDown = (e: React.MouseEvent) => {
        // Also, call the updatePosition function to inform the parent about the drag
        setDraggingMarker(self)
      };
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      console.log(draggingMarker)
      if (draggingMarker === self) {
        // Update marker position while dragging
        // You may want to adjust this based on the mouse movement
        // For simplicity, I'm updating the position based on the mouse coordinates
        const updatedPosition = {
          x: e.clientX,
          y: e.clientY,
        };
        console.log("Dragging...", updatedPosition);
        setCurrentPosition({x,y})
        // updateMarkerPosition({ color, updatedPosition, isDragging: true });
      }
    };
  
    // const handleMouseUp = () => {
    //   setIsDragging(false);
    // };
  
    return (
      <div
        style={markerStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
      ></div>
    );
  };
  
  export default Marker;