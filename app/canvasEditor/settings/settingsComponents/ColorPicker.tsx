import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

interface ColorPickerProps {
  value: string;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customText:string
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, handleColorChange, customText }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <InputLabel style={{ color: 'white', minWidth: '50px', fontSize: '1rem', marginRight: '8px' }}>
          {customText}
        </InputLabel>
        <Input
          type="color"
          value={value}
          onChange={handleColorChange}
          sx={{
            appearance: 'none',
            width: '48px',
            height: '32px',
          }}
        />
      </div>
    );
 
  
};

export default ColorPicker;
