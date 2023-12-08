import { useRef, useContext } from "react";
import { settings, drawSettings } from "../../Signals";
import LineTypeSettings from "@/app/components/settings/LineTypeSettings";
import { Color, Settings } from "@/public/types/OtherTypes";
import { LineEdge } from "@/public/types/GeometryTypes";
import { CanvasContext, useCanvas } from "../../CanvasContext";
import FavoriteColorLister from "@/app/components/settings/FavoriteColorLister";
import {
  InputLabel,
  Input,
  Slider,
  Button,
  Box,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material"; // Import Material-UI components
import { theme } from "../../theme/theme";
import ColorPicker from "../settingsComponents/ColorPicker";
import { signal } from "@preact/signals";
import { clearCanvas } from "@/app/components/utility/CanvasUtils";
import FirstColumn from "./FirstColumn";
import OtherSettingsColumn from "./SecondColumn";
import SettingsColumn from "../settingsComponents/SettingsColumn";

const DrawingLayerSettings = () => {
  const { state, setState } = drawSettings.value;
  const { canvasRef } = useCanvas();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const changeSettings = <K extends keyof Settings["value"]>(
    property: K,
    newValue: Settings["value"][K]
  ) => {
    // Assuming settings is a mutable signal, otherwise, you might need to use `setSettings` if it's a state
    settings.value = { ...settings.value, [property]: newValue };
  };

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value as Color;
    changeSettings("color", hexColor);
  };

  // Handle line type change
  const handleLineTypeChange = (
    e: SelectChangeEvent<"rounded" | "squared">
  ) => {
    const newLineType = e.target.value as LineEdge;
    changeSettings("lineType", newLineType);
  };

  // Handle bucket fill
  const handleBucketFill = () => {
    setState({ type: "ENTER_BUCKET_MODE" });
  };

  const handleSaveToFavorites = () => {
    const currentColor = settings.value.color;
    if (!settings.value.popularColors.includes(currentColor)) {
      settings.value.popularColors.push(currentColor);
    }
  };

  const handleColorClick = (color: Color) => {
    changeSettings("color", color);
  };

  // Handle radius change
  const handleRadiusChange = (value: number | number[]) => {
    const nweValue = Array.isArray(value) ? value[0] : value;
    // if (!e.target?.value){return}
    // const newRadius = parseInt(e.target.value, 10);
    const sanitizedRadius = nweValue < 0 ? 0 : nweValue;

    changeSettings("radius", sanitizedRadius);
  };

  return (
    <Grid container spacing={1}>
      {/* First Column - Color Settings and Bucket Fill */}
      {/* <Grid item xs={2}> */}
        <FirstColumn
          handleColorChange={handleColorChange}
          handleBucketFill={handleBucketFill}
          handleColorClick={handleColorClick}
          handleLineTypeChange={handleLineTypeChange}
        />
      {/* </Grid> */}

      {/* Second Column - Other Settings */}
      {/* <Grid item xs={2}> */}
        <OtherSettingsColumn
          handleRadiusChange={handleRadiusChange}
          handleLineTypeChange={handleLineTypeChange}
          handleBucketFill={handleBucketFill}
        />
      {/* </Grid> */}
      <SettingsColumn>
      <Typography>Left Click To Draw</Typography>
      <Typography>Right To Erase</Typography>
    </SettingsColumn>

    </Grid>
  );
};

export default DrawingLayerSettings;
