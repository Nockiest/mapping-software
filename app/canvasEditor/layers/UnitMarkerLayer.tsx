"use client"
import  { useState,useEffect ,useContext, useReducer} from 'react';
import Marker from '@/app/components/markerLayer/Marker'; // Adjust the import path as needed
import { CanvasSettingsContext, CanvasContext } from '../CanvasContext';
import { Color, MarkerType } from '@/public/types/OtherTypes';

enum MarkerLayerState {
  Idle,
  Dragging,
  EditingMarker,
}

 
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
  const { settings } = useContext(CanvasSettingsContext);
  const { markerCanvasRef } = useContext(CanvasContext);
  const [markerLayerState, dispatch] = useReducer(markerLayerStateMachine, MarkerLayerState.Idle);
  const [draggingMarker, setDraggingMarker] = useState(null)
 
 
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
        const clickedMarkerIndex = markers.findIndex(
          (marker) => Math.abs(marker.position.x - x) < 10 && Math.abs(marker.position.y - y) < 10
        );
    
        if (clickedMarkerIndex !== -1) {
          // Start dragging the clicked marker
          dispatch({ type: 'DRAG', markerIndex: clickedMarkerIndex });
          // setDraggingMarker(clickedMarkerIndex); // Set draggingMarkerIndex here
        } else {
          // Assuming you have a color defined somewhere
          const newMarker: MarkerType = { color: settings.color, position: { x, y }, isDragging: false };
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        }
      }
    };

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

    const handleMouseUp = () => {
      if (markerLayerState === MarkerLayerState.Dragging) {
        dispatch({ type: 'MOUSE_UP' });
      }
    };

    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Remove event listeners on component unmount
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [markerCanvasRef, markers, markerLayerState, settings]);

  return (
    <div className="absolute top-10 z-100" onContextMenu={(e) => e.preventDefault()}>
      <canvas
        width={800}
        height={600}
        className="border-2 canvas-rectangle"
        ref={markerCanvasRef}
        // style={{ pointerEvents: 'auto' }}
      />
      {markers.map((marker, index) => (
        <Marker key={index} color={marker.color}  updateMarkerPosition={updateMarkerPosition} draggingMarker={draggingMarker} setDraggingMarker={setDraggingMarker} />
      ))}
      {markerLayerState}
    </div>
  );
};

export default UnitMarkerLayer;