import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { settings } from '@/app/canvasEditor/Signals';
import { theme } from '@/app/canvasEditor/theme/theme';
const ActiveLayerSettings: React.FC = () => {
  const handleActiveLayerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newActiveLayer = event.target.value as "draw" | "marker" | "background" | "frontLine";
    settings.value = { ...settings.value, activeLayer: newActiveLayer };
  };

  return (
    <FormControl fullWidth>
      <InputLabel style={{ color: 'black', fontWeight: 'bold', fontSize: '1rem' }}>Active Layer</InputLabel>
      <Select
        value={settings.value.activeLayer}
        onChange={handleActiveLayerChange}
        label="Active Layer"
        style={{
          backgroundColor: theme.palette.background.default,
          color: 'black',
          borderRadius: '4px',
          marginTop: '4px', // Adjust as needed
        }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: theme.palette.background.default, // Adjust as needed
            },
          },
        }}
      >
        <MenuItem value="draw" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>Draw</MenuItem>
        <MenuItem value="marker" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>Marker</MenuItem>
        <MenuItem value="background" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>Background</MenuItem>
        <MenuItem value="frontLine" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>Front Line</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ActiveLayerSettings;