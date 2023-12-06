import BackgroundImageSetter from "@/app/components/settings/BackgroundImageSetter";
import { useRef, useContext } from "react";
import { backgroundImage } from "../../Signals";
import { Button } from "@mui/material";
import SettingsColumn from "../settingsComponents/SettingsColumn";
const BackgroundLayerSettings = () => {
  const handleImageRevert = () => {
    backgroundImage.value = null;
  };
  return (
    <SettingsColumn>
      <BackgroundImageSetter />
      {backgroundImage && (
        <Button variant="contained" color="primary" onClick={handleImageRevert}>
          Revert Background Image
        </Button>
      )}
    </SettingsColumn>
  );
};

export default BackgroundLayerSettings;
