import BackgroundImageSetter from "@/app/components/settings/BackgroundImageSetter";
import { useRef, useContext } from "react";
import { backgroundImage } from "../Signals";
import { Button } from "@mui/material";
const BackgroundLayerSettings = () => {
  const handleImageRevert = () => {
    backgroundImage.value = null;
  };
  return (
    <>
      <BackgroundImageSetter />
      {backgroundImage && (
        <Button variant="contained" color="primary" onClick={handleImageRevert}>
          Revert Background Image
        </Button>
      )}
    </>
  );
};

export default BackgroundLayerSettings;
