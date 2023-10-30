import { useState, useContext, useEffect } from "react";
import CanvasClear from "@/app/components/ClearCanvas";// Adjust the import path based on your project structure
import { CanvasContext } from "./page";

type CanvasSettingsProps = {
  onSettingsChange: (color: string, radius: number) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

const CanvasSettings: React.FC<CanvasSettingsProps> = ({ onSettingsChange  }) => {
  const [color, setColor] =  useState('#000000'); // Default color is black
  const [radius, setRadius] = useState(5); // Default radius is 5
  const canvasRef = useContext(CanvasContext)
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseInt(e.target.value, 10));
  };

  // const handleApplySettings = () => {
  //   onSettingsChange(color, radius);
  // };

  useEffect(() => {
    onSettingsChange(color, radius) 
  }, [color, radius])

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
      {/* <button
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
      </button> */}
      <br />
      <CanvasClear canvasRef={canvasRef} />
    </div>
  );
};

export default CanvasSettings