import React, { ReactNode, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { settings } from "@/app/canvasEditor/Signals";
import { theme } from "@/app/canvasEditor/theme/theme";
import { styled } from "@mui/system";
import { LayerNames } from "@/public/types/OtherTypes";

const CustomMenuItem = styled(MenuItem)({
  "&:focus": {
    backgroundColor: "transparent", // Set the background color to transparent on focus
  },
});
type AllowedLayerNames = Exclude<LayerNames, 'none'>;


const ActiveLayerSettings: React.FC = () => {
  const [forceRerender, setForceRerender] = useState({});

  const handleActiveLayerChange = (newLayer: AllowedLayerNames) => {
    settings.value = { ...settings.value, activeLayer: newLayer };
    setForceRerender({}); // Trigger a re-render
  };


  const processKeyDown = (event: KeyboardEvent) => {
    console.log(event.key);
    switch (event.key) {
      case  "1":
        handleActiveLayerChange ("draw")
        break;
      case  "2":
        handleActiveLayerChange ("marker")
        break;
      case  "3":
        handleActiveLayerChange ("background")

        break;
      case  "4":
        handleActiveLayerChange ("frontLine")

        break;
      case  "5":
        handleActiveLayerChange ("compiled")
        break;

      default:
        console.log(event.key, event.key === "0")
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", processKeyDown);

    return () => {
      window.removeEventListener("keydown", processKeyDown);
    };
  }, []);

  return (
    <FormControl fullWidth style={{ marginTop: "16px" }}>
      <InputLabel
        sx={{
          color: "black",
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center",
          display: "block",
          width: "100%",
          borderTop: "2px solid white", // Add a white line below the label
          paddingBottom: "8px", // Add some padding to separate the line from the label
        }}
      >
        Active Layer
      </InputLabel>

      <Select
        value={settings.value.activeLayer}
        onChange={(event) => handleActiveLayerChange(event?.target.value as AllowedLayerNames)}
        style={{
          backgroundColor: theme.palette.background.default,
          color: "black",
          borderRadius: "4px",
          marginTop: "16px",
        }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: theme.palette.background.default,
            },
          },
        }}
      >
        {["draw", "marker", "background", "frontLine", "compiled"].map(
          (option, index) => (
            <MenuItem
              key={option}
              value={option}
              style={{
                color: `rgba(0, 0, 0, ${
                  settings.value.activeLayer === option ? "1" : "0.9"
                })`,
              }}
            >
             {index+1}: {option.charAt(0).toUpperCase() + option.slice(1)}
              {/* Capitalize the first letter */}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default ActiveLayerSettings;
