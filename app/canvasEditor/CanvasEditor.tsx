"use client";
 
import React, { useState, useRef, useEffect, useReducer, useContext, CSSProperties } from "react";
 
import eraseInRadius from "../components/Eraser";
import CanvasToImage from "../components/CanvasToImg";
import drawLineOnCanvas from "@/app/components/LineDrawer";
import drawLineWithSquares from "@/app/components/SquaredLineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
// import { CanvasContext } from "./page ";
import drawImageToBackground from "@/app/components/DrawBackgroundCanvasImg";
import DrawLayer from "./layers/drawLayer";
import BackgroundImageLayer from "./layers/backgroundImageLayer";
import { CanvasContext } from "./page";
import DrawingLayer from "./layers/drawingLayer";
import LayerSplicer from "../components/LayerSplicer";
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
  color: string;
  radius: number;
};

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ color, radius }) => {
  const canvasRef = useContext(CanvasContext);
  const [image, setImage] = useState<string | null>(null); // Updated to store the image URL
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [canvasDimensions, setCanvasDimensions] = useState<Vector2>({x:500, y: 500})
  return (
    <div>
      {/* Drawing layer */}
      <div className="relative" style={{ position: 'relative' }}>
       

      {/* Background image layer */}
      <BackgroundImageLayer onImageLoad={(imageUrl) => setImage(imageUrl)}    />
      <DrawingLayer color={color} radius={radius}  className="z-10" />
    </div>
    
      {/* Splicer to combine layers */}
      { (image , canvasRef) &&
      <LayerSplicer
        layers={[
          { type: "image" ,  imageUrl: image },
          { type: 'canvas', canvasRef }, 
        ]}
      />}

      {/* Convert canvas to image */}
      <CanvasToImage canvasRef={canvasRef} />
 
    </div>
  );
};

 

 
export default DrawingCanvas;
 
