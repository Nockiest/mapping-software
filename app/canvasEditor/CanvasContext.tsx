import {
  createContext,
  useContext,
  useState,
  useRef,
  useReducer,
  ReactNode,
  Reducer,
  Dispatch,
  useEffect,
} from "react";
import {
  DrawAction,
  DrawingState,
  ErasePayload,
  Settings,
} from "@/public/types/OtherTypes";
import { Vector2 } from "@/public/types/GeometryTypes";
import { EraseArgs } from "../components/drawing/Eraser";
import { DrawPayload } from "../components/drawing/LineDrawer";
import { FrontlineData } from "./layers/FronlineLayer";
import { movePosByOffset } from "../components/utility/CanvasUtils";
import { editorTopLeftPosition } from "./Signals";


export interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement | undefined>;
  markerCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  frontlineCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  backgroundCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  compiledCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  frontLines: FrontlineData[];
  setFrontlines: React.Dispatch<React.SetStateAction<FrontlineData[]>>;
  // timeLine:TimelineType;
  // setTimeline: React.Dispatch<React.SetStateAction<HTMLCanvasElement[]>>;
}

export interface BackgroundContextType {
  backgroundCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

type UpdateGlobalDataType = (
  paramName: keyof GlobalDataType,
  paramValue: any
) => void;

export type GlobalDataContextType = {
  GlobalData: GlobalDataType;
  updateGlobalData: UpdateGlobalDataType;
};

export interface CanvasSettingsType {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}
type GlobalDataType = {
  mouseDownTime: number;
  mousePosition: Vector2 | null;
  editorRelativePosition: Vector2 | null;
};

export const CanvasContext = createContext<CanvasContextType | undefined>(
  undefined
);
export const BackgroundContext = createContext<
  BackgroundContextType | undefined
>(undefined);
export const GlobalDataContext = createContext<
  GlobalDataContextType | undefined
>(undefined);

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const markerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frontlineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const compiledCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frontLines, setFrontlines] = useState<FrontlineData[]>([]);
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [globalData, setGlobalData] = useState<GlobalDataType>({
    mouseDownTime: 0,
    mousePosition: null,
    editorRelativePosition: null,
  });
  // const [timeLine, setTimeline] = useState<TimelineType>([])

  const canvasContextValue: CanvasContextType = {
    canvasRef,
    markerCanvasRef,
    frontlineCanvasRef,
    backgroundCanvasRef,
    compiledCanvasRef,
    frontLines,
    setFrontlines,
    // timeLine,
    // setTimeline
  };

  const backgroundContextValue: BackgroundContextType = {
    backgroundCanvasRef,
  };

  const updateGlobalData: UpdateGlobalDataType = (paramName, paramValue) => {
    setGlobalData((prevData) => ({
      ...prevData,
      [paramName]: paramValue,
    }));
  };

  const globalDataContextValue: GlobalDataContextType = {
    GlobalData: globalData,
    updateGlobalData,
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY };
      updateGlobalData("mousePosition", mousePos);

      if (editorTopLeftPosition.value) {
        const editorRelativePos = movePosByOffset(mousePos, {
          x: -editorTopLeftPosition.value.x,
          y: -editorTopLeftPosition.value.y,
        });
        updateGlobalData("editorRelativePosition", editorRelativePos);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [editorTopLeftPosition]); // Now it depends on editorTopLeftPosition

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
