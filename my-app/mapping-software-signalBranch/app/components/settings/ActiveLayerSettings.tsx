import React from 'react'
import { settings } from '@/app/canvasEditor/Signals';
type ActiveLayerSettingsProps = {
    activeLayer: "draw" | "marker" | "background"| "frontline";
    handleActiveLayerChange: (newActiveLayer: "draw" | "marker" | "background"| "frontLine") => void;
  };
  
  // { activeLayer, handleActiveLayerChange }
  // ActiveLayerSettings component
  const ActiveLayerSettings: React.FC<ActiveLayerSettingsProps> = ( ) => {
    const handleActiveLayerChange = (newActiveLayer: "draw" | "marker" | "background"| "frontLine") => {
      settings.value = { ...settings.value, activeLayer: newActiveLayer };
  };
    return (
      <label>
        Active Layer:
        <select value={settings.value.activeLayer} onChange={(e) => handleActiveLayerChange(e.target.value as "draw" | "marker" | "background")} className="text-black">
          <option value="draw">Draw</option>
          <option value="marker">Marker</option>
          <option value="background">Background</option>
          <option value="frontLine">Front Line</option>
        </select>
      </label>
    );
  };
  
export default ActiveLayerSettings