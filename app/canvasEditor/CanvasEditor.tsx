"use client";

import React, { useState, useRef, useEffect, useReducer, useContext, CSSProperties } from "react";
import eraseInRadius from "../components/drawing/Eraser";
import CanvasToImage from "../components/utility/CanvasToImg";
import drawLineOnCanvas from "@/app/components/drawing/LineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
import drawImageToBackground from "@/app/components/utility/DrawBackgroundCanvasImg";
import BackgroundImageLayer from "./layers/backgroundImageLayer";
import {   useCanvas } from "./CanvasContext";
import DrawingLayer from "./layers/drawingLayer";
import LayerSplicer from "../components/utility/LayerSplicer";
import UnitMarkerLayer from "./layers/UnitMarkerLayer";
import FronlineLayer from "./layers/FronlineLayer";
import { settings } from "./Signals";
 
const DrawingCanvas: React.FC  = ( ) => {
  const{ canvasRef, frontlineCanvasRef, markerCanvasRef, backgroundCanvasRef  } = useCanvas( );
  const layers = [
    { canvasRef: canvasRef, zIndex: 20 },
    { canvasRef: backgroundCanvasRef, zIndex: 10 },
    { canvasRef: frontlineCanvasRef, zIndex: 30 },
    { canvasRef: markerCanvasRef, zIndex: 40 },
    // Add more objects as needed
  ];
  const filteredLayers = layers.filter((layer) => layer.canvasRef)
  // const { backgroundCanvasRef   } = useContext(BackgroundContext);
  return (
   
    <div className={`relative h-600  w-${settings.value.canvasSize}  flex items-center justify-center `}  > 
      {/* <DrawingLayer    /> */}
      <UnitMarkerLayer    />
      <FronlineLayer  />
      {/* <BackgroundImageLayer   /> */}
      <LayerSplicer layers={filteredLayers} />
    </div>
   
  
  );
};

export default DrawingCanvas;
