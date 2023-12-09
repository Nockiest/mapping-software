import React from 'react';
import { Box, InputLabel, Slider, Select, MenuItem, Button } from '@mui/material';
import { theme } from '../../theme/theme';
import { SelectChangeEvent } from '@mui/material/Select';
import { LineEdge } from '@/public/types/GeometryTypes';
import { settings } from '../../Signals';
import { useCanvas } from '../../CanvasContext';
import { clearCanvas } from '@/app/components/utility/CanvasUtils';
import SettingsColumn from '../settingsComponents/SettingsColumn';
import { Color } from '@/public/types/OtherTypes';
import SettingsButton from '../../theme/SettingsButton';

interface OtherSettingsColumnProps {
  handleRadiusChange: (value: number | number[]) => void;
  handleLineTypeChange: (e: SelectChangeEvent<'rounded' | 'squared'>) => void;
  handleBucketFill: () => void;
}

const OtherSettingsColumn: React.FC<OtherSettingsColumnProps> = ({
  handleRadiusChange,
  handleLineTypeChange,
  handleBucketFill,
}) => {
  const { canvasRef } = useCanvas();

  return (
    <SettingsColumn styles={{ maxWidth: '300px' }}>
      <InputLabel
        htmlFor="radius"
        sx={{
          color: theme.palette.text.primary,
          borderBottom: `2px solid ${theme.palette.text.primary}`,
        }}
      >
        Radius: {settings.value.radius}
      </InputLabel>
      <div  className='px-4 py-2' >
      <Slider
        id="radius"
        // Added padding around the slider
        value={settings.value.radius}
        onChange={(e, value) => handleRadiusChange(value)}
        min={1}
        max={100}
      />

      </div>



      <br />

      <SettingsButton  onClick={() => clearCanvas(canvasRef)}>
        Clear Canvas
      </SettingsButton>
      <SettingsButton   onClick={handleBucketFill}>
        Bucket Fill
      </SettingsButton>
    </SettingsColumn>
  );
};

export default OtherSettingsColumn;