 
import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import eraseInRadius from "@/app/components/Eraser";
import CanvasToImage from "@/app/components/CanvasToImg";
import drawLineOnCanvas from "@/app/components/LineDrawer";
import drawLineWithSquares from "@/app/components/SquaredLineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
import { CanvasContext, DrawAction } from "../CanvasContext";
import { DrawingState } from "@/public/types/ButtonEvents";
 

type DrawingCanvasProps = {
  color: string; // CSS color
  radius: number;
};


const DrawingLayer: React.FC<DrawingCanvasProps> = ({ color, radius }) => {
  const {canvasRef, canvasState, dispatch} = useContext(CanvasContext)//useRef<HTMLCanvasElement | null>(null);
  
  const [lastMousePos, setLastMousePos] = useState<Vector2 | null>(null);

  const changeState = (newState: DrawAction) => {
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
          changeState({ type: "ERASE" }); 
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

      if (canvasState === DrawingState.Erasing) {
       console.log("ERASING")
        eraseInRadius({ canvasRef, position: { x, y }, diameter:radius});
      }

      if (canvasState === DrawingState.Drawing) {
        // Left mouse button is pressed, draw
        if (ctx && lastMousePos) {
          console.log("DRAWING")
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
  }, [canvasState, color, radius, lastMousePos]);

  return (
 
      <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
        className="canvas-rectangle draw-canvas   top-0  "
        style={{      }}
      />
 
  );
};

 

export default DrawingLayer;