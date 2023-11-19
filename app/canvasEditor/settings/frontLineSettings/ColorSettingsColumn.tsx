import React from "react";
import { FormControl, InputLabel, Slider } from "@mui/material";
import ColorPicker from "../settingsComponents/ColorPicker";
import { frontLineSettings, settings } from "../../Signals";
import { Color } from "@/public/types/OtherTypes";
import SettingsColumn from "../settingsComponents/SettingsColumn";

type VisualSettingsColumnProps = {
  maxEndPointNumValue: number;
  setEditedPointNum: React.Dispatch<React.SetStateAction<number>>;
};

const VisualSettingsColumn: React.FC<VisualSettingsColumnProps> = ({
  maxEndPointNumValue,
  setEditedPointNum,
}) => {
  const activeFrontLine = frontLineSettings.value.activeFrontline;
  const handleThicknessChange = (e: Event, value: number | number[]) => {
    const newThickness = Array.isArray(value) ? value[0] : value;
    // const activeFrontline = frontLineSettings.value.activeFrontline;
    console.log('handling thickness change')
    if (activeFrontLine) {
      activeFrontLine.thickness = newThickness;
    }
  };
  const handleCurFrontlineColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hexColor = e.target.value as Color;
    frontLineSettings.value.frontLineColor = hexColor;
    const changedFrontline = frontLineSettings.value.activeFrontline;
    if (changedFrontline) {
      changedFrontline.color = hexColor;
    }
  };
  const handleEndFrontLineIndexChange = (
    e: Event,
    value: number | number[]
  ) => {
    const activeFrontline = frontLineSettings.value.activeFrontline;

    const newValue = typeof value === "number" ? value : -1;

    if (!isNaN(newValue)) {
      // Update the insertionPointIndex in settings and local state
      frontLineSettings.value.insertionPointIndex = newValue;
      setEditedPointNum(newValue);
    } else {
      // If the value is NaN, set it to -1
      frontLineSettings.value.insertionPointIndex = -1;
      setEditedPointNum(-1);
    }

    if (activeFrontline) {
      const maxPoints = activeFrontline.points.length;
    }
  };

  return (
    <SettingsColumn > 
      <ColorPicker
        value={frontLineSettings.value.frontLineColor}
        handleColorChange={handleCurFrontlineColorChange}
        customText={"front line color"}
      />
      <FormControl>
        <InputLabel style={{ color: "white" }}>
          Set insertion index {frontLineSettings.value.insertionPointIndex}
        </InputLabel>
        <Slider
          min={-1}
          defaultValue={-1}
          max={maxEndPointNumValue - 1}
          onChange={handleEndFrontLineIndexChange}
          valueLabelDisplay="auto"
          marks
          sx={{
            width: "180px",
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel style={{ color: "white" }}>Set line thickness:</InputLabel>
        <Slider
          min={0.1}
          max={10}
          step={0.1}
          value={activeFrontLine?.thickness}
          onChange={handleThicknessChange}
          valueLabelDisplay="auto"
          sx={{
            width: "180px",
          }}
        />
      </FormControl>
    </SettingsColumn>
  );
};

export default VisualSettingsColumn;
