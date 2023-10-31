"use client";

import React, { useState, useRef, useEffect, useReducer, useContext, CSSProperties } from "react";

import eraseInRadius from "../components/Eraser";
import CanvasToImage from "../components/CanvasToImg";
import drawLineOnCanvas from "@/app/components/CircledLineDrawer";
import drawLineWithSquares from "@/app/components/SquaredLineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
// import { CanvasContext } from "./page ";
import drawImageToBackground from "@/app/components/DrawBackgroundCanvasImg";
import DrawLayer from "./layers/drawLayer";
import BackgroundImageLayer from "./layers/backgroundImageLayer";
import { CanvasContext } from "./CanvasContext";
import DrawingLayer from "./layers/drawingLayer";
import LayerSplicer from "../components/LayerSplicer";

type DrawingCanvasProps = {
  color: string;
  radius: number;
};

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ color, radius }) => {
  const canvasRef = useContext(CanvasContext);
  // const [image, setImage] = useState<string | null>(null); // Updated to store the image URL
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  // const [canvasDimensions, setCanvasDimensions] = useState<Vector2>({x:500, y: 500})
  return (
    <div>
      {/* Drawing layer */}
      <div className="relative" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <DrawingLayer color={color} radius={radius} />
        <BackgroundImageLayer onImageLoad={() => {}} /> {/*(imageUrl) => setImage(imageUrl) */}
      </div>

      {/* Splicer to combine layers */}
      {canvasRef && (
        <LayerSplicer
          layers={[
            // { type: "image" ,  imageUrl: image },
            { type: "canvas", canvasRef },
          ]}
        />
      )}

      {/* Convert canvas to image */}
      <CanvasToImage canvasRef={canvasRef} />
    </div>
  );
};

export default DrawingCanvas;
