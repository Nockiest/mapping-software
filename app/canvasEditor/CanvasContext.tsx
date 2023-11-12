import { createContext, useContext, useState, useRef, useReducer,ReactNode ,Reducer , Dispatch } from "react";
import {DrawAction,DrawingState, ErasePayload, Settings } from "@/public/types/OtherTypes";
import { Vector2 } from "@/public/types/GeometryTypes";
import { EraseArgs } from "../components/drawing/Eraser";
import { DrawPayload } from "../components/drawing/LineDrawer";
import { FrontlineData } from "./layers/FronlineLayer";

export interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement | undefined>;
  markerCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  frontlineCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  frontLines: FrontlineData[], 
  setFrontlines:  React.Dispatch<React.SetStateAction<FrontlineData[]>>
}

export interface BackgroundContextType {
  backgroundCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

type UpdateGlobalDataType = (paramName: keyof GlobalDataType, paramValue: any) => void;

export type GlobalDataContextType = {
  GlobalData: GlobalDataType;
  updateGlobalData: UpdateGlobalDataType;
}

export interface CanvasSettingsType {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}
type GlobalDataType = {
  mouseDownTime:number
}
 
export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);
export const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);
export const GlobalDataContext = createContext<GlobalDataContextType| undefined >(undefined); 


export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | undefined>(null);
  const markerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frontlineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frontLines, setFrontlines] = useState<FrontlineData[]>([])
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [globalData, setGlobalData] = useState<GlobalDataType>({ mouseDownTime: 0 });

  const canvasContextValue: CanvasContextType = {
    canvasRef,
    markerCanvasRef,
    frontlineCanvasRef,
    frontLines, 
    setFrontlines
  };

  const backgroundContextValue: BackgroundContextType = {
    backgroundCanvasRef,
  };

  const updateGlobalData:UpdateGlobalDataType = (paramName , paramValue ) => {
    setGlobalData((prevData) => ({
      ...prevData,
      [paramName]: paramValue,
    }));
  };

  const globalDataContextValue: GlobalDataContextType = {
    GlobalData: globalData,
    updateGlobalData,
  };

  return (
    <CanvasContext.Provider value={canvasContextValue}>
      <BackgroundContext.Provider value={backgroundContextValue}>
        <GlobalDataContext.Provider value={globalDataContextValue}>
          {children}
        </GlobalDataContext.Provider>
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

export const useBackground = () => {
  const context = useContext(BackgroundContext);

  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }

  return context;
};

export const useGlobalValue = () => {
  const context = useContext(GlobalDataContext);

  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }

  return context;
};

 
 