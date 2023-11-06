import { Signal } from "@preact/signals";
import { Vector2 } from "./GeometryTypes";

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color =  HEX//[number, number, number, number];RGB|RGBA|

export type MarkerType = {
    color: string;
    position: { x: number; y: number };
    isDragging: boolean;
  };
  

export type Settings = Signal<{
    radius: number;
    color: Color;
    lineType: "squared" | "rounded";
    activeLayer: "draw" | "marker" | "background"| "frontLine";
    canvasSize: Vector2;
    markerSettings:{width:number,  color: Color, textColor:Color, topValue:string, bottomValue:string,  imageURL: string|null, popularMarkerColors: Array<Color>} ;
    popularColors: Array<Color>;
  }>;