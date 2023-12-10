import { Typography, Box } from "@mui/material";
import SpeedButton from "../../theme/SpeedButton";
import { settings, markerSettings } from "../../Signals";
import SettingsColumn from "../settingsComponents/SettingsColumn";

const MarkerValues: React.FC  = ( ) => {
    return (
      <SettingsColumn>
        <Typography>
          Current Marker Width: {markerSettings.value.radius}
        </Typography>
        <Typography>
          Current Marker Color: {markerSettings.value.color}
        </Typography>
        <Typography>
          Current Marker TopText: {markerSettings.value.topText}
        </Typography>
        {markerSettings.value.radius >= 20 && (
          <Typography>
            Current Marker BottomText:{" "}
            {markerSettings.value.bottomText}
          </Typography>
        )}


      </SettingsColumn>
    );
  }

export default MarkerValues