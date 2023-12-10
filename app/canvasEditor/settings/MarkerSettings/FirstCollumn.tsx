import React, { useRef } from "react";
// import {
//   // UpdateMarkerSettingsCallback,
//   UpdateMarkerSettingsFc,
//   // markerSettings,
// } from "./MarkerEditorSettings";
import { theme } from "../../theme/theme";
import {   Input,   Typography } from "@mui/material";
import SpeedButton from "../../theme/SpeedButton";
import { markerSettings,    } from "../../Signals";
import SettingsColumn from "../settingsComponents/SettingsColumn";
import { signal } from "@preact/signals";
import SettingsSlider from "../../theme/SettingsSlider";
// const markerSettings = signal({ ...markerSettings.value });
type FirstColumnProps = {
  updateMarkerSettings: any;
};

const FirstColumn: React.FC<FirstColumnProps> = ({ updateMarkerSettings }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      updateMarkerSettings(URL.createObjectURL(files[0]), "imageURL");
    }
  }

  return (
    <SettingsColumn>
      <Typography color="white">
        Marker Width: {markerSettings.value.radius}
      </Typography>
      <SettingsSlider
        value={
          Array.isArray(markerSettings.value.radius)
            ? markerSettings.value.radius[0]
            : markerSettings.value.radius
        }
        min={10}
        max={60}
        onChange={(e, value) => {
          const widthValue = Array.isArray(value) ? value[0] : value;
          updateMarkerSettings(Math.max(1, widthValue), "radius");
        }}

      />

      <Typography color="white">
        Background Color: {markerSettings.value.color}
      </Typography>
      <input
        type="color"
        value={markerSettings.value.color}
        onChange={(e) => updateMarkerSettings(e.target.value, "color")}
      />

      <Typography color="white">
        Text Color: {markerSettings.value.color}
      </Typography>
      <input
        type="color"
        value={markerSettings.value.textColor}
        onChange={(e) => updateMarkerSettings(e.target.value, "textColor")}
      />

      {/* Additional markerSettings for the first column */}
      <Input
        type="file"
        inputProps={{
          accept: "image/*", // Specify the accepted file types
        }}
        ref={fileInputRef}
        onChange={handleFileInputChange
          // (e) => {
          // const inputElement = e.target as HTMLInputElement;
          // const files = inputElement.files;
          // if (files && files.length > 0) {
          //   updateMarkerSettings(URL.createObjectURL(files[0]), "imageURL");
          // }}
         }
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
