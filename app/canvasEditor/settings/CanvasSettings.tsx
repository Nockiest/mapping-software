import { useContext, useRef } from "react";
import CanvasClear from "@/app/components/utility/ClearCanvas";
import { BackgroundContext, CanvasContext,  CanvasContextType, CanvasSettingsType } from "../CanvasContext";//CanvasSettingsContext, 
import { DrawingState } from "@/public/types/ButtonEvents";
import MarkerEditorSettings from "./MarkerEditorSettings";
import LineTypeSettings from "@/app/components/settings/LineTypeSettings";
import ActiveLayerSettings from "@/app/components/settings/ActiveLayerSettings";
import { hexToRgb } from "@/public/utils";
import { signal } from "@preact/signals";
import { settings } from "../Signals";
import { Color, Settings } from "@/public/types/OtherTypes";
import DrawingLayerSettings from "./DrawingLayerSettings";
import BackgroundLayerSettings from "./BackgroundLayerSettings";
import FrontlineLayerSettings from "./FrontlineLayerSettings";
 
const CanvasSettings = ( ) => {
 
  // const imageInputRef = useRef<HTMLInputElement>(null);
 
  const changeSettings = <K extends keyof Settings['value']>(property: K, newValue: Settings['value'][K]) => {
    // Assuming settings is a mutable signal, otherwise, you might need to use `setSettings` if it's a state
    settings.value = { ...settings.value, [property]: newValue };
    
  };
  
  

  return (
    <div
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        border: 'black 1px solid',
        borderRadius: '4px',
        height: '200px',
        overflow: 'auto',  // Add this line for scrollability
      }}
    >
      <ActiveLayerSettings />
      {/* handleActiveLayerChange={handleActiveLayerChange} */}
      <br />
      {settings.value.activeLayer === 'draw' ? (
        <DrawingLayerSettings />
      ) : settings.value.activeLayer === 'marker' ? (
        <MarkerEditorSettings changeSettings={changeSettings} />
      ) : settings.value.activeLayer === 'background' ?(
        <BackgroundLayerSettings />
      ): (
        <FrontlineLayerSettings />
      )}
      {/* <CanvasClear canvasRef={canvasRef} /> */}
</div>

  );
};

export default CanvasSettings;