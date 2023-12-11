import { Signal } from "@preact/signals";
import { Vector2 } from "./GeometryTypes";
import { EraseArgs } from "@/app/components/drawing/Eraser";
import { DrawLineWithShapeParams, DrawPayload } from "@/app/components/drawing/LineDrawer";
import { FrontlineData } from "@/app/canvasEditor/layers/FronlineLayer";

export type RGB = [number, number, number  ];
export type RGBA = [number, number, number, number];
export type HEX = `#${string}`;

export type Color = HEX;
export type AnyTypeColor = RGB|RGBA|HEX
export type PositionedText = {
  topText: string;
  bottomText: string;
}


export type MarkerType = PositionedText & {
  color: Color;
  position: Vector2;
  isDragging: boolean;

  customStyling?: MarkerSettings;
  id: string;
};
export type LayerNames =
  | "draw"
  | "marker"
  | "background"
  | "frontLine"
  | "compiled"
  | 'none';

export type MarkerSettings =  PositionedText & {
  radius: number
  color: Color ;
  textColor: Color;
  imageURL: string |File | null;
  popularMarkerColors: Array<Color>;
};

export type FollowMouseFunction = (
  position:Vector2,
  withscroll: boolean,
  maxPosition: Vector2,
  topLeftOffset?: Vector2,

) => Vector2;

export type FrontLineSettings = Signal<{
  insertionPointIndex: number;
  frontLineColor: Color;
  activeFrontline: FrontlineData | null | undefined;
  frontLines: Array<FrontlineData>;
  controlPointRadius: number;
}>;
export type MarkerArraySignal = Signal<MarkerType[]>;

export type Settings = Signal<{
  radius: number;
  color: Color;
  lineType: "squared" | "rounded";
  activeLayer: LayerNames;
  canvasSize: Vector2;
  maxCanvasSize: Vector2
  popularColors: Array<Color>;
  canvasZindexes: {
    [key in LayerNames]: number;
  };
}>;

export type ErasePayload = {
  eraseFunction: (args: EraseArgs) => void;
  eraseArgs: EraseArgs;
};

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
export type TimelineFrame = {
  imageURL: string
  height: number
  width: number
}
export type TimelineType = Array<TimelineFrame>;

export type DrawQuadraticBezierWithShapeParams = DrawLineWithShapeParams & {
  controlPoints: Array<Vector2>
}