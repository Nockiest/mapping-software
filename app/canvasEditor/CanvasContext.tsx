import {createContext, useContext, useState, useRef, useReducer } from "react"
import { DrawingState } from "@/public/types/ButtonEvents";
export interface CanvasContextType {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
  }
export interface CanvasSettingsType {
    settings: Settings
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  }

 

type Settings = {
    radius:number,
    color: string
    lineType: "square" | "rounded"
  }

export type DrawAction =
  | { type: "DRAW" }
  | { type: "ERASE"  }  
  | { type: "MOUSE_UP" }
  | { type: "MOUSE_LEAVE" }
  | { type: "ENTER_BUCKET_MODE" }
  ;
    

const reducer: React.Reducer<DrawingState, DrawAction> = (state, action) => {
    // console.log("SWITCHING TO ", action.type)
    switch (action.type) {
      case "DRAW":
        if (DrawingState.BucketFill== state) {
            return DrawingState.BucketFill;
        } else {
            return DrawingState.Drawing;
        }
       
      case "ERASE":
        if (DrawingState.BucketFill== state) {
            return  DrawingState.BucketFill;
        } else {
            return DrawingState.Erasing;
        }
    
      case "MOUSE_UP":
    //   case "MOUSE_LEAVE":
        if (DrawingState.BucketFill== state) {
            return DrawingState.BucketFill;
        } else {
            return DrawingState.Idle;
        }
         
      case "ENTER_BUCKET_MODE":
        return DrawingState.BucketFill === state? DrawingState.Idle: DrawingState.BucketFill;
      default:
        console.error("INVALID ACTION: " + action.type);
        return state;
    }
  };

  export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);
  export const BackgroundContext = createContext<CanvasContextType | undefined>(undefined);
  export const CanvasSettingsContext = createContext<CanvasSettingsType | undefined>(undefined);
 
  
  export const CanvasProvider: React.FC = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [settings, setSettings] = useState<Settings>({radius: 5, color:"black", lineType: "square"});
    const backgroundCanvasRef  = useRef<HTMLCanvasElement | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const [canvasState, dispatch] = useReducer(reducer, DrawingState.Idle);
    return (
      <CanvasContext.Provider value={{ canvasRef, canvasState, dispatch }}>
        <BackgroundContext.Provider value={{ backgroundCanvasRef , backgroundImage, setBackgroundImage}}>
          <CanvasSettingsContext.Provider  value={{ settings, setSettings }}>
           {children}
          </CanvasSettingsContext.Provider>
        </BackgroundContext.Provider>
      </CanvasContext.Provider>
    );
  };
  
  export const useCanvas = () => {
    const context = useContext(CanvasContext);
  
    if (!context) {
      throw new Error('useCanvas must be used within a CanvasProvider');
    }
  
    return context;
  };
  
  export const useBackground = () => {
    const context = useContext(BackgroundContext);
  
    if (!context) {
      throw new Error('useBackground must be used within a CanvasProvider');
    }
  
    return context;
  };
  
  export const useCanvasSettings = () => {
    const context = useContext(CanvasSettingsContext);
    
    if (!context) {
        throw new Error('useCanvasSettings must be used within a CanvasProvider');
    }
  
    return context;
  };
  