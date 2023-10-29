import { useState } from "react";

const CanvasSettings: React.FC<{ onSettingsChange: (color: string, radius: number) => void }> = ({ onSettingsChange }) => {
    const [color, setColor] = useState('#000000'); // Default color is black
    const [radius, setRadius] = useState(5); // Default radius is 5
  
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setColor(e.target.value);
    };
  
    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRadius(parseInt(e.target.value, 10));
    };
  
    const handleApplySettings = () => {
      onSettingsChange(color, radius);
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
        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleApplySettings}>
        Apply Settings
      </button>
      </div>
    );
  };

  export default CanvasSettings