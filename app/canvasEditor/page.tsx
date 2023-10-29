"use client"
import React, { useRef, useEffect, useState, createContext, useContext, } from 'react';
import CanvasToImage from '../components/CanvasToImg';
import DrawingCanvas from './editor/CanvasEditor';
import CanvasSettings from './editor/CanvasSettings';  
import DebugInfo from '../components/Debugger';

 
 
// Create a context for the canvas
interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

// Create a provider to wrap your components with
// export const CanvasProvider: React.FC = ({ children }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   return (
//     <CanvasContext.Provider value={{ canvasRef }}>
//       {children}
//     </CanvasContext.Provider>
//   );
// };

// Create a hook to use the canvas context this is usefull
export const useCanvas = () => {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }

  return context;
};
// const CanvasContext = createContext<UserContextType | null>(null);
// Now, your Page component using the CanvasProvider and the useCanvas hook
const Page: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawingSettings, setDrawingSettings] = useState<{ color: string; radius: number }>({
    color: '#000000',
    radius: 5,
  });

  const handleSettingsChange = (color: string, radius: number) => {
    setDrawingSettings({ color, radius });
  };

  return (
    <CanvasContext.Provider value={canvasRef}>
      <DebugInfo data={{ radius: drawingSettings.radius }} />
      <CanvasSettings onSettingsChange={handleSettingsChange} />
      <DrawingCanvas color={drawingSettings.color} radius={drawingSettings.radius} />
    </CanvasContext.Provider>
  );
};
export default Page
// // Wrap your application or the relevant part of it with the CanvasProvider
// const App: React.FC = () => {
//   return (
//     <CanvasProvider>
//       {/* Your app content */}
//       <Page />
//     </CanvasProvider>
//   );
// };

// export default App;