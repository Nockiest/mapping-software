"use client"
 
import React, { useRef, useState, createContext, useContext, ReactNode } from 'react';
import CanvasToImage from '../components/CanvasToImg';
import DrawingCanvas from './CanvasEditor';
import CanvasSettings from './CanvasSettings';
import DebugInfo from '../components/Debugger';
import Timeline from './Timeline';
import { CanvasProvider, CanvasSettingsContext } from './CanvasContext';
 
// Now, your Page component using the CanvasProvider and the useCanvas hook
const Page: React.FC = () => {
  const {settings, setSettings } =  useContext(CanvasSettingsContext)
 
  const handleSettingsChange = (color: string, radius: number) => {
    setSettings({ color, radius });
  };

  return (
 
    <>
      <DebugInfo data={{ radius: settings.radius }} />
      <CanvasSettings onSettingsChange={handleSettingsChange} />
      <DrawingCanvas color={settings.color} radius={settings.radius} />
      <Timeline />
    </>
  );
};
 
// Wrap your application or the relevant part of it with the CanvasProvider
const App: React.FC = () => {
  return (
    <CanvasProvider>
      {/* Your app content */}
      <Page />
    </CanvasProvider>
  );
};

export default App 