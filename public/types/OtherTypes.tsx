import { Signal } from "@preact/signals";
import { Vector2 } from "./GeometryTypes";
import { EraseArgs } from "@/app/components/drawing/Eraser";
import { DrawPayload } from "@/app/components/drawing/LineDrawer";
import { FrontlineData } from "@/app/canvasEditor/layers/FronlineLayer";

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color =  HEX//[number, number, number, number];RGB|RGBA|

export type MarkerType = {
  color: Color;
  position: Vector2;
  isDragging: boolean;
  topLeftOffset: Vector2;
  topText: string;
  bottomText:string;
  customStyling?:MarkerSettings;
};
export type LayerNames =  "draw" | "marker" | "background"| "frontLine"

export type MarkerSettings = {
  width:number,  
  color: Color, 
  textColor:Color,
  topValue:string, 
  bottomValue:string, 
  imageURL: string|null,
  popularMarkerColors: Array<Color> 
}

export type FrontLineSettings = Signal<{
  insertionPointIndex: number;
  frontLineColor: Color;
  activeFrontline: FrontlineData | null;
  frontLines: FrontlineData[];
}>;
export type MarkerArraySignal = Signal<MarkerType[]>;

export type Settings = Signal<{
    radius: number;
    color: Color;
    lineType: "squared" | "rounded";
    activeLayer: LayerNames
    canvasSize: Vector2;
    markerSettings: MarkerSettings
    popularColors: Array<Color>;
    canvasZindexes: {
      [key in LayerNames]: number;
    };
    // frontLineSettings: FrontLineSettings
  }>;


export type  ErasePayload = {
  eraseFunction: (args: EraseArgs) => void;
  eraseArgs: EraseArgs;
}
   
  // Update the DrawAction type to include the "DRAW" payload
export type DrawAction =
  | { type: "DRAW"; payload: DrawPayload }
  | { type: "ERASE"; payload: ErasePayload }
  | { type: "MOUSE_UP" }
  | { type: "MOUSE_LEAVE" }
  | { type: "ENTER_BUCKET_MODE" };

export enum DrawingState {
  Idle,
  Drawing,
  Erasing,
  BucketFill,
}

export type CanvasRef = React.RefObject<HTMLCanvasElement>;
