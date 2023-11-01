"use client"
import  { useState,useEffect ,useContext} from 'react';
import Marker from '@/app/components/markerLayer/Marker'; // Adjust the import path as needed
import { CanvasSettingsContext, CanvasContext } from '../CanvasContext';

const UnitMarkerLayer: React.FC = () => {
  const [markers, setMarkers] = useState<{ color: string; position: { x: number; y: number } }[]>([]);
  const { settings } = useContext(CanvasSettingsContext);
  const { markerCanvasRef } = useContext(CanvasContext);

  useEffect(() => {
    if (!markerCanvasRef) {
      return;
    }

    const canvas = markerCanvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (settings.activeLayer !== "marker") {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Assuming you have a color defined somewhere
      const newMarker = { color: '#ff0000', position: { x, y } };

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };

    // Add event listener
    if (settings.activeLayer === "marker") {
      canvas.addEventListener("mousedown", handleMouseDown);
    }

    // Remove event listener on component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [markerCanvasRef, settings]);

  return (
    <>
      <canvas
        width={800}
        height={600}
        className="absolute border-2 top-10 z-100"
        ref={markerCanvasRef}
        onContextMenu={(e) => e.preventDefault()}
        style={{ pointerEvents: 'auto' }}
      />
      {markers.map((marker, index) => (
        <Marker key={index} color={marker.color} position={marker.position} />
      ))}
    </>
  );
};

export default UnitMarkerLayer;