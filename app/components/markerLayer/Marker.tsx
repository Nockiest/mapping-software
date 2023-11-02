import { Vector2 } from '@/public/types/GeometryTypes';
import { Color } from '@/public/types/OtherTypes';
import React from 'react';


interface MarkerProps {
    color: Color;
    position: Vector2
  }
  
  const Marker: React.FC<MarkerProps> = ({ color, position }) => {
    const markerStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: '20px', // Adjust as needed
      height: '20px', // Adjust as needed
      borderRadius: '50%',
      backgroundColor: color,
      transform: 'translate(-50%, -50%)', // Center the marker at the specified position
    };
  
    return <div style={markerStyle}></div>;
  };
  export default Marker;