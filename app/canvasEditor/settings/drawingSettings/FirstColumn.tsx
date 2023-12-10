import React from 'react';
import { Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ColorPicker from '../settingsComponents/ColorPicker';
import FavoriteColorLister from '@/app/canvasEditor/settings/settingsComponents/FavoriteColorLister';
import { Color, Settings } from '@/public/types/OtherTypes';
import { settings } from '../../Signals';
import { drawSettings } from '../../Signals';
import SettingsColumn from '../settingsComponents/SettingsColumn';
import { theme } from '../../theme/theme';

interface ColorSettingsColumnProps {
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBucketFill: () => void;
  handleColorClick: (color: Color) => void;
  handleLineTypeChange: (e: SelectChangeEvent<'rounded' | 'squared'>) => void;
}

const FirstColumn: React.FC<ColorSettingsColumnProps> = ({
  handleColorChange,
  handleLineTypeChange,
  handleColorClick,
}) => {
  return (

    <SettingsColumn>
      <ColorPicker
        value={settings.value.color}
        handleColorChange={handleColorChange}
        customText="Color:"
      />

      <FavoriteColorLister
        handleColorClick={handleColorClick}
        colorList={settings.value.popularColors}
        newColor={settings.value.color}
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

    </SettingsColumn>
  );
};

export default FirstColumn;