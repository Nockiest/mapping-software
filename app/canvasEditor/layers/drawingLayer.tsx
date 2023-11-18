import {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
  Reducer,
} from "react";
import eraseLine from "@/app/components/drawing/Eraser";
import CanvasToImage from "@/app/components/utility/CanvasToImg";
import { Vector2 } from "@/public/types/GeometryTypes";
import { CanvasContext, CanvasContextType, useCanvas } from "../CanvasContext";
import bucketFill from "@/app/components/drawing/BucketFill";
import { MousePositionContext } from "../MouseContext";
import { settings, drawSettings } from "../Signals";
import drawLineWithShape, {
  DrawPayload,
} from "../../components/drawing/LineDrawer";
import ReusableLayer from "@/app/components/utility/ResuableLayer";
import fillCanvas from "@/app/components/utility/fillCanvas";
import { drawDot } from "@/app/components/utility/CanvasUtils";
import {
  DrawingState,
  DrawAction,
  ErasePayload,
} from "@/public/types/OtherTypes";
import { getCtxFromRef } from "@/app/components/utility/otherUtils";
// import { activatedSignal } from "../settings/DrawingLayerSettings";
// const reducer: React.Reducer<DrawingState, DrawAction> = (state, action) => {
//   // console.log("SWITCHING TO ", action.type,  action?.payload);
//   switch (action.type) {
//     case "DRAW":
//       const drawPayload = action.payload as DrawPayload;
//       console.log(drawPayload);
//       drawPayload.drawFunction(
//         drawPayload.drawArgs?.ctx,
//         drawPayload.drawArgs.x,
//         drawPayload.drawArgs.y,
//         drawPayload.drawArgs.radius,
//         drawPayload.drawArgs.color
//       );
//       return DrawingState.Drawing;

//     case "ERASE":
//       const erasePayload = action.payload as ErasePayload;
//       erasePayload.eraseFunction(erasePayload.eraseArgs);
//       return DrawingState.Erasing;

//     case "MOUSE_UP":
//     case "MOUSE_LEAVE":
//       return DrawingState.Idle;

//     case "ENTER_BUCKET_MODE":
//       return DrawingState.BucketFill === state
//         ? DrawingState.Idle
//         : DrawingState.BucketFill;

//     default:
//       console.error("INVALID ACTION: ");
//       return state;
//   }
// };
  

const DrawingLayer: React.FC = () => {
  const { canvasRef } = useCanvas();
  const mousePosition = useContext(MousePositionContext);
  const [lastMousePos, setLastMousePos] = useState<Vector2 | null>(null);
  // const [canvasState, dispatchState] = useReducer<
  //   Reducer<DrawingState, DrawAction>
  // >(reducer, DrawingState.Idle);
  const { color, radius } = settings.value;
  const {state, setState} = drawSettings.value
  const isActive = settings.value.activeLayer === "draw";

  // if (activatedSignal && canvasState !== DrawingState.BucketFill ){
  //   dispatchState({ type: 'ENTER_BUCKET_MODE' });
  // } else if (!activatedSignal && canvasState !== DrawingState.Idle ) (
  //   dispatchState({ type: "MOUSE_LEAVE" }) 
  // )

  const handleMouseLeave = () => {
    if (isActive) {
        setState({ type: "MOUSE_LEAVE" })
      // dispatchState({ type: "MOUSE_LEAVE" });
    }
  };
 
  // useEffect(() =>{
  //   fillCanvas (canvasRef, 'rgba(211, 211, 211, 0.3)');  // Adjust the color as needed
  // }, [])

  useEffect(() => {
    const { ctx, canvas } = getCtxFromRef(canvasRef);
    if (!ctx || !canvas || !canvasRef) {
      return;
    }
    const handleMouseDown = (e: MouseEvent) => {
      console.log("MOUSE DOWN");
      if (!isActive) {
        return;
      }

      const x = e.offsetX;
      const y = e.offsetY;
      e.preventDefault();
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
         setState({ type: "ERASE", payload: erasePayload })
        // dispatchState({ type: "ERASE", payload: erasePayload });
      } else if (e.button === 0) {
        // Left mouse button is pressed, start drawing or filling
        if (state === DrawingState.BucketFill) {
          console.log("FILLING WITH BUCKET");
          bucketFill(ctx, x, y, color);
        } else {
          const drawPayload: DrawPayload = {
            drawFunction: drawDot, // Replace with your actual draw function
            drawArgs: { ctx, x, y, radius, color },
          };
          setState({ type: "DRAW", payload: drawPayload })
          // dispatchState({ type: "DRAW", payload: drawPayload });
          if (ctx) {
            ctx.beginPath();

            ctx.closePath(); //draw a dot
            setLastMousePos({ x, y });
          }
        }
      }
    };

    const handleMouseMovement = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      if (!isActive) {return;}
      // console.log(canvasState === DrawingState.Drawing)
      if (state === DrawingState.Erasing) {
        eraseLine({
          canvasRef,
          start: lastMousePos || { x: 0, y: 0 },
          end: { x, y },
          radius,
          eraseShape: settings.value.lineType,
        });
      } else if (state === DrawingState.Drawing) {
        // Left mouse button is pressed, draw
        if (ctx && lastMousePos) {
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

    const handleMouseUp = (e:  MouseEvent) => {
      e.preventDefault();
      if (!isActive) {
        return;
      }
      setState({ type: "MOUSE_UP" })
      // dispatchState({ type: "MOUSE_UP" });
      if (ctx) {
        ctx.closePath();
      }
    };
    // Add event listeners
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
  }, [
    canvasRef,
    state,
    mousePosition,
    lastMousePos,
    settings,
     
  ]);
  return (
    <>
      {canvasRef && (
        <ReusableLayer
          canvasRef={canvasRef}
          layerName="draw"
          style={{
            cursor:
              state === DrawingState.BucketFill
                ? "url('/cursor.cur'),auto"
                : "auto",
          }}
        ></ReusableLayer>
      )}
    </>
  );
};

export default DrawingLayer;

// const rect = canvas.getBoundingClientRect();
// const {x - ,y} = mousePosition
