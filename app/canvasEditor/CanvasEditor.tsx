"use client";
import React, { useState, useRef, useEffect, useReducer, useContext, CSSProperties } from "react";
import eraseInRadius from "../components/Eraser";
import CanvasToImage from "../components/CanvasToImg";
import drawLineOnCanvas from "@/app/components/LineDrawer";
import drawLineWithSquares from "@/app/components/SquaredLineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
// import { CanvasProvider } from "./CanvasContext";
import drawImageToBackground from "@/app/components/DrawBackgroundCanvasImg";
import DrawLayer from "./layers/drawLayer";
import BackgroundImageLayer from "./layers/backgroundImageLayer";
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
  color: string;  // CSS color
  radius: number;
};


const CanvasEditor: React.FC<DrawingCanvasProps> = ({ color, radius }) => {
//  const canvasRef = useRef<HTMLCanvasElement | null>(null); //useContext(CanvasProvider)//useRef<HTMLCanvasElement | null>(null);
  // const [state, dispatch] = useReducer(reducer, ButtonState.Idle);
  // const [lastMousePos, setLastMousePos] = useState<Vector2 | null>(null);
  // const [backgroundImage, setBackgroundImage] = useState<null|File>(null)
  // const changeState = (newState: StateMachineAction) => {
  //   dispatch(newState);
  // };
 
  // const canvasLayerStyles = {

  // }
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (!selectedFile) {
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       setBackgroundImage(img);
  //     };
  //     img.src = e.target?.result as string;
  //   };

  //   reader.readAsDataURL(selectedFile);
  // };

  // useEffect(() => {
  //   if (!backgroundImage ){
  //     return
  //   }
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
     
  //   drawImageToBackground(ctx, backgroundImage)
    
  // }, [backgroundImage])

  // useEffect(() => {
  //   if (!canvasRef){
  //     return
  //   }
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   const ctx = canvas.getContext("2d");

  //   const handleMouseDown = (e: MouseEvent) => {
  //     const x = e.offsetX;
  //     const y = e.offsetY;
      
  //     if (e.button === 2) {
  //       // Right mouse button is pressed, use EraseInRadius
  //       changeState({ type: "ERASE", position: { x: 10, y: 10 }, radius });
  //     } else {
  //       // Left mouse button is pressed, start drawing
  //       changeState({ type: "DRAW" });
  //       if (ctx) {
  //         ctx.beginPath();
  //         setLastMousePos({ x, y });
  //       }
  //     }
  //   };

  //   const handleMouseMovement = (e: MouseEvent) => {
  //     const x = e.offsetX;
  //     const y = e.offsetY;

  //     if (state === ButtonState.Erasing) {
  //       eraseInRadius({canvasRef, image:backgroundImage,position:  { x, y }, radius} )
  //     }

  //     if (state === ButtonState.Drawing) {
  //       // Left mouse button is pressed, draw
  //       if (ctx && lastMousePos) {
  //         drawLineWithSquares(ctx, lastMousePos, { x, y }, color, radius);
  //       }
  //     }
  //     setLastMousePos({ x, y });
  //   };

  //   const handleMouseUp = () => {
  //     changeState({ type: "MOUSE_UP" });
  //     if (ctx) {
  //       ctx.closePath();
  //     }
  //   };

  //   const handleMouseLeave = () => {
  //     changeState({ type: "MOUSE_LEAVE" });
  //     if (ctx) {
  //       ctx.closePath();
  //     }
  //   };

  //   canvas.addEventListener("mousedown", handleMouseDown);
  //   canvas.addEventListener("contextmenu", (e:React.MouseEvent<HTMLCanvasElement>) => e.preventDefault()); // Disable right-click context menu
  //   canvas.addEventListener("mousemove", handleMouseMovement);
  //   canvas.addEventListener("mouseup", handleMouseUp);
  //   canvas.addEventListener("mouseleave", handleMouseLeave);

  //   return () => {
  //     canvas.removeEventListener("mousedown", handleMouseDown);
  //     canvas.removeEventListener("contextmenu", (e:React.MouseEvent<HTMLCanvasElement>) => e.preventDefault());
  //     canvas.removeEventListener("mousemove", handleMouseMovement);
  //     canvas.removeEventListener("mouseup", handleMouseUp);
  //     canvas.removeEventListener("mouseleave", handleMouseLeave);
  //   };
  // }, [state, color, radius, lastMousePos   ]);

  return (
    <div>
      {/* <BackgroundImageLayer image={backgroundImage} />
      <input type="file" onChange={handleFileChange} />
      <CanvasToImage  canvasRef={canvasRef}/> */}
      {/* <canvas
        ref={canvasRef}
        className="canvas-rectangle"
        width={700}
        height={500}
        style={{ border: "1px solid #000" }}
        onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
      /> */}
      {/* <DrawLayer /> */}
     
      {/* Include your CanvasToImage component here if needed */}
    </div>
  );
};

 

export default CanvasEditor;