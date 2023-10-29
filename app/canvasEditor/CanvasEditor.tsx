"use client";
import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import eraseInRadius from "../components/Eraser";
import CanvasToImage from "../components/CanvasToImg";
import drawLineOnCanvas from "@/app/components/LineDrawer";
import drawLineWithSquares from "@/app/components/SquaredLineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";
import { CanvasContext } from "./page";
import DrawingLayer from "./layers/drawingLayer";
 
type DrawingCanvasProps = {
  color: string; // CSS color
  radius: number;
};


const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ color, radius }) => {
  const canvasRef = useContext(CanvasContext)//useRef<HTMLCanvasElement | null>(null);
  

  return (
    <div>
      <DrawingLayer color={ color } radius= {radius}   />
      <CanvasToImage  canvasRef={canvasRef}/>
    </div>
  );
};

 

export default DrawingCanvas;