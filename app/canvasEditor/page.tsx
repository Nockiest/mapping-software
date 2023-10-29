"use client"
import React, { useRef, useState, createContext } from 'react';
import CanvasToImage from '../components/CanvasToImg';
import CanvasEditor from './CanvasEditor';
import CanvasSettings from './CanvasSettings';  
import DebugInfo from '../components/Debugger';
import DualCanvas from '../components/DualCanvas';
// import { useCanvas, CanvasProvider } from './CanvasContext';

 
 

const Page: React.FC = () => {
  // const { canvasRef, backgroundCanvasRef } = useCanvas();
  const [drawingSettings, setDrawingSettings] = useState<{ color: string; radius: number }>({
    color: '#000000',
    radius: 5,
  });

  const handleSettingsChange = (color: string, radius: number) => {
    setDrawingSettings({ color, radius });
  };

  return (
    <div >
      {/* <DebugInfo data={{ radius: drawingSettings.radius }} />   */}
      {/* <CanvasSettings onSettingsChange={handleSettingsChange} /> */}
      <CanvasEditor color={drawingSettings.color} radius={drawingSettings.radius} />
      {/* <DualCanvas /> */}
      </div>
  );
};

 
// const App: React.FC = () => {
//   return (
//     <CanvasProvider>
//       {/* Your app content */}
//       <Page />
//     </CanvasProvider>
//   );
// };

// export default App;