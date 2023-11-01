"use client";

import React, { useRef, useState, createContext, useContext, ReactNode } from "react";
import CanvasToImage from "../components/CanvasToImg";
import DrawingCanvas from "./CanvasEditor";
import CanvasSettings from "./settings/CanvasSettings";
import DebugInfo from "../components/Debugger";
import Timeline from "./Timeline";
import { CanvasContext, CanvasProvider, CanvasSettingsContext } from "./CanvasContext";
// Now, your Page component using the CanvasProvider and the useCanvas hook
const Page: React.FC = () => {
  const { settings, setSettings } = useContext(CanvasSettingsContext);
  const { canvasState    } = useContext(CanvasContext);

  const handleSettingsChange = (color: string, radius: number) => {
    setSettings({ color, radius });
  };

  return (
    <>
      <DebugInfo data={{ radius: settings.radius, canvasState: canvasState,  lineType:settings.lineType, color: settings.color, layer:settings.activeLayer }} />
      <CanvasSettings onSettingsChange={handleSettingsChange} />
      <DrawingCanvas color={settings.color} radius={settings.radius} />
      <Timeline />
    </>
  );
};

 
const App: React.FC = () => {
  return (
    <CanvasProvider>
      {/* Your app content */}
      <Page />
    </CanvasProvider>
  );
};

export default App;
