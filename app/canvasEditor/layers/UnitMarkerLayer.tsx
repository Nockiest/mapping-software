"use client"
import { useState, useEffect, useContext, useReducer } from 'react';
import Marker from '@/app/components/markerLayer/Marker'; // Adjust the import path as needed
import {  CanvasContext, useCanvas } from '../CanvasContext';
// import { Color } from '@/public/types/OtherTypes';
import { Vector2 } from '@/public/types/GeometryTypes';
import { settings } from '../Signals';
import { Color } from '@/public/types/OtherTypes';
import LineComponent from '@/app/components/frontline/FrontLine2D';
import { MousePositionContext } from '../page';
import { followMouseComponent } from '@/public/utils';
import ReusableLayer from '@/app/components/utility/ResuableLayer';
enum MarkerLayerState {
  Idle,
  Dragging,
  EditingMarker,
  MakingLine
}

type MarkerType = {
  color: Color;
  position: Vector2;
  isDragging: boolean;
};

type MarkerLayerAction =
  | { type: 'DRAG'; markerIndex: number }
  | { type: "MAKING_LINE" | 'IDLE' }
  | { type: 'EDITING_MARKER' };


const markerLayerStateMachine: React.Reducer<MarkerLayerState, MarkerLayerAction> = (state, action) => {
  console.log('SWITCHING TO ', action);
  switch (action.type) {
    case 'DRAG':
      return MarkerLayerState.Dragging;
    case 'IDLE':
      return MarkerLayerState.Idle;
    case 'EDITING_MARKER':
      return state === MarkerLayerState.EditingMarker ? MarkerLayerState.Idle : MarkerLayerState.EditingMarker;
    case "MAKING_LINE":
      console.log("DISPATCHED")
      return state === MarkerLayerState.MakingLine ? MarkerLayerState.Idle : MarkerLayerState.MakingLine;
    default:
      console.error('INVALID ACTION: ' + action);
      return state;
  }
};

const UnitMarkerLayer: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const { markerCanvasRef } = useCanvas()/// useContext(CanvasContext);
  const [markerLayerState, dispatchState] = useReducer(markerLayerStateMachine, MarkerLayerState.Idle);
  const [topLeftOffset, setTopLeftOffset] = useState<Vector2>({ x: 0, y: 0 });
  const mousePosition = useContext(MousePositionContext)
 

  useEffect(() => {
    const handleResize = () => {
      if(!markerCanvasRef.current) return
      const canvas = markerCanvasRef.current
      const rect = canvas.getBoundingClientRect();
      setTopLeftOffset({ x: rect.left, y: rect.top });
    };
    handleResize();
  }, [settings.value.activeLayer]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      console.log("MOUSE DOWN")
      if (settings.value.activeLayer !== 'marker') {return;}
       
      const rect = markerCanvasRef.current?.getBoundingClientRect();
      const x = e.clientX - rect!.left;
      const y = e.clientY - rect!.top;

      if (e.button === 2) {
        const clickedMarkerIndex = markers.findIndex(
          (marker) => Math.abs(marker.position.x - x) < 10 && Math.abs(marker.position.y - y) < 10
        );

        if (clickedMarkerIndex !== -1) {
          dispatchState({ type: 'DRAG', markerIndex: clickedMarkerIndex });
          
        } else {
          const newMarker: MarkerType = { color: settings.value.color, position: { x, y }, isDragging: false };
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        }
      } else if (e.button === 0 && markerLayerState === MarkerLayerState.MakingLine  ) {
        // Set the starting position for the line
        console.log(mousePosition)
        // setLineEndPosition({ x , y  } );
      }
    };

    const handleMarkerDoubleClick = (e: MouseEvent) => {
      const rect = markerCanvasRef.current?.getBoundingClientRect();
      const x = e.clientX - rect!.left;
      const y = e.clientY - rect!.top;
      console.log('Marker double-clicked!');
      dispatchState({ type: 'MAKING_LINE' });
      // setLineStartPosition({ x  , y});
    };

    const canvas = markerCanvasRef.current;
    if (!canvas) return
    // console.log( markerCanvasRef.current)
    if (isActive){
      console.log("TURN ON")
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('dblclick', handleMarkerDoubleClick);
    } else {
      // console.log("TURN OFF")
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('dblclick', handleMarkerDoubleClick);
    }
  

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('dblclick', handleMarkerDoubleClick);
    };
  }, [markerCanvasRef, markers,mousePosition, settings, markerLayerState]);
  const isActive= settings.value.activeLayer === 'marker'
  return (
    < >
      <ReusableLayer
      layerName='marker'
      canvasRef={markerCanvasRef}
      >
        {markers.map((marker, index) => (
        <Marker key={index} topLeftOffset={topLeftOffset} initialPosition={marker.position} canvasSize={{ x: 800, y: 600 }}  dragHandler={followMouseComponent} customSettings={settings.value.markerSettings} />
      ))}
      </ReusableLayer>
      
       
      
       
    </>
  );
};

export default UnitMarkerLayer;

 {/* <canvas
        width={800}
        height={600}
        className="border-2 canvas-rectangle markerLayer  "
        ref={markerCanvasRef}
        // style={{ pointerEvents: isActive ? 'auto' : 'none' }}
      /> */}

// const handleMouseMove = (e: MouseEvent) => {
//   // if (markerLayerState === MarkerLayerState.Dragging) {
//   //   const rect = canvas.getBoundingClientRect();
//   //   const x = e.clientX - rect.left;
//   //   const y = e.clientY - rect.top;

//   //   setMarkers((prevMarkers) =>
//   //     prevMarkers.map((marker, index) =>
//   //       index === draggingMarkerIndex ? { ...marker, position: { x, y } } : marker
//   //     )
//   //   );
//   // }
// };
