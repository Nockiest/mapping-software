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
      {/* Additional settings for the second column */}
    </SettingsColumn>
  );
}

// Define the ThirdColumn component
// const ThirdColumn: React.FC = () => {
//   // Include any logic or components specific to the third column if needed
//   return (
//     // Your third column JSX goes here
//     <div>
       
//     </div>
//   );
// }

// Define the MarkerValues component
// const MarkerValues: React.FC<{ settings: any, applyChanges: () => void, validationMessage: string }> = ({ settings, applyChanges, validationMessage }) => {
//   return (
//     <Box
//       width="50%" // Adjust the width as needed
//       color="white"
//     >
//       <Typography>
//         Current Marker Width: {settings.value.markerSettings.width}
//       </Typography>
//       <Typography>
//         Current Marker Color: {settings.value.markerSettings.color}
//       </Typography>
//       <Typography>
//         Current Marker TopText: {settings.value.markerSettings.topText}
//       </Typography>
//       {settings.value.markerSettings.width >= 20 && (
//         <Typography>
//           Current Marker BottomText:{" "}
//           {settings.value.markerSettings.bottomText}
//         </Typography>
//       )}

//       <SpeedButton onClick={applyChanges}>Apply Changes</SpeedButton>
//       <Typography style={{ color: "red" }}>{validationMessage}</Typography>
//     </Box>
//   );
// }

// // Define the MarkerDisplay component
// const MarkerDisplay: React.FC<{ windowWidth: number }> = ({ windowWidth }) => {
//   return (
//     <Box
//       marginLeft="20px" // Adjust the margin as needed
//       width="50%" // Adjust the width as needed
//       display="flex"
//       flexDirection="column" // Stack elements vertically
//       alignItems="flex-start" // Align items to the start of the cross axis
//     >
//       <Marker
//         topLeftOffset={{ x: 500, y: 100 }}
//         initialPosition={{ x: windowWidth * 0.9, y: 75 }}
//         shouldUpdateOnSettingsChange={true}
//         id={"x"}
//       />
//     </Box>
//   );
// }

export default SecondColumn