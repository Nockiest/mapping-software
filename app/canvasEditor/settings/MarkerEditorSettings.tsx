import {useContext} from 'react'
import { CanvasSettingsContext, CanvasSettingsType } from '../CanvasContext';
import { hexToRgb } from '@/public/utils';
 
const MarkerEditorSettings = () => {
  const { settings, setSettings } = useContext<CanvasSettingsType>(CanvasSettingsContext);

  const handleMarkerWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10);
    setSettings((prevSettings) => ({
      ...prevSettings,
      markerSettings: { ...prevSettings.markerSettings, width: newWidth },
    }));
  };

  const handleMarkerColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;
    const rgbColor = hexToRgb(hexColor);
    setSettings((prevSettings) => ({
      ...prevSettings,
      markerSettings: { ...prevSettings.markerSettings, color: rgbColor },
    }));
  };

  const handleMarkerTopValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTopValue = e.target.value;
    setSettings((prevSettings) => ({
      ...prevSettings,
      markerSettings: { ...prevSettings.markerSettings, topValue: newTopValue },
    }));
  };

  const handleMarkerBottomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBottomValue = e.target.value;
    setSettings((prevSettings) => ({
      ...prevSettings,
      markerSettings: { ...prevSettings.markerSettings, bottomValue: newBottomValue },
    }));
  };

  return (
    <div>
      <p style={{ color: 'black' }}>Marker Width:
        <input type="number" value={settings.markerSettings.width} onChange={handleMarkerWidthChange} />
      </p>
      <p style={{ color: 'black' }}>Marker Color:
        <input type="color" value={settings.markerSettings.color} onChange={handleMarkerColorChange} />
      </p>
      <p style={{ color: 'black' }}>Marker TopValue:
        <input type="text" value={settings.markerSettings.topValue} onChange={handleMarkerTopValueChange} />
      </p>
      <p style={{ color: 'black' }}>Marker BottomValue:
        <input type="text" value={settings.markerSettings.bottomValue} onChange={handleMarkerBottomValueChange} />
      </p>
    </div>
  );
};

export default MarkerEditorSettings;
