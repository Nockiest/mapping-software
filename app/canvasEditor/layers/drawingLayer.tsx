import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import eraseLine from "@/app/components/Eraser";
import CanvasToImage from "@/app/components/CanvasToImg";
import drawLineWithSquares from "@/app/components/SquaredLineDrawer";
import { Vector2,  } from "@/public/types/GeometryTypes";
import { CanvasContext, CanvasContextType, CanvasSettingsContext, DrawAction } from "../CanvasContext";
import { DrawingState } from "@/public/types/ButtonEvents";
import bucketFill from "@/app/components/BucketFill";
import drawCircledLine from "../../components/CircledLineDrawer";
import { Color } from "@/public/types/OtherTypes";
type DrawingCanvasProps = {
  color: Color; // CSS color
  radius: number;
};

const DrawingLayer: React.FC<DrawingCanvasProps> = ({ color, radius }) => {
  const { canvasRef, canvasState, dispatch } = useContext<CanvasContextType | null>(CanvasContext);
  const [lastMousePos, setLastMousePos] = useState<Vector2 | null>(null);
  const { settings } = useContext(CanvasSettingsContext);
  const changeState = (newState: DrawAction) => {
    dispatch(newState);
  };

  // useEffect(() => {
  //   const canvas = canvasRef?.current;

  //   if (canvas) {
  //     switch (canvasState) {
  //       case DrawingState.BucketFill:
  //         canvas.style.cursor = 'url(path-to-your-bucket-fill-cursor), auto'; // Set to your bucket fill cursor
  //         break;
  //       case DrawingState.Drawing:
  //         canvas.style.cursor = 'url(path-to-your-drawing-cursor), auto'; // Set to your drawing cursor
  //         break;
  //       // Add cases for other states as needed
  //       default:
  //         canvas.style.cursor = 'auto'; // Reset to the default cursor
  //     }
  //   }
  // }, [canvasState, canvasRef]);

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const handleMouseDown = (e: MouseEvent) => {
      if (settings.activeLayer !== "draw"){
        return
      }
      const x = e.offsetX;
      const y = e.offsetY;

      if (e.button === 2) {
        // Right mouse button is pressed, use EraseInRadius
        changeState({ type: "ERASE" });
      } else if (e.button === 0) {
        // Left mouse button is pressed, start drawing or filling
        if (canvasState === DrawingState.BucketFill) {
          console.log("FILLING WITH BUCKET");
          bucketFill(ctx, x, y, color);
        } else {
          changeState({ type: "DRAW" });
          if (ctx) {
            ctx.beginPath();
            setLastMousePos({ x, y });
          }
        }
      }
    };

    const handleMouseMovement = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      if (settings.activeLayer !== "draw"){
        return
      }

      if (canvasState === DrawingState.Erasing) {
        eraseLine({ canvasRef, start: lastMousePos, end: { x, y }, radius });
      } else if (canvasState === DrawingState.Drawing) {
        // Left mouse button is pressed, draw
        if (ctx && lastMousePos) {
          if (settings.lineType === "rounded") {
            drawCircledLine(ctx, lastMousePos, { x, y }, color, radius);
          } else if (settings.lineType === "squared") {
            drawLineWithSquares(ctx, lastMousePos, { x, y }, color, radius);
          }
        }
      }
      setLastMousePos({ x, y });
    };

    const handleMouseUp = () => {
      if (settings.activeLayer !== "draw"){
        return
      }
      changeState({ type: "MOUSE_UP" });
      if (ctx) {
        ctx.closePath();
      }
    };

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("contextmenu", (e: React.MouseEvent<HTMLCanvasElement>) => e.preventDefault());
    canvas.addEventListener("mousemove", handleMouseMovement);
    canvas.addEventListener("mouseup", handleMouseUp);

    // Remove event listeners on component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("contextmenu", (e: React.MouseEvent<HTMLCanvasElement>) => e.preventDefault());
      canvas.removeEventListener("mousemove", handleMouseMovement);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canvasRef, canvasState,   lastMousePos, settings, dispatch]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
      className={`canvas-rectangle draw-canvas top-0 ${settings.activeLayer === 'draw' ? 'opacity-100' : 'opacity-50'} `}
    />
  );
};

export default DrawingLayer;

    