"use client"
import React, { useRef, useEffect, useReducer } from 'react';
import eraseInRadius from '../../components/Eraser';
import CanvasToImage from '../../components/CanvasToImg';

enum ButtonState {
  Idle,
  Drawing,
  Erasing,
}

type StateMachineAction =
  | { type: 'DRAW' }
  | { type: 'ERASE'; position: { x: number; y: number }; radius: number }
  | { type: 'MOUSE_UP' }
  | { type: 'MOUSE_LEAVE' };

const reducer: React.Reducer<ButtonState, StateMachineAction> = (state, action) => {
    switch (state) {
      case ButtonState.Idle:
        if (action.type === 'DRAW') return ButtonState.Drawing;
        if (action.type === 'ERASE') return ButtonState.Erasing;
        break;
      case ButtonState.Drawing:
        if (action.type === 'DRAW') return ButtonState.Drawing;
        if (action.type === 'ERASE') return ButtonState.Erasing;
        if (action.type === 'MOUSE_UP') return ButtonState.Idle;
        break;
      case ButtonState.Erasing:
        if (action.type === 'DRAW') return ButtonState.Drawing;
        if (action.type === 'MOUSE_UP') return ButtonState.Idle;
        break;
    }
    return state;
  };

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [state, dispatch] = useReducer(reducer, ButtonState.Idle);

  const changeState= (newstate:StateMachineAction ) => {
    dispatch( newstate)
  }
  // dispatch({ type: 'ERASE', position: { x:10, y:10 }, radius: 10 })
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const handleMouseDown = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;

      if (e.button === 2) {
        // Right mouse button is pressed, use EraseInRadius
        changeState( { type: 'ERASE', position: { x: 10, y: 10 }, radius: 10 })
        // dispatch({ type: 'ERASE', position: { x, y }, radius: 10 });
      } else {
        // Left mouse button is pressed, start drawing
        // dispatch({ type: 'DRAW' });
        changeState( { type: 'DRAW' })
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      }
    };

    const handleMouseMovement = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;

      if (state === ButtonState.Erasing) {
        eraseInRadius({ canvasRef, position: { x, y }, radius: 10 });
      }

      if (state === ButtonState.Drawing) {
        // Left mouse button is pressed, draw
        if (ctx) {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
    };

    const handleMouseUp = () => {
      changeState( { type: 'MOUSE_UP' })// dispatch({ type: 'MOUSE_UP' });
      if (ctx) {
        ctx.closePath();
      }
    };

    const handleMouseLeave = () => {
      changeState({ type: 'MOUSE_LEAVE' });
      if (ctx) {
        ctx.closePath();
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault()); // Disable right-click context menu
    canvas.addEventListener('mousemove', handleMouseMovement);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
      canvas.removeEventListener('mousemove', handleMouseMovement);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [state]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={700}
        height={500}
        style={{ border: '1px solid #000' }}
        onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
      />
      <CanvasToImage canvasRef={canvasRef} />
    </div>
  );
};

export default DrawingCanvas;