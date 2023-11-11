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
  const [mouseDownTimeStamp, setMouseDownTimeStamp] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    // e.preventDefault()
    console.log("PRESSED");
    if (e.button === 2) {e.preventDefault() }
      // Right mouse button is pressed
      setMouseDownTimeStamp(Date.now());
    // }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // if (e.button === 2 && rightMouseDownTime !== null) {
      // Right mouse button is released
      // const rightMouseUpTime = Date.now();
      // const timePressed = rightMouseUpTime - rightMouseDownTime;

      // Update GlobalData or perform any other action
      // updateGlobalData({ ...GlobalData, rightMouseDownTime: timePressed });

      // Print the duration pressed
      // console.log(`Right mouse button pressed for ${timePressed} milliseconds`);

      // Reset the elapsed time state to 0
      setElapsedTime(0);
      setMouseDownTimeStamp(null);
    // }
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

  useEffect(() => {
    // Update elapsed time while the button is pressed
    if (mouseDownTimeStamp !== null) {
      const intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 100);
        updateGlobalData("mouseDownTime", elapsedTime + 100); // Use the current state value directly
      }, 100);
  
      return () => clearInterval(intervalId);
    }
  }, [mouseDownTimeStamp, elapsedTime]);
  
  useEffect(() => {
  
        updateGlobalData("mouseDownTime", elapsedTime ); // Use the current state value directly
      
 
  }, [ elapsedTime]);
  

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
          mousDownTime: elapsedTime,
          GlobalData:GlobalData.mouseDownTime
        }}
      />
      
      <CanvasSettings />
      <DrawingCanvas />
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
