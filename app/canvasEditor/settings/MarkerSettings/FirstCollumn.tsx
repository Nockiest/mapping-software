import React, { useRef } from "react";
// import {
//   // UpdateMarkerSettingsCallback,
//   UpdateMarkerSettingsFc,
//   // newMarkerSettings,
// } from "./MarkerEditorSettings";
import { theme } from "../../theme/theme";
import { Box, Input, Slider, Typography } from "@mui/material";
import SpeedButton from "../../theme/SpeedButton";
import { markerSettings, newMarkerSettings, settings } from "../../Signals";
import SettingsColumn from "../settingsComponents/SettingsColumn";
import { signal } from "@preact/signals";
// const newMarkerSettings = signal({ ...markerSettings.value });
type FirstColumnProps = {
  updateMarkerSettings: any;
};

const FirstColumn: React.FC<FirstColumnProps> = ({ updateMarkerSettings }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <SettingsColumn>
      <Typography color="white">
        Marker Width: {newMarkerSettings.value.radius}
      </Typography>
      <Slider
        value={
          Array.isArray(newMarkerSettings.value.radius)
            ? newMarkerSettings.value.radius[0]
            : newMarkerSettings.value.radius
        }
        min={10}
        max={60}
        onChange={(e, value) => {
          const widthValue = Array.isArray(value) ? value[0] : value;
          updateMarkerSettings(Math.max(1, widthValue), "radius");
        }}

      />

      <Typography color="white">
        Marker Color: {newMarkerSettings.value.color}
      </Typography>
      <input
        type="color"
        value={newMarkerSettings.value.color}
        onChange={(e) => updateMarkerSettings(e.target.value, "color")}
      />

      {/* Additional settings for the first column */}
      <Input
        type="file"
        inputProps={{
          accept: "image/*", // Specify the accepted file types
        }}
        ref={fileInputRef}
        onChange={(e) => {
          const inputElement = e.target as HTMLInputElement;
          const files = inputElement.files;
          if (files && files.length > 0) {
            updateMarkerSettings(URL.createObjectURL(files[0]), "imageURL");
          }
        }}
        color="primary" // Set the color of the input
      />

      {/* <input type="file" ref={fileInputRef} onChange={(e) => updateMarkerSettings(URL.createObjectURL(e.target.files?.[0]), 'imageURL')} /> */}
      {markerSettings.value.imageURL && (
        <SpeedButton
          onClick={() =>
            updateMarkerSettings(
              null,
              "imageURL",
              () => fileInputRef.current && (fileInputRef.current.value = "")
            )
          }
        >
          Reset Image
        </SpeedButton>
      )}
    </SettingsColumn>
  );
};

export default FirstColumn;
