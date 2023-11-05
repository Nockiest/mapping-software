import { Signal } from "@preact/signals";

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color = RGB|RGBA|HEX//[number, number, number, number];

export type MarkerType = {
    color: string;
    position: { x: number; y: number };
    isDragging: boolean;
  };
  

export type Settings = Signal<{
    radius: number;
    color: Color;
    lineType: "squared" | "rounded";
    activeLayer: "draw" | "marker" | "background";
    markerSettings:{width:number,  color: Color, topValue:string, bottomValue:string,  image:File|null, popularMarkerColors: Array<Color>} ;
    popularColors: Array<Color>;
  }>;