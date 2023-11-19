import React from 'react';
import { Box, Button } from '@mui/material';
import ColorPicker from '../settingsComponents/ColorPicker';
import FavoriteColorLister from '@/app/components/settings/FavoriteColorLister';
import { Color, Settings } from '@/public/types/OtherTypes';
import { settings } from '../../Signals';
import { drawSettings } from '../../Signals';

interface ColorSettingsColumnProps {
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBucketFill: () => void;
  handleColorClick: (color: Color) => void;
}

const FirstColumn: React.FC<ColorSettingsColumnProps> = ({
  handleColorChange,
  handleBucketFill,
  handleColorClick,
}) => {
  return (
    <Box>
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

      <Button variant="contained" onClick={handleBucketFill}>
        Bucket Fill
      </Button>
    </Box>
  );
};

export default FirstColumn;