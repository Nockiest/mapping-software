import { useContext, useRef } from "react";
import CanvasClear from "@/app/components/ClearCanvas";
import { BackgroundContext, CanvasContext,  CanvasContextType, CanvasSettingsType } from "../CanvasContext";//CanvasSettingsContext, 
import { DrawingState } from "@/public/types/ButtonEvents";
import MarkerEditorSettings from "./MarkerEditorSettings";
// import { CanvasSettingsProps } from "../layers/CanvasSettings";
import LineTypeSettings from "@/app/components/settings/LineTypeSettings";
import ActiveLayerSettings from "@/app/components/settings/ActiveLayerSettings";
import { hexToRgb } from "@/public/utils";
import { signal } from "@preact/signals";
import { settings } from "../StoredSettingsValues";
import { Color, Settings } from "@/public/types/OtherTypes";

 
const CanvasSettings = ( ) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const {backgroundImage, setBackgroundImage} = useContext(BackgroundContext)
  const changeSettings = <K extends keyof Settings['value']>(property: K, newValue: Settings['value'][K]) => {
    // Assuming settings is a mutable signal, otherwise, you might need to use `setSettings` if it's a state
    settings.value = { ...settings.value, [property]: newValue };
    
  };
  

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value as Color;
    // const rgbColor = hexToRgb(hexColor);
    changeSettings('color', hexColor);
  };

  // Handle radius change
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value, 10);
    const sanitizedRadius = newRadius < 0 ? 0 : newRadius;
    
    changeSettings('radius', sanitizedRadius);
  };

  // Handle active layer change
  const handleActiveLayerChange = (newActiveLayer: "draw" | "marker" | "background") => {
    changeSettings('activeLayer', newActiveLayer);
  };

  // Handle line type change
  const handleLineTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLineType = e.target.value as "rounded" | "squared";
    changeSettings('lineType', newLineType);
  };

  // Handle image revert
  const handleImageRevert = () => {
    setBackgroundImage(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  // Handle bucket fill
  const handleBucketFill = () => {
    dispatch({ type: 'ENTER_BUCKET_MODE' });
  };

  return (
    <div
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        border: 'black 1px solid',
        borderRadius: '4px',
      }}
    >
      <ActiveLayerSettings activeLayer={settings.value.activeLayer} handleActiveLayerChange={handleActiveLayerChange} />
      <br />
      {settings.value.activeLayer === 'draw' ? (
        <>
          <label>
            Color:
            <input type="color" value={settings.value.color} onChange={handleColorChange} />
          </label>
          <br />
          <label>
            Radius:
            <input type="number" value={settings.value.radius} onChange={handleRadiusChange} style={{ color: 'black' }} min="1" />
          </label>
          <br />
          {/* Dropdown for line type */}
          <LineTypeSettings lineType={settings.value.lineType} handleLineTypeChange={handleLineTypeChange} />
          <br />

          <br />
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setBackgroundImage(selectedFile);
              }
            }}
          />
          <br />
          {backgroundImage && <button onClick={handleImageRevert}>Revert Background Image</button>}
          <br />
          {/* Add the bucket fill button */}
          <button   onClick={handleBucketFill}>
            {/* style={{ backgroundColor: state === DrawingState.BucketFill ? 'red' : 'initial' }} */}
            Bucket Fill
          </button>
        </>
      ) : (
        <MarkerEditorSettings changeSettings={changeSettings} />
      )}

      {/* <CanvasClear canvasRef={canvasRef} /> */}
    </div>
  );
};

export default CanvasSettings;
