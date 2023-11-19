import { Typography, Box } from "@mui/material";
import SpeedButton from "../../theme/SpeedButton";
import { settings } from "../../Signals";
import SettingsColumn from "../settingsComponents/SettingsColumn";

const MarkerValues: React.FC<{   applyChanges: () => void, validationMessage: string }> = ({  applyChanges, validationMessage }) => {
    return (
      <SettingsColumn>
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
      </SettingsColumn>
    );
  }

export default MarkerValues