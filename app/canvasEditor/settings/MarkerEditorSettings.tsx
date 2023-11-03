import {useContext} from 'react'
import { CanvasSettingsType } from '../CanvasContext';// CanvasSettingsContext, 
import { hexToRgb } from '@/public/utils';
import { settings } from '../StoredSettingsValues';

// tenhle komponent setuje marker settings object špatně
const MarkerEditorSettings = ({ changeSettings }) => {
  const markerSettings = { ...settings.value.markerSettings };

  const handleMarkerWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Math.max(1, parseInt(e.target.value, 10)); // Ensure newWidth is at least 1
    const newMarkerSettings = { ...markerSettings, width: newWidth };
    changeSettings('markerSettings', newMarkerSettings);
  };

  const handleMarkerColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;
    const rgbColor = hexToRgb(hexColor);
    const newMarkerSettings = { ...markerSettings, color: rgbColor };
    changeSettings('markerSettings', newMarkerSettings);
  };

  const handleMarkerTopValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTopValue = e.target.value;
    const newMarkerSettings = { ...markerSettings, topValue: newTopValue };
    changeSettings('markerSettings', newMarkerSettings);
  };

  const handleMarkerBottomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBottomValue = e.target.value;
    const newMarkerSettings = { ...markerSettings, bottomValue: newBottomValue };
    changeSettings('markerSettings', newMarkerSettings);
  };

  return (
    <div>
      <p style={{ color: 'black' }}>
        Marker Width: {markerSettings.width}
        <input
          type="range"
          value={markerSettings.width}
          onChange={handleMarkerWidthChange}
          min="10"
          max="60"
        />
      </p>
      <p style={{ color: 'black' }}>
        Marker Color:
        <input type="color" value={markerSettings.color} onChange={handleMarkerColorChange} />
      </p>
      <p style={{ color: 'black' }}>
        Marker TopValue:
        <input type="text" value={markerSettings.topValue} onChange={handleMarkerTopValueChange} />
      </p>
     {markerSettings.width>=20&& <p style={{ color: 'black' }}>
        Marker BottomValue:
        <input type="text" value={markerSettings.bottomValue} onChange={handleMarkerBottomValueChange} />
      </p>}
    </div>
  );
};

export default MarkerEditorSettings;

