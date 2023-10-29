"use client"
import React, { useRef, useEffect, useState } from 'react';
import CanvasToImage from '../components/CanvasToImg';
import DrawingCanvas from './editor/CanvasEditor';
import CanvasSettings from './editor/CanvasSettings';  
import DebugInfo from '../components/Debugger';

 

const Page: React.FC = () => {
  const [drawingSettings, setDrawingSettings] = useState<{ color: string; radius: number }>({
    color: '#000000',
    radius: 5,
  });

  const handleSettingsChange = (color: string, radius: number) => {
    setDrawingSettings({ color, radius });
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <div>
      <DebugInfo data={{radius: drawingSettings.radius}} />
      <CanvasSettings onSettingsChange={handleSettingsChange} canvasRef={canvasRef} />
      <DrawingCanvas color={drawingSettings.color} radius={drawingSettings.radius} />
    </div>
  );
};

export default Page