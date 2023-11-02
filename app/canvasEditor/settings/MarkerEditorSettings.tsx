import {useContext} from 'react'
import { CanvasSettingsType } from '../CanvasContext';// CanvasSettingsContext, 
import { hexToRgb } from '@/public/utils';
import { settings } from './CanvasSettings';
const MarkerEditorSettings = ({ changeSettings }) => {
  const handleMarkerWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10);
    changeSettings('markerSettings', (prevMarkerSettings) => ({ ...prevMarkerSettings, width: newWidth }));
  };

  const handleMarkerColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;
    const rgbColor = hexToRgb(hexColor);
    changeSettings('markerSettings', (prevMarkerSettings) => ({ ...prevMarkerSettings, color: rgbColor }));
  };

  const handleMarkerTopValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTopValue = e.target.value;
    changeSettings('markerSettings', (prevMarkerSettings) => ({ ...prevMarkerSettings, topValue: newTopValue }));
  };

  const handleMarkerBottomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBottomValue = e.target.value;
    changeSettings('markerSettings', (prevMarkerSettings) => ({ ...prevMarkerSettings, bottomValue: newBottomValue }));
  };

  return (
    <div>
      <p style={{ color: 'black' }}>
        Marker Width:
        <input type="number" value={settings.value.markerSettings.width} onChange={handleMarkerWidthChange} />
      </p>
      <p style={{ color: 'black' }}>
        Marker Color:
        <input type="color" value={settings.value.markerSettings.color} onChange={handleMarkerColorChange} />
      </p>
      <p style={{ color: 'black' }}>
        Marker TopValue:
        <input type="text" value={settings.value.markerSettings.topValue} onChange={handleMarkerTopValueChange} />
      </p>
      <p style={{ color: 'black' }}>
        Marker BottomValue:
        <input type="text" value={settings.value.markerSettings.bottomValue} onChange={handleMarkerBottomValueChange} />
      </p>
    </div>
  );
};

export default MarkerEditorSettings;
