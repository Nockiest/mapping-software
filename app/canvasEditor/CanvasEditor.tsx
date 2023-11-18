"use client";

import React, { useState, useRef, useEffect, useReducer, useContext, CSSProperties } from "react";
import eraseInRadius from "../components/drawing/Eraser";
import CanvasToImage from "../components/utility/CanvasToImg";
import drawLineOnCanvas from "@/app/components/drawing/LineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
import drawImageToBackground from "@/app/components/utility/DrawBackgroundCanvasImg";
// import BackgroundImageLayer from "./layers/backgroundImageLayer";
import {   useCanvas } from "./CanvasContext";
// import DrawingLayer from "./layers/drawingLayer";
import LayerSplicer from "../components/utility/LayerSplicer";
import UnitMarkerLayer from "./layers/UnitMarkerLayer";
import FronlineLayer from "./layers/FronlineLayer";
import { markers, settings } from "./Signals";
import DrawingLayer from "./layers/DrawingLayer";
import BackgroundImageLayer from "./layers/BackgroundImageLayer";
import Marker from "../components/markerLayer/Marker";
 
const DrawingCanvas: React.FC = () => {
  const { canvasRef, frontlineCanvasRef, markerCanvasRef, backgroundCanvasRef } = useCanvas();
  const [layers, setLayers] = useState([
    { canvasRef: canvasRef, zIndex: 20 },
    { canvasRef: backgroundCanvasRef, zIndex: 10 },
    { canvasRef: frontlineCanvasRef, zIndex: 30 },
    { canvasRef: markerCanvasRef, zIndex: 40 },
    // Add more objects as needed
  ]);

  useEffect(() => {
    // Update layers when canvas references are ready
    console.log(canvasRef)
    setLayers([
      { canvasRef: canvasRef, zIndex: 20 },
      { canvasRef: backgroundCanvasRef, zIndex: 10 },
      { canvasRef: frontlineCanvasRef, zIndex: 30 },
      { canvasRef: markerCanvasRef, zIndex: 40 },
      // Add more objects as needed
    ]);
  }, [canvasRef, frontlineCanvasRef, markerCanvasRef, backgroundCanvasRef]);

  const filteredLayers = layers.filter((layer) => layer.canvasRef);

  return (
    <div className={`relative h-600 w-${settings.value.canvasSize} flex items-center justify-center `}>
      {settings.value.activeLayer !== 'compiled' ? (
        <>
          <DrawingLayer />
          <UnitMarkerLayer />
          <FronlineLayer />
          <BackgroundImageLayer />
        </>
      ) : (
        <LayerSplicer layers={filteredLayers} />
      )}
    </div>
  );
};
export default DrawingCanvas
