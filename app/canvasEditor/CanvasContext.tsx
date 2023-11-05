import { createContext, useContext, useState, useRef, useReducer } from "react";
import { DrawingState } from "@/public/types/ButtonEvents";
import {Settings } from "@/public/types/OtherTypes";
import { Vector2 } from "@/public/types/GeometryTypes";
import { EraseArgs } from "../components/drawing/Eraser";
import { DrawPayload } from "../components/drawing/LineDrawer";
export interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement | undefined>;
  markerCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasState: DrawingState;
  dispatch: Dispatch<DrawAction>;
}

export interface BackgroundContextType {
  backgroundCanvasRef: React.RefObject<HTMLCanvasElement | null>;
//   backgroundImage: File | null;
//   setBackgroundImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface CanvasSettingsType {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

 
 
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

// Modify the reducer function
const reducer: React.Reducer<DrawingState, DrawAction> = (state, action) => {
  console.log("SWITCHING TO ", action.type);
  switch (action.type) {
    case "DRAW":
      const drawPayload = action.payload as DrawPayload;
      drawPayload.drawFunction(
        drawPayload.drawArgs.ctx,
        drawPayload.drawArgs.x,
        drawPayload.drawArgs.y,
        drawPayload.drawArgs.radius,
        drawPayload.drawArgs.color
      );
      return DrawingState.Drawing;

    case "ERASE":
      const erasePayload = action.payload as ErasePayload;
      erasePayload.eraseFunction(erasePayload.eraseArgs);
      return DrawingState.Erasing;

    case "MOUSE_UP":
    case "MOUSE_LEAVE":
      return DrawingState.Idle;

    case "ENTER_BUCKET_MODE":
      return DrawingState.BucketFill === state ? DrawingState.Idle : DrawingState.BucketFill;

    default:
      console.error("INVALID ACTION: " + action.type);
      return state;
  }
};

export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);
export const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);
 
export const CanvasProvider: React.FC = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | undefined>(null);
  const markerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [canvasState, dispatch] = useReducer(reducer, DrawingState.Idle);

  return (
    <CanvasContext.Provider value={{ canvasRef, markerCanvasRef, canvasState, dispatch }}>
      <BackgroundContext.Provider value={{ backgroundCanvasRef,  }}>
        {/* <CanvasSettingsContext.Provider value={{ settings, setSettings }}> */}
        {children}
      </BackgroundContext.Provider>
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }

  return context;
};

// export const useBackground = () => {
//   const context = useContext(BackgroundContext);

//   if (!context) {
//     throw new Error("useBackground must be used within a CanvasProvider");
//   }

//   return context;
// };

export const useCanvasSettings = () => {
  const context = useContext(CanvasSettingsContext);

  if (!context) {
    throw new Error("useCanvasSettings must be used within a CanvasProvider");
  }

  return context;
};
 