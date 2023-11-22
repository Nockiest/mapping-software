import { Signal, signal } from "@preact/signals";
import { DrawAction, DrawingState, ErasePayload, FrontLineSettings, MarkerArraySignal, MarkerSettings, Settings } from "@/public/types/OtherTypes";
import drawLineWithShape, { DrawPayload } from "../components/drawing/LineDrawer";
import { Vector2 } from "@/public/types/GeometryTypes";


const drawLayerStateHandler = (action:DrawAction) => {
  console.log("SWITCHING TO ", action.type,  );

  switch (action.type) {
    case "DRAW":
      const drawPayload = action.payload as DrawPayload;
     const {                ctx,
        lineStart ,  
        lineEnd ,
        size,
        color,
        lineShape 
} = drawPayload.drawArgs
      drawLineWithShape(
      {  ctx,
        lineStart ,  
        lineEnd ,
        size,
        color,
        lineShape ,}
      )
  
      return DrawingState.Drawing;

    case "ERASE":
      const erasePayload = action.payload as ErasePayload;
      erasePayload.eraseFunction(erasePayload.eraseArgs);
      return DrawingState.Erasing;

    case "MOUSE_UP":
    case "MOUSE_LEAVE":
      return DrawingState.Idle;

    case "ENTER_BUCKET_MODE":
      return DrawingState.BucketFill === drawSettings.value.state
        ? DrawingState.Idle
        : DrawingState.BucketFill;

    default:
      console.error("INVALID ACTION: ");
      return drawSettings.value.state;
  }
};

export const editorTopLeftPosition: Signal<Vector2> = signal({x:0,y:0})

export const drawSettings = signal({
  state: DrawingState.Idle,
  setState: (newState:DrawAction) => {
    const result = drawLayerStateHandler(newState)
    drawSettings.value.state = result
  }
})

export const settings: Settings = signal({
  radius: 5,
  color: `#000000`,
  lineType: "squared",
  activeLayer: "draw",
  canvasSize: { x: 800, y: 600 },
  popularColors: [],
  canvasZindexes: { marker: 10, draw: 10, background: 0, frontLine: 10, compiled:1 },
});

export const markerSettings: Signal<MarkerSettings> = signal({
  width: 40,
  color: `#000000`,
  textColor: `#ffffff`,
  topText: "X",
  bottomText: "Y",
  imageURL: null,
  popularMarkerColors: [],
} )

export const frontLineSettings:  FrontLineSettings  = signal({
  insertionPointIndex: -1,
  frontLineColor: "#0000ff",
  activeFrontline: null,
  frontLines: [],
  controlPointRadius: 5
});

export const markers:MarkerArraySignal = signal([])


export const backgroundImage = signal<File | null>(null);
