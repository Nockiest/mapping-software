 
import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import eraseInRadius from "@/app/components/Eraser";
import CanvasToImage from "@/app/components/CanvasToImg";
import drawLineOnCanvas from "@/app/components/LineDrawer";
import drawLineWithSquares from "@/app/components/SquaredLineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
import { CanvasContext } from "../page";
enum ButtonState {
  Idle,
  Drawing,
  Erasing,
}

type StateMachineAction =
  | { type: "DRAW" }
  | { type: "ERASE"; position: { x: number; y: number }; radius: number }
  | { type: "MOUSE_UP" }
  | { type: "MOUSE_LEAVE" };

const reducer: React.Reducer<ButtonState, StateMachineAction> = (state, action) => {
  switch (state) {
    case ButtonState.Idle:
      if (action.type === "DRAW") return ButtonState.Drawing;
      if (action.type === "ERASE") return ButtonState.Erasing;
      break;
    case ButtonState.Drawing:
      if (action.type === "DRAW") return ButtonState.Drawing;
      if (action.type === "ERASE") return ButtonState.Erasing;
      if (action.type === "MOUSE_UP") return ButtonState.Idle;
      break;
    case ButtonState.Erasing:
      if (action.type === "DRAW") return ButtonState.Drawing;
      if (action.type === "MOUSE_UP") return ButtonState.Idle;
      break;
  }
  return state;
};

type DrawingCanvasProps = {
  color: string; // CSS color
  radius: number;
};


const DrawingLayer: React.FC<DrawingCanvasProps> = ({ color, radius }) => {
  const canvasRef = useContext(CanvasContext)//useRef<HTMLCanvasElement | null>(null);
  const [state, dispatch] = useReducer(reducer, ButtonState.Idle);
  const [lastMousePos, setLastMousePos] = useState<Vector2 | null>(null);

  const changeState = (newState: StateMachineAction) => {
    dispatch(newState);
  };
 

  useEffect(() => {
    if (!canvasRef){
      return
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const handleMouseDown = (e: MouseEvent) => {
        const x = e.offsetX;
        const y = e.offsetY;
      
        if (e.button === 2) {
          // Right mouse button is pressed, use EraseInRadius
          changeState({ type: "ERASE", position: { x, y }, radius });
        } else {
          // Left mouse button is pressed, start drawing
          changeState({ type: "DRAW" });
          if (ctx) {
            ctx.beginPath();
            setLastMousePos({ x, y });
          }
        }
      };

    const handleMouseMovement = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;

      if (state === ButtonState.Erasing) {
       console.log("ERASING")
        eraseInRadius({ canvasRef, position: { x, y }, diameter:radius});
      }

      if (state === ButtonState.Drawing) {
        // Left mouse button is pressed, draw
        if (ctx && lastMousePos) {
          drawLineWithSquares(ctx, lastMousePos, { x, y }, color, radius);
        }
      }
      setLastMousePos({ x, y });
    };

    const handleMouseUp = () => {
      changeState({ type: "MOUSE_UP" });
      if (ctx) {
        ctx.closePath();
      }
    };

    const handleMouseLeave = () => {
      changeState({ type: "MOUSE_LEAVE" });
      if (ctx) {
        ctx.closePath();
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("contextmenu", (e:React.MouseEvent<HTMLCanvasElement>) => e.preventDefault()); // Disable right-click context menu
    canvas.addEventListener("mousemove", handleMouseMovement);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("contextmenu", (e:React.MouseEvent<HTMLCanvasElement>) => e.preventDefault());
      canvas.removeEventListener("mousemove", handleMouseMovement);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [state, color, radius, lastMousePos]);

  return (
 
      <canvas 
        ref={canvasRef}
        width={700}
        height={500}
        style={{ border: "1px solid #000" }}
        onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
        className="canvas-rectangle z-10"
      />
 
  );
};

 

export default DrawingLayer;