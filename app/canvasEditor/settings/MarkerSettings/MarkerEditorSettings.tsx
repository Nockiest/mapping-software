import { useContext, useState, useEffect, useRef } from "react";
import { CanvasSettingsType } from "../../CanvasContext"; // CanvasSettingsContext,
import { hexToRgb } from "@/app/components/utility/utils";
import { settings, markerSettings,  } from "../../Signals";
import FavoriteColorLister from "@/app/canvasEditor/settings/settingsComponents/FavoriteColorLister";
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
import KeyboardShortcutsLister from "../settingsComponents/KeyboardShortcutsLister";

export type UpdateMarkerSettingsCallback = (value: any) => void;
export type UpdateMarkerSettingsFc = (
  value: any,
  property: string,
  callback?: UpdateMarkerSettingsCallback | null
) => void;

interface MarkerEditorSettingsProps {
  // changeSettings: ChangeSettingsFunctionType;
}

const MarkerEditorSettings: React.FC = () => {
  const [forceRefresh, setForceRefresh] = useState(false);

  const updateMarkerSettings: UpdateMarkerSettingsFc = (
    value,
    property
  ): void => {
    markerSettings.value = { ...markerSettings.value, [property]: value };
    console.log(markerSettings.value, property, value)
    setForceRefresh((prev) => !prev); // Toggle the dummy state variable
  };

  return (
    <Grid sx={{ display: "flex" }} spacing={2}>
      <FirstColumn
        updateMarkerSettings={updateMarkerSettings}

      />
      <SecondColumn
        updateMarkerSettings={updateMarkerSettings}

      />
      <MarkerValues   />

      <SettingsColumn>
        <Typography>Left Click To Add A Point</Typography>
        <Typography>Right DBL Click to Remove a Point</Typography>
      </SettingsColumn>
      <KeyboardShortcutsLister />
      <PreviewMarker  />
    </Grid>
  );
};

export default MarkerEditorSettings;