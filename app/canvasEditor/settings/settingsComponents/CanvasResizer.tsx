import { Slider } from "@mui/material";
import React from "react";
import { settings } from "../../Signals";
import { ChangeSettingsFunctionType } from "../CanvasSettings";
interface CanvasResizerProps {
  changeSettings: ChangeSettingsFunctionType
}

const CanvasResizer: React.FC<CanvasResizerProps> = ({ changeSettings }) => {
  return (
    <>
      <Slider
        value={settings.value.canvasSize.y}
        min={1}
        max={settings.value.maxCanvasSize.y}
        onChange={(e, value) => {
          const heightValue = Array.isArray(value) ? value[0] : value;
          changeSettings("canvasSize", {
            ...settings.value.canvasSize,
            y: heightValue,
          });
        }}
      />
      <Slider
        value={settings.value.canvasSize.x}
        min={1}
        max={settings.value.maxCanvasSize.x}
        onChange={(e, value) => {
          const widthValue = Array.isArray(value) ? value[0] : value;
          changeSettings("canvasSize", {
            ...settings.value.canvasSize,
            x: widthValue,
          });
        }}
      />
    </>
  );
};

export default CanvasResizer;
