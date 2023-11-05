import { useContext, useState } from "react";
import { CanvasSettingsType } from "../CanvasContext"; // CanvasSettingsContext,
import { hexToRgb } from "@/public/utils";
import { settings } from "../Signals";
import FavoriteColorLister from "@/app/components/settings/FavoriteColorLister";
import { Color } from "@/public/types/OtherTypes";
import { signal } from "@preact/signals";
 

const newMarkerSettings = signal({ ...settings.value.markerSettings })

const MarkerEditorSettings = ({ changeSettings }) => {
  // const [newMarkerSettings, setNewMarkerSettings] = useState({ ...settings.value.markerSettings });
  const [isDirty, setIsDirty] = useState(false);

  const handleMarkerWidthChange = (e) => {
    const newWidth = Math.max(1, parseInt(e.target.value, 10)); // Ensure newWidth is at least 1
    newMarkerSettings.value = { ...newMarkerSettings.value, width: newWidth }
    // setNewMarkerSettings((prevSettings) => ({ ...prevSettings, width: newWidth }));
    setIsDirty(true);
  };

  const handleMarkerColorChange = (e) => {
    const hexColor = e.target.value;
    // console.log('New Color:', hexColor);
    // const rgbColor = hexToRgb(hexColor);
    newMarkerSettings.value = { ...newMarkerSettings.value, color: hexColor}
    // setNewMarkerSettings((prevSettings) => ({ ...prevSettings, color: hexColor }));
    setIsDirty(true);
  };
  const handleMarkerTopValueChange = (e) => {
    const newTopValue = e.target.value;
    newMarkerSettings.value = { ...newMarkerSettings.value,topValue: newTopValue }
    // setNewMarkerSettings((prevSettings) => ({ ...prevSettings, topValue: newTopValue }));
    setIsDirty(true);
  };

  const handleMarkerBottomValueChange = (e) => {
    const newBottomValue = e.target.value;
    newMarkerSettings.value = { ...newMarkerSettings.value,bottomValue: newBottomValue }
    // setNewMarkerSettings((prevSettings) => ({ ...prevSettings, bottomValue: newBottomValue }));
    setIsDirty(true);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      newMarkerSettings.value = { ...newMarkerSettings.value, backgroundImage: URL.createObjectURL(selectedImage) }
      // setNewMarkerSettings((prevSettings) => ({ ...prevSettings, backgroundImage: URL.createObjectURL(selectedImage) }));
      setIsDirty(true);
    }
  };

  // Button click handler to apply the changes
  const applyChanges = () => {
    changeSettings('markerSettings', newMarkerSettings.value);
    setIsDirty(false);
  };
  const handleColorClick = (color: Color) => {
    // Set the settings color on click
    newMarkerSettings.value = { ...newMarkerSettings.value, color: color  }
    // setNewMarkerSettings((prevSettings) => ({ ...prevSettings, color: color }));
  };
  // Validation message
  const validationMessage = isDirty ? "Changes not applied. Click 'Apply Changes' to save." : "";

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* First Column - Input Controls */}
      <div>
        <p style={{ color: 'black' }}>
          Marker Width: {newMarkerSettings.value.width}
          <input type="range" value={newMarkerSettings.value.width} onChange={handleMarkerWidthChange} min="10" max="60" />
        </p>
        <p style={{ color: 'black' }}>
          Marker Color:
          <input type="color" value={newMarkerSettings.value.color} onChange={handleMarkerColorChange} />
          <FavoriteColorLister handleColorClick={handleColorClick} colorList={ newMarkerSettings.value.popularMarkerColors} newColor={newMarkerSettings.color} />
        </p>
        <p style={{ color: 'black' }}>
          Marker TopValue:
          <input type="text" value={newMarkerSettings.value.topValue} onChange={handleMarkerTopValueChange} />
        </p>
        {newMarkerSettings.value.width >= 20 && (
          <p style={{ color: 'black' }}>
            Marker BottomValue:
            <input type="text" value={newMarkerSettings.value.bottomValue} onChange={handleMarkerBottomValueChange} />
          </p>
        )}
        <input type="file" onChange={handleImageChange} />
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
    </div>
  );
};

export default MarkerEditorSettings;
