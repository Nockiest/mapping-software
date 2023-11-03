import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import eraseLine from "@/app/components/drawing/Eraser";
import CanvasToImage from "@/app/components/CanvasToImg";
// import drawLineWithSquares from "@/app/components/drawing/SquaredLineDrawer";
import { Vector2   } from "@/public/types/GeometryTypes";
import { CanvasContext, CanvasContextType,  DrawAction } from "../CanvasContext";
import { DrawingState } from "@/public/types/ButtonEvents";
import bucketFill from "@/app/components/drawing/BucketFill";
import drawCircledLine from "../../components/drawing/CircledLineDrawer";
import { Color } from "@/public/types/OtherTypes";
import { MousePositionContext } from "../page";
import { settings } from "../StoredSettingsValues";
import drawLineWithShape from "../../components/drawing/CircledLineDrawer";
type DrawingCanvasProps = {
  // color: Color; // CSS color
  // radius: number;
};
//{ color, radius }
const DrawingLayer: React.FC<DrawingCanvasProps> = ( ) => {
  const { canvasRef, canvasState, dispatch } = useContext<CanvasContextType | null>(CanvasContext);
  const [lastMousePos, setLastMousePos] = useState<Vector2 | null>(null);
  const { color, radius} = settings.value
  const changeState = (newState: DrawAction) => {
    dispatch(newState);
  };

  const handleMouseLeave = () => {
    if (settings.value.activeLayer !== "draw") {
      return;
    }
    changeState({ type: "MOUSE_LEAVE" });
  };

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const handleMouseDown = (e: MouseEvent) => {
      if (settings.value.activeLayer !== "draw"){
        return
      }
      // const rect = canvas.getBoundingClientRect();
      // const {x - ,y} = mousePosition
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
      if (settings.value.activeLayer !== "draw"){
        return
      }
      console.log(canvasState === DrawingState.Drawing)
      if (canvasState === DrawingState.Erasing) {
        eraseLine({ canvasRef, start: lastMousePos|| {x:0,y:0}, end: { x, y }, radius , eraseShape:settings.value.lineType});
      } else if (canvasState === DrawingState.Drawing) {
        // Left mouse button is pressed, draw
        if (ctx && lastMousePos) {
          console.log(settings.value.lineType )
          drawLineWithShape(ctx, lastMousePos, { x, y }, color, radius, settings.value.lineType)
          // if (settings.value.lineType === "rounded") {
          //   drawCircledLine(ctx, lastMousePos, { x, y }, color, radius);
          // } else if (settings.value.lineType === "squared") {
          //   console.log("DRAWING A LINE")
          //   drawLineWithSquares(ctx, lastMousePos, { x, y }, color, radius);
          // }
        }
      }
      setLastMousePos({ x, y });
    };

    const handleMouseUp = () => {
      if (settings.value.activeLayer !== "draw"){
        return
      }
      changeState({ type: "MOUSE_UP" });
      if (ctx) {
        ctx.closePath();
      }
    };

    // Add event listeners
    if (settings.value.activeLayer === "draw") {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("contextmenu", (e: React.MouseEvent<HTMLCanvasElement>) => e.preventDefault());
      canvas.addEventListener("mousemove", handleMouseMovement);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseleave", handleMouseLeave );
    } else {
      // Remove event listeners if not in draw mode
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("contextmenu", (e: React.MouseEvent<HTMLCanvasElement>) => e.preventDefault());
      canvas.removeEventListener("mousemove", handleMouseMovement);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave );
    }

    // Remove event listeners on component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("contextmenu", (e: React.MouseEvent<HTMLCanvasElement>) => e.preventDefault());
      canvas.removeEventListener("mousemove", handleMouseMovement);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave );
    };
  }, [canvasRef, canvasState, lastMousePos, settings, dispatch]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
      className={`canvas-rectangle draw-canvas top-0 ${settings.value.activeLayer === 'draw' ? 'opacity-100' : 'opacity-50'} `}
    />
  );
};

export default DrawingLayer;

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