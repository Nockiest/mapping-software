import { useState, useContext, useEffect } from "react";
import CanvasClear from "@/app/components/ClearCanvas";// Adjust the import path based on your project structure
 
import { CanvasContext, CanvasSettingsContext } from "./page";
 
type CanvasSettingsProps = {
  onSettingsChange: (color: string, radius: number) => void;
  // canvasRef: React.RefObject<HTMLCanvasElement>;
};

 
const CanvasSettings: React.FC<CanvasSettingsProps> = ({ onSettingsChange }) => {
  const { settings, setSettings } = useContext(CanvasSettingsContext);
  const canvasRef = useContext(CanvasContext);
 
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({ ...prevSettings, color: e.target.value }));
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({ ...prevSettings, radius: parseInt(e.target.value, 10) }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile){
      return
    }
    // const canvas = canvasRef.current;
    // const ctx = canvas.getContext("2d");
    // drawImageToBackGround(ctx, selectedFile)
    // if (selectedFile) {
    //   setImage(selectedFile);
    //   loadImage(selectedFile);
    //   setFileExtension(getExtension(selectedFile))
    // }
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
      <br />
      <CanvasClear canvasRef={canvasRef} />
    </div>
  );
};

export default CanvasSettings

 