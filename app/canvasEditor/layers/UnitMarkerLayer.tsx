"use client"
import  { useState,useEffect ,useContext} from 'react';
import Marker from '@/app/components/markerLayer/Marker'; // Adjust the import path as needed
import { CanvasSettingsContext, CanvasContext } from '../CanvasContext';
import { Color } from '@/public/types/OtherTypes';

const UnitMarkerLayer: React.FC = () => {
  const [markers, setMarkers] = useState<{ color: string; position: { x: number; y: number } }[]>([]);
  const [draggingMarker, setDraggingMarker] = useState<number | null>(null);
  const { settings } = useContext(CanvasSettingsContext);
  const { markerCanvasRef } = useContext(CanvasContext);

  useEffect(() => {
    if (!markerCanvasRef) {
      return;
    }

    const canvas = markerCanvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (settings.activeLayer !== 'marker') {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (e.button === 2) {
        // Right mouse button is pressed, find if we are clicking on a marker
        const clickedMarker = markers.findIndex(
          (marker) => Math.abs(marker.position.x - x) < 10 && Math.abs(marker.position.y - y) < 10
        );

        if (clickedMarker !== -1) {
          setDraggingMarker(clickedMarker);
        } else {
          // Assuming you have a color defined somewhere
          const newMarker = { color: '#ff0000', position: { x, y } };
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (draggingMarker !== null) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMarkers((prevMarkers) =>
          prevMarkers.map((marker, index) =>
            index === draggingMarker ? { ...marker, position: { x, y } } : marker
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDraggingMarker(null);
    };

    // Add event listeners
    if (settings.activeLayer === 'marker') {
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
    }

    // Remove event listeners on component unmount
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [markerCanvasRef, markers, draggingMarker, settings]);

  return (
    <div className="absolute top-10 z-100">
      <canvas
        width={800}
        height={600}
        className="border-2 canvas-rectangle"
        ref={markerCanvasRef}
        onContextMenu={(e) => e.preventDefault()}
        style={{ pointerEvents: 'auto' }}
      />
      {markers.map((marker, index) => (
        <Marker key={index} color={marker.color} position={marker.position} />
      ))}
    </div>
  );
};

export default UnitMarkerLayer;