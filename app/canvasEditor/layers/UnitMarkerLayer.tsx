"use client"
import { useState, useEffect, useContext, useReducer } from 'react';
import Marker from '@/app/components/markerLayer/Marker'; // Adjust the import path as needed
import { CanvasSettingsContext, CanvasContext } from '../CanvasContext';
import { Color } from '@/public/types/OtherTypes';
import { Vector2 } from '@/public/types/GeometryTypes';
import { settings } from '../StoredSettingsValues';
enum MarkerLayerState {
  Idle,
  Dragging,
  EditingMarker,
}

// type MarkerType = {
//   color: Color;
//   position: Vector2;
//   isDragging: boolean;
// };

type MarkerLayerAction =
  | { type: 'DRAG'; markerIndex: number }
  | { type: 'MOUSE_UP' | 'MOUSE_LEAVE' | 'IDLE' }
  | { type: 'EDITING_MARKER' };

const markerLayerStateMachine: React.Reducer<MarkerLayerState, MarkerLayerAction> = (state, action) => {
  console.log('SWITCHING TO ', action);
  switch (action.type) {
    case 'DRAG':
      return MarkerLayerState.Dragging;
    case 'MOUSE_UP':
    case 'MOUSE_LEAVE':
    case 'IDLE':
      return MarkerLayerState.Idle;
    case 'EDITING_MARKER':
      return state === MarkerLayerState.EditingMarker ? MarkerLayerState.Idle : MarkerLayerState.EditingMarker;
    default:
      console.error('INVALID ACTION: ' + action);
      return state;
  }
};

const UnitMarkerLayer: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  // const { settings } = useContext(CanvasSettingsContext);
  const { markerCanvasRef } = useContext(CanvasContext);
  const [markerLayerState, dispatch] = useReducer(markerLayerStateMachine, MarkerLayerState.Idle);
  const [topLeftOffset, setTopLeftOffset] = useState<Vector2>({ x: 0, y: 0 });

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
        const clickedMarkerIndex = markers.findIndex(
          (marker) => Math.abs(marker.position.x - x) < 10 && Math.abs(marker.position.y - y) < 10
        );

        if (clickedMarkerIndex !== -1) {
          dispatch({ type: 'DRAG', markerIndex: clickedMarkerIndex });
        } else {
          const newMarker: MarkerType = { color: settings.color, position: { x, y }, isDragging: false };
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        }
      }
    };

 
    const handleMouseUp = () => {
      if (markerLayerState === MarkerLayerState.Dragging) {
        dispatch({ type: 'MOUSE_UP' });
      }
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      setTopLeftOffset({ x: rect.left, y: rect.top });
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    // canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      // canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [markerCanvasRef, markers, markerLayerState, settings]);

  return (
    <div className="absolute top-10 z-100" onContextMenu={(e) => e.preventDefault()}>
      <canvas width={800} height={600} className="border-2 canvas-rectangle" ref={markerCanvasRef} />
      {markers.map((marker, index) => (
        <Marker key={index} topLeftOffset={topLeftOffset} initialPosition={marker.position}  />
      ))}
      {markerLayerState}
    </div>
  );
};

export default UnitMarkerLayer;


const handleMouseMove = (e: MouseEvent) => {
  // if (markerLayerState === MarkerLayerState.Dragging) {
  //   const rect = canvas.getBoundingClientRect();
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;

  //   setMarkers((prevMarkers) =>
  //     prevMarkers.map((marker, index) =>
  //       index === draggingMarkerIndex ? { ...marker, position: { x, y } } : marker
  //     )
  //   );
  // }
};
