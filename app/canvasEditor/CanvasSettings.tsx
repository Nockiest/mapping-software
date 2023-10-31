import { useState, useContext, useEffect, useRef } from "react";
import CanvasClear from "@/app/components/ClearCanvas";// Adjust the import path based on your project structure
 
import { BackgroundContext, CanvasContext, CanvasSettingsContext } from "./CanvasContext";
 
type CanvasSettingsProps = {
  onSettingsChange: (color: string, radius: number) => void;
  // canvasRef: React.RefObject<HTMLCanvasElement>;
};

 
const CanvasSettings: React.FC<CanvasSettingsProps> = ({ onSettingsChange }) => {
  const { settings, setSettings } = useContext(CanvasSettingsContext);
  const canvasRef = useContext(CanvasContext);
  const { setBackgroundImage, backgroundImage } = useContext(BackgroundContext);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({ ...prevSettings, color: e.target.value }));
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value, 10);

    // Check if the new radius is less than 0, set it to 0
    const sanitizedRadius = newRadius < 0 ? 0 : newRadius;

    setSettings((prevSettings) => ({ ...prevSettings, radius: sanitizedRadius }));
  };

  const handleImageRevert = () => {
    setBackgroundImage(null);

    // Reset the value of the image input
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    
    // Add additional logic here if needed
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
      <input
        type="file"
        ref={imageInputRef}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setBackgroundImage(selectedFile);
          }
          // Add additional logic here if needed
        }}
      />
      <br />
      {backgroundImage && <button onClick={handleImageRevert}>Revert Background Image</button>}
      <br />
      <br />
      <CanvasClear canvasRef={canvasRef} />
    </div>
  );
};

export default CanvasSettings;