import { createContext, useContext, useState, useRef, useReducer } from "react";
import { DrawingState } from "@/public/types/ButtonEvents";
import { Color, Settings } from "@/public/types/OtherTypes";
import { Vector2 } from "@/public/types/GeometryTypes";
import { EraseArgs } from "../components/drawing/Eraser";
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

 
export type DrawAction =
  | { type: "DRAW"; payload: {} }
  | { type: "ERASE"; payload: ErasePayload }
  | { type: "MOUSE_UP" }
  | { type: "MOUSE_LEAVE" }
  | { type: "ENTER_BUCKET_MODE" };

export type  ErasePayload = {
  eraseFunction: (args: EraseArgs) => void;
  eraseArgs: EraseArgs;
}

// interface EraseArgs {
//   canvasRef: React.RefObject<HTMLCanvasElement>;
//   start: Vector2;
//   end: Vector2;
//   radius: number;
//   eraseShape: string; // Adjust the type accordingly
//   // Add other necessary properties
// }

const reducer: React.Reducer<DrawingState, DrawAction> = (state, action) => {
  console.log("SWITCHING TO ", action.type);
  switch (action.type) {
    case "DRAW":
      if (DrawingState.BucketFill == state) {
        return DrawingState.BucketFill;
      } else {
        return DrawingState.Drawing;
      }

    case "ERASE":
      const erasePayload = action.payload as ErasePayload;
      erasePayload.eraseFunction(erasePayload.eraseArgs);
      return DrawingState.Erasing;

    case "MOUSE_UP":
    case "MOUSE_LEAVE":
      if (DrawingState.BucketFill == state) {
        return DrawingState.BucketFill;
      } else {
        return DrawingState.Idle;
      }

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
        {/* </CanvasSettingsContext.Provider> */}
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
 