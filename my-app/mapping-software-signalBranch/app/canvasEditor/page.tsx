"use client";
import React, { useRef, useState, createContext, useContext, ReactNode, useEffect } from "react";
import CanvasToImage from "../components/CanvasToImg";
import DrawingCanvas from "./CanvasEditor";
import CanvasSettings from "./settings/CanvasSettings";
import DebugInfo from "../components/Debugger";
import Timeline from "./Timeline";
import { CanvasContext, CanvasProvider, useCanvas,   } from "./CanvasContext";//CanvasSettingsContext
import { settings } from "./Signals";
// Create a context for mouse position
export const MousePositionContext = createContext<{ x: number; y: number } | null>(null);

// Create a provider for mouse position
const MousePositionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  const updateMousePosition = (x: number, y: number) => {
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <MousePositionContext.Provider value={mousePosition}>
      {children}
    </MousePositionContext.Provider>
  );
};

const Page: React.FC = () => {
  const { canvasState } = useCanvas( );
  const mousePosition = useContext(MousePositionContext);

  return (
    <>
      <DebugInfo
        data={{
          radius: settings.value.radius,
          canvasState: canvasState,
          lineType: settings.value.lineType,
          color: settings.value.color,
          layer: settings.value.activeLayer,
          mousePosition: mousePosition,
        }}
      />
      <CanvasSettings  />  
      <DrawingCanvas   />
      <Timeline />
    </>
  );
};

const App: React.FC = () => {
  return (
    <CanvasProvider>
      <MousePositionProvider>
        <Page />
      </MousePositionProvider>
    </CanvasProvider>
  );
};

export default App;
