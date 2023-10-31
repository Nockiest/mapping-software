import { useContext, useRef } from "react";
import CanvasClear from "@/app/components/ClearCanvas";
import { BackgroundContext, CanvasContext, CanvasSettingsContext, CanvasContextType, CanvasSettingsType } from "../CanvasContext";
import { DrawingState } from "@/public/types/ButtonEvents";
import MarkerEditorSettings from "./MarkerEditorSettings";
import { CanvasSettingsProps } from "../layers/CanvasSettings";
import LineTypeSettings from "@/app/components/settings/LineTypeSettings";
import ActiveLayerSettings from "@/app/components/settings/ActiveLayerSettings";

 const CanvasSettings: React.FC<CanvasSettingsProps> = ({ onSettingsChange }) => {
  const { settings, setSettings } = useContext<CanvasSettingsType>(CanvasSettingsContext);
  const { canvasRef, dispatch, state } = useContext<CanvasContextType>(CanvasContext);
  const { setBackgroundImage, backgroundImage } = useContext<CanvasContextType>(BackgroundContext);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Handle color change, radius change, and additional logic for active layer change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({ ...prevSettings, color: e.target.value }));
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value, 10);
    const sanitizedRadius = newRadius < 0 ? 0 : newRadius;
    setSettings((prevSettings) => ({ ...prevSettings, radius: sanitizedRadius }));
  };

  const handleImageRevert = () => {
    setBackgroundImage(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    // Additional logic here if needed
  };

  const handleBucketFill = () => {
    dispatch({ type: "ENTER_BUCKET_MODE" });
  };

  // Handle active layer change
  const handleActiveLayerChange = (newActiveLayer: "draw" | "marker" | "background") => {
    setSettings((prevSettings) => ({ ...prevSettings, activeLayer: newActiveLayer }));
  };

  // Handle line type change
  const handleLineTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLineType = e.target.value as "rounded" | "squared";
    setSettings((prevSettings) => ({ ...prevSettings, lineType: newLineType }));
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
      {settings.activeLayer === "draw" ? (
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
          <ActiveLayerSettings activeLayer={settings.activeLayer} handleActiveLayerChange={handleActiveLayerChange} />
          {/* Dropdown for active layer */}
          {/* <label>
            Active Layer:
            <select value={settings.activeLayer} onChange={(e) => handleActiveLayerChange(e.target.value as "draw" | "marker" | "background")} className="text-black">
              <option value="draw">Draw</option>
              <option value="marker">Marker</option>
              <option value="background">Background</option>
            </select>
          </label> */}
          <br />
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setBackgroundImage(selectedFile);
              }
              // Additional logic here if needed
            }} />
          <br />
          {backgroundImage && <button onClick={handleImageRevert}>Revert Background Image</button>}
          <br />
          {/* Add the bucket fill button */}
          <button style={{ backgroundColor: state === DrawingState.BucketFill ? 'red' : 'initial' }} onClick={handleBucketFill}>
            Bucket Fill
          </button>
        </>
      ) : (
        <MarkerEditorSettings />
      )}

      <CanvasClear canvasRef={canvasRef} />
    </div>
  );
};
export default CanvasSettings