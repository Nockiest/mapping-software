import { useRef, useContext } from "react";
import { settings, drawSettings } from "../Signals";
import LineTypeSettings from "@/app/components/settings/LineTypeSettings";
import { Color, Settings } from "@/public/types/OtherTypes";
import { LineEdge } from "@/public/types/GeometryTypes";
import { CanvasContext, useCanvas } from "../CanvasContext";
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
} from "@mui/material"; // Import Material-UI components
import { theme } from "../theme/theme";
import ColorPicker from "./settingsComponents/ColorPicker";
import {   signal } from "@preact/signals";
import { clearCanvas } from "@/app/components/utility/CanvasUtils";

 
const DrawingLayerSettings = () => {
  const { state, setState} = drawSettings.value
  const { canvasRef } = useCanvas()
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
     setState({ type: 'ENTER_BUCKET_MODE' })
  
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
    const handleRadiusChange = (value:number|number[]) => {
      const nweValue= Array.isArray(value) ? value[0] : value;
      // if (!e.target?.value){return}
      // const newRadius = parseInt(e.target.value, 10);
      const sanitizedRadius = nweValue < 0 ? 0 : nweValue;
    
      changeSettings("radius", sanitizedRadius);
    };

  return (
    <Grid container spacing={2}>
      {/* First Column - Color Settings and Bucket Fill */}
      <Grid item xs={2}>
        <Box>
          <ColorPicker
            value={settings.value.color}
            handleColorChange={handleColorChange}
            customText="Color:"
          />

          <FavoriteColorLister
            handleColorClick={handleColorClick}
            colorList={settings.value.popularColors}
            newColor={settings.value.color}
          />

          <br />

          <Button variant="contained" onClick={handleBucketFill}>
            Bucket Fill
          </Button>
        </Box>
      </Grid>

      {/* Second Column - Other Settings */}
      <Grid item xs={2}>
        <Box>
          <InputLabel
            htmlFor="radius"
            sx={{
              color: theme.palette.text.primary,
              borderBottom: `2px solid ${theme.palette.text.primary}`,
            }}
          >
            Radius: {settings.value.radius}
          </InputLabel>
          <Slider
                id="radius"
                value={settings.value.radius}
                onChange={(e,value) => handleRadiusChange(value)}
                min={1}
                max={100}
              />


          <br />

          {/* Dropdown for line type */}
          <InputLabel
            htmlFor="line-type"
            sx={{ color: theme.palette.text.primary }}
          >
            Line Type:
          </InputLabel>
          <Select
            id="line-type"
            value={settings.value.lineType}
            onChange={(e: SelectChangeEvent<"rounded" | "squared">) =>
              handleLineTypeChange(e)
            }
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "4px",
            }}
          >
            <MenuItem value="rounded" style={{ color: "rgba(0, 0, 0, 0.9)" }}>
              Rounded
            </MenuItem>
            <MenuItem value="squared" style={{ color: "rgba(0, 0, 0, 0.9)" }}>
              Squared
            </MenuItem>


          </Select>

          <Button variant="contained" onClick={() => clearCanvas(canvasRef)}>
            Clear Canvas
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DrawingLayerSettings;
