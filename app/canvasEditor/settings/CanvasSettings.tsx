import { useContext } from "react";
import MarkerEditorSettings from "./MarkerSettings/MarkerEditorSettings";
import LineTypeSettings from "@/app/canvasEditor/settings/settingsComponents/LineTypeSettings";
import ActiveLayerSettings from "@/app/canvasEditor/settings/settingsComponents/ActiveLayerSettings";
import { hexToRgb } from "@/app/components/utility/utils";
import { settings } from "../Signals";
import { Color, Settings } from "@/public/types/OtherTypes";
import DrawingLayerSettings from "./drawingSettings/DrawingLayerSettings";
import BackgroundLayerSettings from "./backgroundSettings/BackgroundLayerSettings";
import FrontlineLayerSettings from "./frontLineSettings/FrontlineLayerSettings";
import { theme } from "../theme/theme";
import { Grid, Paper, useTheme, Typography, Slider } from "@mui/material";
import CanvasResizer from "./settingsComponents/CanvasResizer";


export type ChangeSettingsFunctionType = <K extends keyof Settings["value"]>(
  property: K,
  newValue: Settings["value"][K]
) => void;

const CanvasSettings = () => {
  const theme = useTheme();

  const changeSettings: ChangeSettingsFunctionType = (property, newValue) => {
    // Assuming settings is a mutable signal, otherwise, you might need to use `setSettings` if it's a state
    settings.value = { ...settings.value, [property]: newValue };

  };

  return (
    <Grid container spacing={2} sx={{ userSelect: "none", overflowX:'auto', height: '280px'}}>
      {/* First Column - ActiveLayerSettings */}
      <Grid item xs={3} style={{ maxWidth: "200px" }}>
        <Paper
          sx={{
            backgroundColor: theme.palette.info.main,
            color: "white",
            padding: "10px",
            border: "black 1px solid",
            borderRadius: "4px",
            height: "100%",
            overflow: "auto",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h1">MAP MAKER ONLINE</Typography>
          <ActiveLayerSettings />
          <CanvasResizer changeSettings={changeSettings} />
        </Paper>
      </Grid>

      {/* Second Column - Other Settings */}
      <Grid item xs>
        <Paper
          sx={{
            backgroundColor: theme.palette.info.main,
            color: "white",
            padding: "10px",
            border: "black 1px solid",
            borderRadius: "4px",
            height: '100%',
            overflow: "auto",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            overflowX: 'auto',
            width: '100%'
          }}
        >
          {settings.value.activeLayer === "draw" ? (
            <DrawingLayerSettings />
          ) : settings.value.activeLayer === "marker" ? (
            <MarkerEditorSettings  />
          ) : settings.value.activeLayer === "background" ? (
            <BackgroundLayerSettings />
          ) : settings.value.activeLayer === "frontLine" ? (
            <FrontlineLayerSettings />
          ) : (
            <></>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CanvasSettings;
