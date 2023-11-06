import { useContext, useState, useRef } from "react";
import { CanvasSettingsType } from "../CanvasContext"; // CanvasSettingsContext,
import { hexToRgb } from "@/public/utils";
import { settings } from "../Signals";
import FavoriteColorLister from "@/app/components/settings/FavoriteColorLister";
import { Color } from "@/public/types/OtherTypes";
import { signal } from "@preact/signals";
import Marker from "@/app/components/markerLayer/Marker";
 
type UpdateMarkerSettingsCallback = (value: any) => void;
export const newMarkerSettings = signal({ ...settings.value.markerSettings })

const MarkerEditorSettings = ({ changeSettings }) => {
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

  const updateMarkerSettings = (  
    value: any,
    property: string,
    callback?: UpdateMarkerSettingsCallback) => {
    // Update temporary marker settings
    newMarkerSettings.value = { ...newMarkerSettings.value, [property]: value };

    // Call the provided callback
    if (callback) {
      callback(value);
    }

    // Set the dirty flag
    setIsDirty(true);
  };

  const applyChanges = () => {
    changeSettings('markerSettings', newMarkerSettings.value);
    setIsDirty(false);
  };

  // Validation message
  const validationMessage = isDirty ? "Changes not applied. Click 'Apply Changes' to save." : "";

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* First Column - Input Controls */}
      <div>
        <p style={{ color: 'black' }}>
          Marker Width: {newMarkerSettings.value.width}
          <input type="range" value={newMarkerSettings.value.width} onChange={(e) => updateMarkerSettings(Math.max(1, parseInt(e.target.value, 10)), 'width')} min="10" max="60" />
        </p>
        <p style={{ color: 'black' }}>
          Marker Color:
          <input type="color" value={newMarkerSettings.value.color} onChange={(e) => updateMarkerSettings(e.target.value, 'color')} />
        </p>
        <p style={{ color: 'black' }}>
          Marker Text Color:
          <input type="color" value={newMarkerSettings.value.textColor} onChange={(e) => updateMarkerSettings(e.target.value, 'textColor')} />
        </p>
        <p style={{ color: 'black' }}>
          Marker TopValue:
          <input type="text" value={newMarkerSettings.value.topValue} onChange={(e) => updateMarkerSettings(e.target.value, 'topValue')} />
        </p>
        {newMarkerSettings.value.width >= 20 && (
          <p style={{ color: 'black' }}>
            Marker BottomValue:
            <input type="text" value={newMarkerSettings.value.bottomValue} onChange={(e) => updateMarkerSettings(e.target.value, 'bottomValue')} />
          </p>
        )}
        <input type="file" ref={fileInputRef} onChange={(e) => updateMarkerSettings(URL.createObjectURL(e.target.files?.[0]), 'imageURL')} />
        <button onClick={() => updateMarkerSettings(null, 'imageURL', () => fileInputRef.current && (fileInputRef.current.value = ''))}>Undo Image</button>
        <button onClick={applyChanges}>Apply Changes</button>
      </div>

      {/* Second Column - Display Current Values */}
      <div style={{ marginLeft: '20px' }}>
        <p style={{ color: 'black' }}>
          Current Marker Width: {settings.value.markerSettings.width}
        </p>
        <p style={{ color: 'black' }}>
          Current Marker Color: {settings.value.markerSettings.color}
        </p>
        <p style={{ color: 'black' }}>
          Current Marker TopValue: {settings.value.markerSettings.topValue}
        </p>
        {settings.value.markerSettings.width >= 20 && (
          <p style={{ color: 'black' }}>
            Current Marker BottomValue: {settings.value.markerSettings.bottomValue}
          </p>
        )}
        <p style={{ color: 'red' }}>{validationMessage}</p>
      </div>

      <div style={{ marginLeft: '20px' }}>
      <Marker topLeftOffset={{x:500,y:100}}initialPosition={{x:900,y:75}} canvasSize={{x:1000, y:1000}} shouldUpdateOnSettingsChange={true} />
      </div>
    </div>
  );
};

export default MarkerEditorSettings;
