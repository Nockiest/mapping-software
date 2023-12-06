import React from 'react';
import { Box, InputLabel, Slider, Select, MenuItem, Button } from '@mui/material';
import { theme } from '../../theme/theme';
import { SelectChangeEvent } from '@mui/material/Select';
import { LineEdge } from '@/public/types/GeometryTypes';
import { settings } from '../../Signals';
import { useCanvas } from '../../CanvasContext';
import { clearCanvas } from '@/app/components/utility/CanvasUtils';
import SettingsColumn from '../settingsComponents/SettingsColumn';

interface OtherSettingsColumnProps {
  handleRadiusChange: (value: number | number[]) => void;
  handleLineTypeChange: (e: SelectChangeEvent<'rounded' | 'squared'>) => void;
}

const OtherSettingsColumn: React.FC<OtherSettingsColumnProps> = ({
  handleRadiusChange,
  handleLineTypeChange,
}) => {
  const { canvasRef } = useCanvas();

  return (
    <SettingsColumn styles={{maxWidth:'300px'}}>  
      <InputLabel
        htmlFor="radius"
        sx={{
          color: theme.palette.text.primary,
          borderBottom: `2px solid ${theme.palette.text.primary}`,
        }}
      >
        Radius: {settings.value.radius}
      </InputLabel>
      <Slider
        id="radius"
        value={settings.value.radius}
        onChange={(e, value) => handleRadiusChange(value)}
        min={1}
        max={100}
      />

      <br />

      {/* Dropdown for line type */}
      <InputLabel
        htmlFor="line-type"
        sx={{ color: theme.palette.text.primary }}
      >
        Line Type:
      </InputLabel>
      <Select
        id="line-type"
        value={settings.value.lineType}
        onChange={(e: SelectChangeEvent<'rounded' | 'squared'>) =>
          handleLineTypeChange(e)
        }
        sx={{
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '4px',
          alignSelf: 'center'
        }}
      >
        <MenuItem value="rounded" style={{ color: 'rgba(0, 0, 0, 0.9)' }}>
          Rounded
        </MenuItem>
        <MenuItem value="squared" style={{ color: 'rgba(0, 0, 0, 0.9)' }}>
          Squared
        </MenuItem>
      </Select>

      <Button variant="contained" onClick={() => clearCanvas(canvasRef)}>
        Clear Canvas
      </Button>
    </SettingsColumn>
  );
};

export default OtherSettingsColumn;
