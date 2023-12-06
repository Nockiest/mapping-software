// Import the necessary components and types
import React, { useRef } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import SpeedButton from '../../theme/SpeedButton';
import {  UpdateMarkerSettingsFc, newMarkerSettings} from './MarkerEditorSettings'
import { theme } from '../../theme/theme';
import Marker from '@/app/components/markerLayer/Marker';
import SettingsColumn from '../settingsComponents/SettingsColumn';
 
// Define the SecondColumn component
const SecondColumn: React.FC<{   updateMarkerSettings: UpdateMarkerSettingsFc }> = ({   updateMarkerSettings }) => {
  return (
    <SettingsColumn>
      <Typography color="white">Marker TopText:</Typography>
      <TextField
        type="text"
        value={newMarkerSettings.value.topText}
        onChange={(e) => updateMarkerSettings(e.target.value, "topText")}
      />
      {newMarkerSettings.value.width >= 20 && (
        <>
          <Typography color="white">Marker BottomText:</Typography>
          <TextField
            type="text"
            value={newMarkerSettings.value.bottomText}
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