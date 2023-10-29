import { useState, useContext } from "react";
import CanvasClear from "@/app/components/ClearCanvas";// Adjust the import path based on your project structure
// import { CanvasProvider } from "./CanvasContext";
import drawImageToBackGround from "@/app/components/DrawBackgroundCanvasImg";

type CanvasSettingsProps = {
  onSettingsChange: (color: string, radius: number) => void;
  // canvasRef: React.RefObject<HTMLCanvasElement>;
};

const CanvasSettings: React.FC<CanvasSettingsProps> = ({ onSettingsChange  }) => {
  const [color, setColor] =  useState('#000000'); // Default color is black
  const [radius, setRadius] = useState(5); // Default radius is 5
  const canvasRef = useContext(CanvasProvider)
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseInt(e.target.value, 10));
  };

  const handleApplySettings = () => {
    onSettingsChange(color, radius);
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
    <div>
      <label>
        Color:
        <input type="color" value={color} onChange={handleColorChange} />
      </label>
      <br />
      <label>
        Radius:
        <input type="number" value={radius} onChange={handleRadiusChange} />
      </label>
      <br />
      <button
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={handleApplySettings}
      >
        Apply Settings
      </button>
      <br />
      {/* <input type="file" onChange={handleFileChange} /> */}
      <CanvasClear canvasRef={canvasRef} />
    </div>
  );
};

export default CanvasSettings