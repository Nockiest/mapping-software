import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { settings } from '@/app/canvasEditor/Signals';
import { theme } from '@/app/canvasEditor/theme/theme';
import { styled } from '@mui/system';

const CustomMenuItem = styled(MenuItem)({
  '&:focus': {
    backgroundColor: 'transparent', // Set the background color to transparent on focus
  },
});

const ActiveLayerSettings: React.FC = () => {
  const handleActiveLayerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newActiveLayer = event.target.value as "draw" | "marker" | "background" | "frontLine";
    settings.value = { ...settings.value, activeLayer: newActiveLayer };
  };

  return (
    <FormControl fullWidth style={{ marginTop: '16px' }}>
      <InputLabel
        sx={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          textAlign: 'center',
          display: 'block',
          width: '100%',
          borderTop: '2px solid white', // Add a white line below the label
          paddingBottom: '8px', // Add some padding to separate the line from the label
        }}
      >
        Active Layer
      </InputLabel>

      <Select
        value={settings.value.activeLayer}
        onChange={handleActiveLayerChange}
        style={{
          backgroundColor: theme.palette.background.default,
          color: 'black',
          borderRadius: '4px',
          marginTop: '16px',
        }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: theme.palette.background.default,
            },
          },
        }}
        components={{
          MenuItem: CustomMenuItem, // Use the custom MenuItem to override styles
        }}
      >
        {['draw', 'marker', 'background', 'frontLine', 'compiled'].map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={{
              color: `rgba(0, 0, 0, ${settings.value.activeLayer === option ? '1' : '0.9'})`,
            }}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize the first letter */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ActiveLayerSettings;
