import { useContext, useState, useEffect, useRef } from "react";
import { CanvasSettingsType } from "../../CanvasContext"; // CanvasSettingsContext,
import { hexToRgb } from "@/app/components/utility/utils";
import { settings, markerSettings } from "../../Signals";
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
  Grid,
} from "@mui/material";
import FirstColumn from "./FirstCollumn";
import { useWindowResize } from "@/app/components/utility/hooks/UseWindowResize";
import SecondColumn from "./SecondColumn";
import MarkerValues from "./MarkerValuesColumn";
import PreviewMarker from "./PreviewMarker";
import SettingsColumn from "../settingsComponents/SettingsColumn";

export type UpdateMarkerSettingsCallback = (value: any) => void;
export type UpdateMarkerSettingsFc = (
  value: any,
  property: string,
  callback?: UpdateMarkerSettingsCallback | null,
 ) => void 
export const newMarkerSettings = signal({ ...markerSettings.value });

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
    markerSettings.value = newMarkerSettings.value
    // changeSettings("markerSettings", newMarkerSettings.value);
    setIsDirty(false);
  };

  const validationMessage = isDirty
    ? "Changes not applied. Click 'Apply Changes' to save."
    : "";

  return (
    <Grid sx={{display:'flex'}} spacing={2}>
      <FirstColumn updateMarkerSettings={updateMarkerSettings} />
      <SecondColumn updateMarkerSettings={updateMarkerSettings} />
      <MarkerValues applyChanges={applyChanges} validationMessage={validationMessage} />
      
      <SettingsColumn>
      <Typography>Left Click To Add A Point</Typography>
      <Typography>Right DBL Click to Remove a Point</Typography>
    </SettingsColumn>
    <PreviewMarker windowWidth={windowWidth} />
    </Grid>
  );
};

export default MarkerEditorSettings;

 