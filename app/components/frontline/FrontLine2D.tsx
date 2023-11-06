import React, { useEffect, useReducer, useState, useContext } from 'react';
import Marker from '../markerLayer/Marker'; // Assuming you have a Marker component
// import { CanvasContext, settings, MarkerLayerState } from './CanvasContext'; // Adjust the imports based on your project structure
import { Vector2 } from '@/public/types/GeometryTypes';

const LineComponent: React.FC<{ start: Vector2; end: Vector2, topLeftOffset:Vector2 }> = ({ start, end  , topLeftOffset={x:0,y:0} }) => {
    // const canvasTopLeft = { x: 0, y: 0 }; // Adjust this based on the actual top-left offset of your canvas
    const adjustedStart =start// { x: start.x + topLeftOffset.x, y: start.y + topLeftOffset.y };
    const adjustedEnd = end || start//{ x: end.x + topLeftOffset.x, y: end.y + topLeftOffset.y };
    // const [currentPosition, setCurrentPosition] = useState<Vector2>(start);
    const lineStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${Math.min(adjustedStart.x, adjustedEnd.x)}px`,
      top: `${Math.min(adjustedStart.y, adjustedEnd.y)}px`,
      width: `${Math.abs(adjustedEnd.x - adjustedStart.x)}px`,
      height: `${Math.abs(adjustedEnd.y - adjustedStart.y)}px`,
      transformOrigin: 'top left',
      transform: `rotate(${Math.atan2(adjustedEnd.y - adjustedStart.y, adjustedEnd.x - adjustedStart.x)}rad)`,
    };
    useEffect(() => {
       console.log(  topLeftOffset.x ,topLeftOffset.y )
    }, [])
    return (
     <>
       <svg style={{ ...lineStyle, overflow: 'visible', pointerEvents: 'none' }}>
        <line
          x1="0"
          y1="0"
          x2={Math.abs(adjustedEnd.x - adjustedStart.x)}
          y2={Math.abs(adjustedEnd.y - adjustedStart.y)}
          stroke="blue" // Adjust styling as needed
          strokeWidth="2"
        />
         
      </svg>
      {adjustedStart.x} {adjustedStart.y}
     </>
    
    );
  };

const lineStateMachine = (state: LineState, action: LineAction): LineState => {
  switch (action.type) {
    case 'SET_POSITION':
      return { ...state, position: action.position };
    case 'IDLE':
      return { ...state, state: 'IDLE', endPosition: action.position };
    case 'MOVING':
      return { ...state, state: 'MOVING', endPosition: action.position };
    default:
      return state;
  }
};

type LineState = {
  state: 'IDLE' | 'MOVING';
  position: Vector2;
  endPosition: Vector2;
};

type LineAction =
  | { type: 'SET_POSITION'; position: Vector2 }
  | { type: 'IDLE' | 'MOVING'; position: Vector2 };

export default LineComponent