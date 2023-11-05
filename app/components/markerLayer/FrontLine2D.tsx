import React, { useEffect, useReducer, useState, useContext } from 'react';
import Marker from '../../../../Marker'; // Assuming you have a Marker component
// import { CanvasContext, settings, MarkerLayerState } from './CanvasContext'; // Adjust the imports based on your project structure
import { Vector2 } from '@/public/types/GeometryTypes';

const LineComponent: React.FC<{ start: Vector2; end: Vector2 }> = ({ start, end }) => {
  // Implement your LineComponent logic here
  return (
    <div
      style={{
        position: 'absolute',
        left: `${start.x}px`,
        top: `${start.y}px`,
        width: `${end.x - start.x}px`,
        height: `${end.y - start.y}px`,
        border: '2px solid blue', // Adjust styling as needed
      }}
    ></div>
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