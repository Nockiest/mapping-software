import { useContext, useState, useRef } from "react";
import { CanvasSettingsType } from "../CanvasContext"; // CanvasSettingsContext,
import { hexToRgb } from "@/public/utils";
import { settings } from "../Signals";
import FavoriteColorLister from "@/app/components/settings/FavoriteColorLister";
import { Color } from "@/public/types/OtherTypes";
import { signal } from "@preact/signals";
import Marker from "@/app/components/markerLayer/Marker";
import { theme } from "../theme/theme";
import SpeedButton from "../theme/SpeedButton";
import { Box, Typography, TextField, Button, Slider, InputAdornment, Input, Paper, useTheme } from '@mui/material';
 
type UpdateMarkerSettingsCallback = (value: any) => void;
export const newMarkerSettings = signal({ ...settings.value.markerSettings })
 
const MarkerEditorSettings = ({ changeSettings }) => {
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateMarkerSettings = (
    value: any,
    property: string,
    callback?: UpdateMarkerSettingsCallback|null  ,
 
  ): void => {
    newMarkerSettings.value = { ...newMarkerSettings.value, [property]: value };
    if (callback) {
      callback(value);
    }
    setIsDirty(true);
  };

  const applyChanges = () => {
    changeSettings('markerSettings', newMarkerSettings.value);
    setIsDirty(false);
  };

  const validationMessage = isDirty ? "Changes not applied. Click 'Apply Changes' to save." : "";

  return (
    <Box display="flex">
      {/* First Column */}
      <Box
       width="30%"
       marginRight="2%"
       backgroundColor={theme.palette.primary.darker}
       padding="10px"
       borderRadius="4px"
      >
        <Typography color="white">
          Marker Width: {newMarkerSettings.value.width}
        </Typography>
         <Slider
          value={newMarkerSettings.value.width}
          min={10}
          max={60}
          onChange={(e, value) => updateMarkerSettings(Math.max(1, value), 'width')}
          sx={{
            color: theme.palette.secondary.main, // Set the color of the Slider
          }}
        />

        <Typography color="white">
          Marker Color: {newMarkerSettings.value.color}
        </Typography>
        <input type="color" value={newMarkerSettings.value.color} onChange={(e) => updateMarkerSettings(e.target.value, 'color')} />
         
        {/* <Input
          type="color"
          value={newMarkerSettings.value.color}
          onChange={(e) => updateMarkerSettings(e.target.value, 'color')}
          endAdornment={<InputAdornment position="end"><span>{newMarkerSettings.value.color}</span></InputAdornment>}
          sx={{
            color: theme.palette.secondary.main, // Set the color of the Slider
          }}
       /> */}
        {/* Additional settings for the first column */}
        <input type="file" ref={fileInputRef} onChange={(e) => updateMarkerSettings(URL.createObjectURL(e.target.files?.[0]), 'imageURL')} />
        <SpeedButton onClick={() => updateMarkerSettings(null, 'imageURL', () => fileInputRef.current && (fileInputRef.current.value = ''))}>
          Reset Image
        </SpeedButton>
      </Box>

      {/* Second Column */}
      <Box
        width="30%"
        marginRight="2%"
        backgroundColor={theme.palette.primary.darker}
        padding="10px"
        borderRadius="4px"
      >
        <Typography color="white">
          Marker TopValue:
        </Typography>
        <TextField
          type="text"
          value={newMarkerSettings.value.topValue}
          onChange={(e) => updateMarkerSettings(e.target.value, 'topValue')}
        />
        {newMarkerSettings.value.width >= 20 && (
          <>
            <Typography color="white">
              Marker BottomValue:
            </Typography>
            <TextField
              type="text"
              value={newMarkerSettings.value.bottomValue}
              onChange={(e) => updateMarkerSettings(e.target.value, 'bottomValue')}
            />
          </>
        )}
        {/* Additional settings for the second column */}
       
      </Box>

      {/* Third Column */}
       
        {/* Marker Values */}
        <Box
          width="50%" // Adjust the width as needed
          color="white"
        >
          <Typography>
            Current Marker Width: {settings.value.markerSettings.width}
          </Typography>
          <Typography>
            Current Marker Color: {settings.value.markerSettings.color}
          </Typography>
          <Typography>
            Current Marker TopValue: {settings.value.markerSettings.topValue}
          </Typography>
          {settings.value.markerSettings.width >= 20 && (
            <Typography>
              Current Marker BottomValue: {settings.value.markerSettings.bottomValue}
            </Typography>
          )}
          
          <SpeedButton onClick={applyChanges}>
            Apply Changes
          </SpeedButton>
          <Typography style={{ color: 'red' }}>{validationMessage}</Typography>
        </Box>

        {/* Marker Display */}
        <Box
          marginLeft="20px" // Adjust the margin as needed
          width="50%" // Adjust the width as needed
          display="flex"
          flexDirection="column" // Stack elements vertically
          alignItems="flex-start" // Align items to the start of the cross axis
        >
          <Marker
            topLeftOffset={{ x: 500, y: 100 }}
            initialPosition={{ x: 1100, y: 75 }}
            shouldUpdateOnSettingsChange={true}
          />
          
        </Box>

      
    </Box>
  );
};

export default MarkerEditorSettings;
 