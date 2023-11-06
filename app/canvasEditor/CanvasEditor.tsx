"use client";

import React, { useState, useRef, useEffect, useReducer, useContext, CSSProperties } from "react";
import eraseInRadius from "../components/drawing/Eraser";
import CanvasToImage from "../components/CanvasToImg";
import drawLineOnCanvas from "@/app/components/drawing/LineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
import drawImageToBackground from "@/app/components/DrawBackgroundCanvasImg";
import BackgroundImageLayer from "./layers/BackgroundImageLayer";
import {   useCanvas } from "./CanvasContext";
import DrawingLayer from "./layers/DrawingLayer";
import LayerSplicer from "../components/LayerSplicer";
import UnitMarkerLayer from "./layers/UnitMarkerLayer";
import FronlineLayer from "./layers/FronlineLayer";
 
const DrawingCanvas: React.FC  = ( ) => {
  const canvasRef = useCanvas( );
  // const [canvasDimensions, setCanvasDimensions] = useState<Vector2>({x:500, y: 500})
  return (
    <div>
 
      <div className="relative" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <UnitMarkerLayer    />
        <DrawingLayer    />
        <FronlineLayer  />
        <BackgroundImageLayer onImageLoad={() => {}} />  
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
