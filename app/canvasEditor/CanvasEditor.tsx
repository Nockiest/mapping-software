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
import { editorTopLeftPosition, markers, settings } from "./Signals";
import DrawingLayer from "./layers/DrawingLayer";
import BackgroundImageLayer from "./layers/BackgroundImageLayer";
import Marker from "../components/markerLayer/Marker";
 
 
const CanvasEditor: React.FC = () => {
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
    setLayers([
      { canvasRef: canvasRef, zIndex: 20 },
      { canvasRef: backgroundCanvasRef, zIndex: 10 },
      { canvasRef: frontlineCanvasRef, zIndex: 30 },
      { canvasRef: markerCanvasRef, zIndex: 40 },
      // Add more objects as needed
    ]);
  }, [canvasRef, frontlineCanvasRef, markerCanvasRef, backgroundCanvasRef]);

  const filteredLayers = layers.filter((layer) => layer.canvasRef);

  // const updateEditorTopLeftPosition = () => {
  //   const editorDiv = document.getElementById('draw');
  //   console.log('setting topleft')
  //   if (editorDiv) {
  //     const rect = editorDiv.getBoundingClientRect();
  //     const newTopLeftPosition: Vector2 = { x: rect.left, y: rect.top };
  //     editorTopLeftPosition.value = newTopLeftPosition ;
  //   }
  // };

  // useEffect(() => {
  //   // Attach event listener on component mount
  //   window.addEventListener('resize', updateEditorTopLeftPosition);

  //   // Detach event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', updateEditorTopLeftPosition);
  //   };
  // }, []);

  return (
    <div id="your-editor-div-id" className={`relative h-600 w-${settings.value.canvasSize} flex items-center justify-center`}>
      {/*TOP LEFT OFFSET DEPENDENT ON POSITION OF DRAWING LAYEYER*/}
      <DrawingLayer />
      <UnitMarkerLayer />
      <FronlineLayer />
      <BackgroundImageLayer />
      {/* Layer splicer currently handles layers internally without the need for outside props */}
      <LayerSplicer layers={filteredLayers} />
    </div>
  );
};

 
export default CanvasEditor
