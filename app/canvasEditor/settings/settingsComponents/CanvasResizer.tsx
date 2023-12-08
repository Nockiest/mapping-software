import React from "react";
import { Slider } from "@mui/material";
import { settings } from "../../Signals";
import { ChangeSettingsFunctionType } from "../CanvasSettings";

interface CanvasResizerProps {
  changeSettings: ChangeSettingsFunctionType;
}

const CanvasResizer: React.FC<CanvasResizerProps> = ({ changeSettings }) => {
  return (
    <div className="px-4">
      <div className="flex items-center mb-2  w-full">
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
        <span className="ml-4 w-full">Y: {settings.value.canvasSize.y}</span>
      </div>

      <div className="flex items-center w-full">
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
        <span className="ml-4  w-full">X: {settings.value.canvasSize.x}</span>
      </div>
    </div>
  );
};

export default CanvasResizer;
