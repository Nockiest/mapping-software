 import { useContext } from "react";
import MarkerEditorSettings from "./MarkerEditorSettings";
import LineTypeSettings from "@/app/components/settings/LineTypeSettings";
import ActiveLayerSettings from "@/app/components/settings/ActiveLayerSettings";
import { hexToRgb } from "@/app/components/utility/utils";
import { settings } from "../Signals";
import { Color, Settings } from "@/public/types/OtherTypes";
import DrawingLayerSettings from "./DrawingLayerSettings";
import BackgroundLayerSettings from "./BackgroundLayerSettings";
import FrontlineLayerSettings from "./FrontlineLayerSettings";
import { theme } from "../theme/theme";
import { Grid, Paper, useTheme, Typography } from '@mui/material';

const CanvasSettings = () => {
  const theme = useTheme();

  const changeSettings = <K extends keyof Settings['value']>(
    property: K,
    newValue: Settings['value'][K]
  ) => {
    // Assuming settings is a mutable signal, otherwise, you might need to use `setSettings` if it's a state
    settings.value = { ...settings.value, [property]: newValue };
  };

  return (
    <Grid container spacing={2}>
      {/* First Column - ActiveLayerSettings */}
      <Grid item xs={3} style={{ maxWidth: '200px' }}>
        <Paper
          sx={{
            backgroundColor: theme.palette.info.main,
            color: 'white',
            padding: '10px',
            border: 'black 1px solid',
            borderRadius: '4px',
            height: '100%',
            overflow: 'auto',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h1">MAP MAKER ONLINE</Typography>
          <ActiveLayerSettings  />
        </Paper>
      </Grid>

      {/* Second Column - Other Settings */}
      <Grid item xs>
        <Paper
          sx={{
            backgroundColor: theme.palette.info.main,
            color: 'white',
            padding: '10px',
            border: 'black 1px solid',
            borderRadius: '4px',
            height: '100%',
            overflow: 'auto',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {settings.value.activeLayer === 'draw' ? (
            <DrawingLayerSettings />
          ) : settings.value.activeLayer === 'marker' ? (
            <MarkerEditorSettings changeSettings={changeSettings} />
          ) : settings.value.activeLayer === 'background' ? (
            <BackgroundLayerSettings />
          ) :  settings.value.activeLayer === 'frontLine' ?(
            <FrontlineLayerSettings />
          ): <></>}
        </Paper>
      </Grid>
    </Grid>

  );
};

export default CanvasSettings;
