"use client";
import React, { useRef, useState, createContext, useContext, ReactNode, useEffect } from "react";
import CanvasToImage from "../components/utility/CanvasToImg";
import DrawingCanvas from "./CanvasEditor";
import CanvasSettings from "./settings/CanvasSettings";
import DebugInfo from "../components/utility/Debugger";
import Timeline from "./Timeline";
import { CanvasContext, CanvasProvider, useCanvas, useGlobalValue,   } from "./CanvasContext";//CanvasSettingsContext
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
  const { canvasState } = useCanvas();
  const mousePosition = useContext(MousePositionContext);
  const { GlobalData, updateGlobalData } = useGlobalValue();
  const [rightMouseDownTime, setRightMouseDownTime] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) {
      // Right mouse button is pressed
      setRightMouseDownTime(Date.now());
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button === 2 && rightMouseDownTime !== null) {
      // Right mouse button is released
      const rightMouseUpTime = Date.now();
      const timePressed = rightMouseUpTime - rightMouseDownTime;

      // Update GlobalData or perform any other action
      updateGlobalData({ ...GlobalData, rightMouseDownTime: timePressed });

      // Reset the rightMouseDownTime state
      setRightMouseDownTime(null);
    }
  };

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
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
          RIghtClkTime:rightMouseDownTime
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
