"use client";
import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import eraseInRadius from "../components/Eraser";
import CanvasToImage from "../components/CanvasToImg";
import drawLineOnCanvas from "@/app/components/LineDrawer";
import drawLineWithSquares from "@/app/components/SquaredLineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
import { CanvasContext } from "./page";
import DrawingLayer from "./layers/drawingLayer";
import BackgroundImageLayer from "./layers/backgroundImageLayer";
import LayerSplicer from "../components/LayerSplicer";
 
type DrawingCanvasProps = {
  color: string;
  radius: number;
};

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ color, radius }) => {
  const canvasRef = useContext(CanvasContext);
  const [image, setImage] = useState<string | null>(null); // Updated to store the image URL
  const [canvasDimensions, setCanvasDimensions] = useState<Vector2>({x:500, y: 500})
  return (
    <div>
      {/* Drawing layer */}
      <div className="relative" style={{ position: 'relative' }}>
      <DrawingLayer color={color} radius={radius}   />

      {/* Background image layer */}
      <BackgroundImageLayer onImageLoad={(imageUrl) => setImage(imageUrl)} className="absolute top-0 left-0"   />
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