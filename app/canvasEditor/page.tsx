"use client"
import React, { useRef, useState, createContext, useContext, ReactNode } from 'react';
import CanvasToImage from '../components/CanvasToImg';
import DrawingCanvas from './CanvasEditor';
import CanvasSettings from './CanvasSettings';
import DebugInfo from '../components/Debugger';

// Create a context for the canvas
interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);
export const BackgroundContext = createContext<CanvasContextType | undefined>(undefined);

// Create a provider to wrap your components with
export const CanvasProvider: React.FC = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <CanvasContext.Provider value={{ canvasRef }}>
      <BackgroundContext.Provider value={{ canvasRef }}>
        {children}
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

// Now, your Page component using the CanvasProvider and the useCanvas hook
const Page: React.FC = () => {
  // const canvasRef = useCanvas();
  const [drawingSettings, setDrawingSettings] = useState<{ color: string; radius: number }>({
    color: '#000000',
    radius: 5,
  });

  const handleSettingsChange = (color: string, radius: number) => {
    setDrawingSettings({ color, radius });
  };

  return (
    <>
      <DebugInfo data={{ radius: drawingSettings.radius }} />
      <CanvasSettings onSettingsChange={handleSettingsChange} />
      <DrawingCanvas color={drawingSettings.color} radius={drawingSettings.radius} />
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

export default App;