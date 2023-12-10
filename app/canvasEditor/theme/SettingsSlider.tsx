
import { FC, ReactNode, MouseEvent, ChangeEvent } from "react";
import { Box, Slider, useTheme, SliderProps } from "@mui/material";

// interface SettingsSliderProps {
//   onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
//   sx?: React.CSSProperties;
//   children?: ReactNode;
//   onChange: (event: Event, value: number | number[]) => void; // Adjust the type here
//   value?: number;
//   min?: number;
//   max?: number;
//   id?: string
//   defaultValue?: number
//   valueLabelDisplay?:'auto'|'on'|'off'
//   marks?:true
//   step?: number
// }

const SettingsSlider: FC<SliderProps> = ({
  onClick,
  sx,
  children,
  onChange,
  min,
  max,
  value,
  id,
  defaultValue,
  valueLabelDisplay,
  step,
  marks
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        fontSize: "10px",
        padding: "4px 8px",
        width: '100%'
      }}
    >
      <Slider
      id={id}
        sx={{
          ...sx,
        }}
        min={min}
        max={max}
        value={value}
        onClick={onClick}
        onChange={onChange}
        defaultValue={defaultValue}
        valueLabelDisplay={valueLabelDisplay}
        marks={marks}
        step={step}
      >
        {children}
      </Slider>
    </Box>
  );
};

export default SettingsSlider;
