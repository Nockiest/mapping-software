// Import the necessary components and types
import React, { useRef } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import SpeedButton from '../../theme/SpeedButton';
// import {  UpdateMarkerSettingsFc, newMarkerSettings} from './MarkerEditorSettings'
import { theme } from '../../theme/theme';
import Marker from '@/app/components/markerLayer/Marker';
import SettingsColumn from '../settingsComponents/SettingsColumn';
import { signal } from '@preact/signals';
import { markerSettings } from '../../Signals';

// Define the SecondColumn component
const SecondColumn: React.FC<{   updateMarkerSettings: any }> = ({   updateMarkerSettings }) => {
  return (
    <SettingsColumn>
      <Typography color="white">Marker TopText:</Typography>
      <TextField
        type="text"
        value={markerSettings.value.topText}
        onChange={(e) => updateMarkerSettings(e.target.value, "topText")}
      />
      {markerSettings.value.radius >= 20 && (
        <>
          <Typography color="white">Marker BottomText:</Typography>
          <TextField
            type="text"
            value={markerSettings.value.bottomText}
            onChange={(e) =>
              updateMarkerSettings(e.target.value, "bottomText")
            }
          />
        </>
      )}

    </SettingsColumn>
  );
}



export default SecondColumn