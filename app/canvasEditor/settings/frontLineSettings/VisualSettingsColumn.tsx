import React from "react";
import { FormControl, InputLabel, Slider } from "@mui/material";
import ColorPicker from "../settingsComponents/ColorPicker";
import { frontLineSettings, settings } from "../../Signals";
import { Color } from "@/public/types/OtherTypes";
import SettingsColumn from "../settingsComponents/SettingsColumn";
import SettingsSlider from "../../theme/SettingsSlider";
import SettingsButton from "../../theme/SettingsButton";

type VisualSettingsColumnProps = {
  maxEndPointNumValue: number;
  setInsertionPointIndex: React.Dispatch<React.SetStateAction<number>>;
  onNewFrontLine: () => void;
  onDeleteCurrentFrontLine: () => void;
  activeFrontline: boolean;
};

const VisualSettingsColumn: React.FC<VisualSettingsColumnProps> = ({
  maxEndPointNumValue,
  setInsertionPointIndex,
  onNewFrontLine,
  onDeleteCurrentFrontLine,
  activeFrontline,
}) => {
  const activeFrontLine = frontLineSettings.value.activeFrontline;

  const handleThicknessChange = (e: Event, value: number | number[]) => {
    const newThickness = Array.isArray(value) ? value[0] : value;

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

  const handleEndFrontLineIndexChange = (e: Event, value: number | number[]) => {
    const activeFrontline = frontLineSettings.value.activeFrontline;

    const newValue = typeof value === "number" ? value : -1;

    if (!isNaN(newValue)) {
      frontLineSettings.value.insertionPointIndex = newValue;
      setInsertionPointIndex(newValue);
    } else {
      frontLineSettings.value.insertionPointIndex = -1;
      setInsertionPointIndex(-1);
    }

    if (activeFrontline) {
      const maxPoints = activeFrontline.points.length;
    }
  };

  const handleEndpointIdChange = (e: Event, value: number | number[]) => {
    const activeFrontline = frontLineSettings.value.activeFrontline;

    const newEndpointId = typeof value === "number" ? value : -1;

    if (!isNaN(newEndpointId) && activeFrontline) {
      const maxPoints = activeFrontline.points.length;

      if (newEndpointId >= -1 && newEndpointId < maxPoints) {
        // Find the corresponding PointData object using the endpoint ID
        const newEndpoint = newEndpointId === -1 ? null : activeFrontline.points[newEndpointId];
        activeFrontline.endPoint = newEndpoint;
      }
    }
  };

  return (
    <SettingsColumn>
      <ColorPicker
        value={frontLineSettings.value.frontLineColor}
        handleColorChange={handleCurFrontlineColorChange}
        customText={"front line color"}
      />
      <FormControl>
        <InputLabel style={{ color: "white" }}>
          Set insertion index {frontLineSettings.value.insertionPointIndex}
        </InputLabel>

          <SettingsSlider
            min={-1}
            defaultValue={-1}
            max={maxEndPointNumValue - 1}
            onChange={handleEndFrontLineIndexChange}
            valueLabelDisplay="auto"
            marks
            sx={{
              width: "150px",
            }}
          />

      </FormControl>
      <FormControl>
        <InputLabel style={{ color: "white" }}>
          Set endpoint ID {activeFrontLine?.endPoint?.id || 'None'}
        </InputLabel>
        {/* <div className=" px-4"> Added div with class 'slider-container' */}
          <SettingsSlider
            min={-1}
            value={activeFrontLine?.endPoint ? activeFrontLine?.points.indexOf(activeFrontLine?.endPoint) : -1}
            max={maxEndPointNumValue - 1}
            onChange={handleEndpointIdChange}
            valueLabelDisplay="auto"
            marks
            sx={{
              width: "150px",
            }}
          />
        {/* </div> */}
      </FormControl>
      <FormControl>
        <InputLabel style={{ color: "white" }}>Set line thickness:</InputLabel>
        {/* <div className=" px-4"> Added div with class 'slider-container' */}
          <SettingsSlider
            min={0.1}
            max={10}
            step={0.1}
            value={activeFrontLine?.thickness}
            onChange={handleThicknessChange}
            valueLabelDisplay="auto"
            sx={{
              width: "150px",
            }}
          />
        {/* </div> */}
      </FormControl>
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br />
      <SettingsButton
        onClick={onNewFrontLine}
        sx={{

        }}
      >
        New FrontLine
      </SettingsButton>


      {activeFrontline && (
        <SettingsButton
          onClick={onDeleteCurrentFrontLine}
          sx={{

          }}
        >
          Delete This FrontLine
        </SettingsButton>
      )}
      </div>
    </SettingsColumn>
  );
};

export default VisualSettingsColumn;
