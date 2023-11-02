"use client";
import React, { useRef, useState, createContext, useContext, ReactNode, useEffect } from "react";
import CanvasToImage from "../components/CanvasToImg";
import DrawingCanvas from "./CanvasEditor";
import CanvasSettings from "./settings/CanvasSettings";
import DebugInfo from "../components/Debugger";
import Timeline from "./Timeline";
import { CanvasContext, CanvasProvider, CanvasSettingsContext } from "./CanvasContext";

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
  const { settings, setSettings } = useContext(CanvasSettingsContext);
  const { canvasState } = useContext(CanvasContext);
  const mousePosition = useContext(MousePositionContext);

  const handleSettingsChange = (color: string, radius: number) => {
    setSettings({ color, radius });
  };

  // Use mousePosition wherever needed

  return (
    <>
      <DebugInfo
        data={{
          radius: settings.radius,
          canvasState: canvasState,
          lineType: settings.lineType,
          color: settings.color,
          layer: settings.activeLayer,
          mousePosition: mousePosition,
        }}
      />
      <CanvasSettings onSettingsChange={handleSettingsChange} />
      <DrawingCanvas color={settings.color} radius={settings.radius} />
      <Timeline />
    </>
  );
};

const App: React.FC = () => {
  return (
    <CanvasProvider>
      <MousePositionProvider>
        {/* Your app content */}
        <Page />
      </MousePositionProvider>
    </CanvasProvider>
  );
};

export default App;
