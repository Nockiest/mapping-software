import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
} from "react";
import eraseLine from "@/app/components/drawing/Eraser";
import CanvasToImage from "@/app/components/utility/CanvasToImg";
import { Vector2 } from "@/public/types/GeometryTypes";
import {
  CanvasContext,
  CanvasContextType,
  DrawAction,
  ErasePayload,
  useCanvas,
} from "../CanvasContext";
// import { DrawingState } from "@/public/types/ButtonEvents";
import bucketFill from "@/app/components/drawing/BucketFill";
import { MousePositionContext } from "../page";
import { settings } from "../Signals";
import drawLineWithShape, {
  DrawPayload,
} from "../../components/drawing/LineDrawer";
import ReusableLayer from "@/app/components/utility/ResuableLayer";
import fillCanvas from "@/app/components/utility/fillCanvas"; 
export enum DrawingState {
  Idle,
  Drawing,
  Erasing,
  BucketFill,
}
const DrawingLayer: React.FC = () => {
  const { canvasRef, canvasState, dispatchState } = useCanvas();
  const mousePosition = useContext(MousePositionContext)
  const [lastMousePos, setLastMousePos] = useState<Vector2 | null>(null);
  const { color, radius } = settings.value;
  const isActive = settings.value.activeLayer === "draw";
  const handleMouseLeave = () => {
    if (settings.value.activeLayer !== "draw") {
      return;
    }
    dispatchState({ type: "MOUSE_LEAVE" });
  };

  useEffect(() =>{
    fillCanvas (canvasRef, 'rgba(211, 211, 211, 0.3)');  // Adjust the color as needed
  }, [])

  const drawDot: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
  ) => void = (ctx, x, y, radius, color) => {
    // Draw based on lineType
    if (settings.value.lineType === "rounded") {
      ctx.arc(x, y, radius / 2, 0, 2 * Math.PI);
    } else if (settings.value.lineType === "squared") {
      ctx.rect(x - radius / 2, y - radius / 2, radius, radius);
    }
    ctx.fillStyle = color;
    ctx.fill();
  };


  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const handleMouseDown = (e: MouseEvent) => {
      console.log("MOUSE DOWN")
      if (settings.value.activeLayer !== "draw") {
        return;
      }
      // const rect = canvas.getBoundingClientRect();
      // const {x - ,y} = mousePosition
      const x = e.offsetX;
      const y = e.offsetY;

      if (e.button === 2) {
        const erasePayload: ErasePayload = {
          eraseFunction: eraseLine,
          eraseArgs: {
            canvasRef,
            start: lastMousePos || { x, y },
            end: { x, y },
            radius,
            eraseShape: settings.value.lineType,
          },
        };
        dispatchState({ type: "ERASE", payload: erasePayload });
      } else if (e.button === 0) {
        // Left mouse button is pressed, start drawing or filling
        if (canvasState === DrawingState.BucketFill) {
          console.log("FILLING WITH BUCKET");
          bucketFill(ctx, x, y, color);
        } else {
          const drawPayload: DrawPayload = {
            drawFunction: drawDot, // Replace with your actual draw function
            drawArgs: { ctx, x, y, radius, color },
          };

          dispatchState({ type: "DRAW", payload: drawPayload });
          if (ctx) {
            ctx.beginPath();
            console.log("DRAWING AN ARC");

            ctx.closePath(); //draw a dot
            setLastMousePos({ x, y });
          }
        }
      }
    };

    const handleMouseMovement = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      if (settings.value.activeLayer !== "draw") {
        return;
      }
      // console.log(canvasState === DrawingState.Drawing)
      if (canvasState === DrawingState.Erasing) {
        eraseLine({
          canvasRef,
          start: lastMousePos || { x: 0, y: 0 },
          end: { x, y },
          radius,
          eraseShape: settings.value.lineType,
        });
      } else if (canvasState === DrawingState.Drawing) {
        // Left mouse button is pressed, draw
        if (ctx && lastMousePos) {
          // console.log(settings.value.lineType )
          drawLineWithShape(
            ctx,
            lastMousePos,
            { x, y },
            color,
            radius,
            settings.value.lineType
          );
        }
      }
      setLastMousePos({ x, y });
    };

    const handleMouseUp = () => {
      if (settings.value.activeLayer !== "draw") {
        return;
      }
      dispatchState({ type: "MOUSE_UP" });
      if (ctx) {
        ctx.closePath();
      }
    };

    // Add event listeners
 
      console.log("TURN ON")
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMovement);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseleave", handleMouseLeave);
   
 
    // Remove event listeners on component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMovement);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [canvasRef, canvasState, mousePosition, lastMousePos, settings , dispatchState]);
 
  // zjevně nemusím posílat input handling logiku do reusable canvas
  return (
    <>
    
      {canvasRef && (
        <ReusableLayer 
            canvasRef={canvasRef}
            layerName="draw"
            style={{
            cursor:
              canvasState === DrawingState.BucketFill
                ? "url('/cursor.cur'),auto"
                : "auto",
          }}
        />

        // <canvas
        //   ref={canvasRef}
        //   width={800}
        //   height={600}
        //   // onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
        //   className={` canvas-rectangle draw-canvas       ${isActive ? 'z-20 ' : 'z-10'}`}
        //   style={{
        //     // opacity: isActive ? 1 : 0.5,
        //     cursor:
        //       canvasState === DrawingState.BucketFill
        //         ? "url('/cursor.cur'),auto"
        //         : "auto",
        //   }}
        // />
      )}
    </>
  );
};

export default DrawingLayer;

// <canvas
//   ref={canvasRef}
//   width={800}
//   height={600}
//   onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
//   className="absolute canvas-rectangle draw-canvas top-0"
//   style={{ pointerEvents: settings.value.activeLayer === "draw" ? "auto" : "none", opacity: settings.value.activeLayer === "draw" ? 1 : 0.5, cursor: canvasState === DrawingState.BucketFill?  "url('/cursor.cur'),auto": "auto" }}
// />
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
