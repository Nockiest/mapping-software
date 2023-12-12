import { Typography, Box } from "@mui/material";
import SpeedButton from "../../theme/SpeedButton";
import { settings, markerSettings } from "../../Signals";
import SettingsColumn from "../settingsComponents/SettingsColumn";

const MarkerValues: React.FC  = ( ) => {
    return (
      <SettingsColumn>
        <Typography typography={'h6'}>
      Current Marker
        </Typography>
        <Typography>
        Width: {markerSettings.value.radius}
        </Typography>
        <Typography>
      Color: {markerSettings.value.color}
        </Typography>
        <Typography>
           TopText: {markerSettings.value.topText}
        </Typography>
        {markerSettings.value.radius >= 20 && (
          <Typography>
            BottomText:{" "}
            {markerSettings.value.bottomText}
          </Typography>
        )}


      </SettingsColumn>
    );
  }

export default MarkerValues