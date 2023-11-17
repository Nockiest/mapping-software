"use client";
import React, {
  useRef,
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import CanvasToImage from "../components/utility/CanvasToImg";
import DrawingCanvas from "./CanvasEditor";
import CanvasSettings from "./settings/CanvasSettings";
import DebugInfo from "../components/utility/Debugger";
import Timeline from "./Timeline";
import {
  CanvasContext,
  CanvasProvider,
 
  useCanvas,
  useGlobalValue,
} from "./CanvasContext"; //CanvasSettingsContext
import { markers, settings } from "./Signals";
import LayerSplicer from "../components/utility/LayerSplicer";
import { Button, Typography, Paper } from '@mui/material';
import { Vector2 } from "@/public/types/GeometryTypes";
import { theme } from "./theme/theme";
import { ThemeProvider, createTheme} from "@mui/material"
import { MousePositionContext, MousePositionProvider } from "./MouseContext";
 

const Page: React.FC = () => {
  const {   canvasRef, frontlineCanvasRef, markerCanvasRef,backgroundCanvasRef } =
    useCanvas();
 
  const mousePosition = useContext(MousePositionContext);
  const { GlobalData, updateGlobalData } = useGlobalValue();
  const [mouseDownTimeStamp, setMouseDownTimeStamp] = useState<number | null>(
    null
  );
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const handleMouseDown = (e:  MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault();
    }
    setMouseDownTimeStamp(Date.now());
  };

  const handleMouseUp = (e:  MouseEvent) => {
    e.preventDefault();

    // Using requestAnimationFrame to delay the execution until the next frame
    requestAnimationFrame(() => {
      setElapsedTime(0);
      setMouseDownTimeStamp(null);
    });
  };

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp, true);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp, true);
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
    updateGlobalData("mouseDownTime", elapsedTime); // Use the current state value directly
  }, [elapsedTime]);

  return (
    <  >
      <DebugInfo
        data={{
          radius: settings.value.radius,
          // canvasState: canvasState,
          color: settings.value.color,
          layer: settings.value.activeLayer,
          mousePosition: mousePosition,
          mousDownTime: elapsedTime,
          // numMarkers:markers.value.length
          // markerImage: settings.value.markerSettings.imageURL
          // activeFrontLine: frontLineSettings.value.activeFrontline?.idNum,
          // GlobalData: GlobalData.mouseDownTime,
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
        <ThemeProvider theme = {theme}>
            <Page />
        </ThemeProvider>
        
      </MousePositionProvider>
    </CanvasProvider>
  );
};

export default App;
 