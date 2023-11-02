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
import { Settings } from "@/public/types/OtherTypes";

export const settings:Settings = signal({
  radius: 5,
  color: `#000000`,
  lineType: "squared",
  activeLayer: "draw",
  markerSettings: { width: 10, color: `#000000`, topValue: "X", bottomValue: "Y" },
});

const CanvasSettings = ({ onSettingsChange }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const changeSettings = (property: string, value: any) => {
    // Assuming settings is a mutable signal, otherwise, you might need to use `setSettings` if it's a state
    settings.value[property] = value;
  };

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;
    const rgbColor = hexToRgb(hexColor);
    changeSettings('color', rgbColor);
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
      <ActiveLayerSettings activeLayer={settings.activeLayer} handleActiveLayerChange={handleActiveLayerChange} />
      <br />
      {settings.activeLayer === 'draw' ? (
        <>
          <label>
            Color:
            <input type="color" value={settings.color} onChange={handleColorChange} />
          </label>
          <br />
          <label>
            Radius:
            <input type="number" value={settings.radius} onChange={handleRadiusChange} style={{ color: 'black' }} />
          </label>
          <br />
          {/* Dropdown for line type */}
          <LineTypeSettings lineType={settings.lineType} handleLineTypeChange={handleLineTypeChange} />
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
          <button style={{ backgroundColor: state === DrawingState.BucketFill ? 'red' : 'initial' }} onClick={handleBucketFill}>
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
