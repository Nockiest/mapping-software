"use client";

import React, { useState, useRef, useEffect, useReducer, useContext, CSSProperties } from "react";
import eraseInRadius from "../components/drawing/Eraser";
import CanvasToImage from "../components/utility/CanvasToImg";
import drawLineOnCanvas from "@/app/components/drawing/LineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
import drawImageToBackground from "@/app/components/utility/DrawBackgroundCanvasImg";
import BackgroundImageLayer from "./layers/BackgroundImageLayer";
import {   useCanvas } from "./CanvasContext";
import DrawingLayer from "./layers/DrawingLayer";
import LayerSplicer from "../components/utility/LayerSplicer";
import UnitMarkerLayer from "./layers/UnitMarkerLayer";
import FronlineLayer from "./layers/FronlineLayer";
import { settings } from "./Signals";
 
const DrawingCanvas: React.FC  = ( ) => {
  const canvasRef = useCanvas( );
 
  return (
    < >
 
   
    <div className={`relative   w-${settings.value.canvasSize}  flex items-center justify-center `}  > 
      <DrawingLayer    />
      <UnitMarkerLayer    />
      <FronlineLayer  />
      <BackgroundImageLayer   />
    </div>
   

      {/* Splicer to combine layers */}
      {/* {canvasRef && (  
        <>
        <LayerSplicer
          layers={[
            // { type: "image" ,  imageUrl: image },
            // { type: "canvas", canvasRef },
          ]}
        />
         <CanvasToImage canvasRef={canvasRef} />
         </>
        )} */}

      {/* Convert canvas to image */}
      
    </>
  );
};

export default DrawingCanvas;
