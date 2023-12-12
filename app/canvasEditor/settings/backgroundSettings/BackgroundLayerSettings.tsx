import BackgroundImageSetter from "@/app/canvasEditor/settings/settingsComponents/BackgroundImageSetter";
import { useRef, useContext } from "react";
import { backgroundImage } from "../../Signals";
import { Button } from "@mui/material";
import SettingsColumn from "../settingsComponents/SettingsColumn";
import KeyboardShortcutsLister from "../settingsComponents/KeyboardShortcutsLister";
const BackgroundLayerSettings = () => {
  const handleImageRevert = () => {
    backgroundImage.value = null;
  };
  return (
    <div className="flex">
        <SettingsColumn>
      <BackgroundImageSetter />
      {backgroundImage && (
        <Button variant="contained" color="primary" onClick={handleImageRevert}>
          Revert Background Image
        </Button>
      )}

    </SettingsColumn>
    <KeyboardShortcutsLister />
    </div>

  );
};

export default BackgroundLayerSettings;
