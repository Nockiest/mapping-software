import { useContext, useState, useEffect, useRef } from "react";
import { CanvasSettingsType } from "../../CanvasContext"; // CanvasSettingsContext,
import { hexToRgb } from "@/app/components/utility/utils";
import { settings } from "../../Signals";
import FavoriteColorLister from "@/app/components/settings/FavoriteColorLister";
import { Color, Settings } from "@/public/types/OtherTypes";
import { signal } from "@preact/signals";
import Marker from "@/app/components/markerLayer/Marker";
import { theme } from "../../theme/theme";
import SpeedButton from "../../theme/SpeedButton";
import { ChangeSettingsFunctionType } from "../CanvasSettings";
import {
  Box,
  Typography,
  TextField,
  Button,
  Slider,
  InputAdornment,
  Input,
  Paper,
  useTheme,
} from "@mui/material";
import FirstColumn from "./FirstCollumn";
import { useWindowResize } from "@/app/components/utility/hooks/UseWindowResize";
import   SecondColumn   from "./SecondColumn";
import MarkerValues from "./MarkerValuesColumn";
import PreviewMarker from "./PreviewMarker";

export type UpdateMarkerSettingsCallback = (value: any) => void;
export type UpdateMarkerSettingsFc = (
  value: any,
  property: string,
  callback?: UpdateMarkerSettingsCallback | null,
 ) => void 
export const newMarkerSettings = signal({ ...settings.value.markerSettings });

interface MarkerEditorSettingsProps {
  changeSettings: ChangeSettingsFunctionType
}

const MarkerEditorSettings: React.FC<MarkerEditorSettingsProps> = ({
  changeSettings,
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { width: windowWidth, height: windowHeight } = useWindowResize();

const updateMarkerSettings:UpdateMarkerSettingsFc =  ( 
  value,
  property,
  callback,
 ): void => {
  newMarkerSettings.value = { ...newMarkerSettings.value, [property]: value };
  if (callback) {
    callback(value);
  }
  setIsDirty(true);
};

  const applyChanges = () => {
    changeSettings("markerSettings", newMarkerSettings.value);
    setIsDirty(false);
  };

  const validationMessage = isDirty
    ? "Changes not applied. Click 'Apply Changes' to save."
    : "";

  return (
    <Box display="flex">
      {/* First Column */}
      <FirstColumn updateMarkerSettings={updateMarkerSettings} />
      <SecondColumn   updateMarkerSettings={updateMarkerSettings} />
       

    
      {/* <Box
        width="30%"
        marginRight="2%"
        bgcolor={theme.palette.primary.dark}
        padding="10px"
        borderRadius="4px"
      >
        <Typography color="white">Marker TopText:</Typography>
        <TextField
          type="text"
          value={newMarkerSettings.value.topText}
          onChange={(e) => updateMarkerSettings(   e.target.value,  "bottomText" )}
        />
        {newMarkerSettings.value.width >= 20 && (
          <>
            <Typography color="white">Marker BottomText:</Typography>
            <TextField
              type="text"
              value={newMarkerSettings.value.bottomText}
              onChange={(e) =>
                updateMarkerSettings(  e.target.value,  "bottomText" )
              }
            />
          </>
        )} * 
       
      </Box>/}
      {/* Third Column */}

      {/* Marker Values */}
      <MarkerValues applyChanges={applyChanges} validationMessage={validationMessage} />
      {/* <Box
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
          Current Marker TopText: {settings.value.markerSettings.topText}
        </Typography>
        {settings.value.markerSettings.width >= 20 && (
          <Typography>
            Current Marker BottomText:{" "}
            {settings.value.markerSettings.bottomText}
          </Typography>
        )}

        <SpeedButton onClick={applyChanges}>Apply Changes</SpeedButton>
        <Typography style={{ color: "red" }}>{validationMessage}</Typography>
      M</Box> */}

      {/* Marker Display */}
      <PreviewMarker windowWidth={windowWidth} />
      {/* <Box
        marginLeft="20px" // Adjust the margin as needed
        width="50%" // Adjust the width as needed
        display="flex"
        flexDirection="column" // Stack elements vertically
        alignItems="flex-start" // Align items to the start of the cross axis
      >
        <Marker
          topLeftOffset={{ x: 500, y: 100 }}
          initialPosition={{ x: windowWidth*0.9, y: 75 }}
          shouldUpdateOnSettingsChange={true}
          id={"x"}
        />
      </Box> */}
    </Box>
  );
};

export default MarkerEditorSettings;

{/* <Box
width="30%"
marginRight="2%"
bgcolor={theme.palette.primary.dark}
padding="10px"
borderRadius="4px"
>
<Typography color="white">
  Marker Width: {newMarkerSettings.value.width}
</Typography>
<Slider
  value={
    Array.isArray(newMarkerSettings.value.width)
      ? newMarkerSettings.value.width[0]
      : newMarkerSettings.value.width
  }
  min={10}
  max={60}
  onChange={(e, value) => {
    const widthValue = Array.isArray(value) ? value[0] : value;
    updateMarkerSettings(Math.max(1, widthValue), "width");
  }}
  sx={{
    color: theme.palette.secondary.main, // Set the color of the Slider
  }}
/>

<Typography color="white">
  Marker Color: {newMarkerSettings.value.color}
</Typography>
<input
  type="color"
  value={newMarkerSettings.value.color}
  onChange={(e) => updateMarkerSettings(e.target.value, "color")}
/>
 
<Input
  type="file"
  inputProps={{
    accept: "image/*", // Specify the accepted file types
  }}
  ref={fileInputRef}
  onChange={(e) => {
    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      updateMarkerSettings(URL.createObjectURL(files[0]), "imageURL");
    }
  }}
  color="primary" // Set the color of the input
/>

  
  onClick={() =>
    updateMarkerSettings(
      null,
      "imageURL",
      () => fileInputRef.current && (fileInputRef.current.value = "")
    )
  }
>
  Reset Image
</>
FirstColumn</Box> */}