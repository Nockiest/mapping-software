import { Paper } from "@mui/material";
import { useContext } from "react";
import MarkerEditorSettings from "./MarkerEditorSettings";
import LineTypeSettings from "@/app/components/settings/LineTypeSettings";
import ActiveLayerSettings from "@/app/components/settings/ActiveLayerSettings";
import { hexToRgb } from "@/public/utils";
import { settings } from "../Signals";
import { Color, Settings } from "@/public/types/OtherTypes";
import DrawingLayerSettings from "./DrawingLayerSettings";
import BackgroundLayerSettings from "./BackgroundLayerSettings";
import FrontlineLayerSettings from "./FrontlineLayerSettings";
import { theme } from "../theme/theme";

const CanvasSettings = () => {
  const changeSettings = <K extends keyof Settings["value"]>(
    property: K,
    newValue: Settings["value"][K]
  ) => {
    // Assuming settings is a mutable signal, otherwise, you might need to use `setSettings` if it's a state
    settings.value = { ...settings.value, [property]: newValue };
  };

  return (
    <Paper
        sx={{
          backgroundColor: theme.palette.info.main, // Use secondary color
          color: 'white',
          padding: '10px',
          border: 'black 1px solid',
          borderRadius: '4px',
          height: '200px',
          overflow: 'auto',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
      <ActiveLayerSettings />
      <br />
      {settings.value.activeLayer === "draw" ? (
        <DrawingLayerSettings />
      ) : settings.value.activeLayer === "marker" ? (
        <MarkerEditorSettings changeSettings={changeSettings} />
      ) : settings.value.activeLayer === "background" ? (
        <BackgroundLayerSettings />
      ) : (
        <FrontlineLayerSettings />
      )}
    </Paper>
  );
};

export default CanvasSettings;
