 
 import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCanvas } from '../CanvasContext';
import { frontLineSettings, settings } from '../Signals';
import { computed } from '@preact/signals';
import { findFrontLineObj } from '@/app/components/utility/otherUtils';
import { v4 as uuidv4 } from 'uuid';
import { FrontlineData } from '../layers/FronlineLayer';
import {
  Slider,
  Input,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid
} from '@mui/material'; // Import MUI components
import { theme } from '../theme/theme';
import ColorPicker from './settingsComponents/ColorPicker';
import { Color } from '@/public/types/OtherTypes';

const FrontlineLayerSettings = () => {
  const [insertionPointIndex, setEditedPointNum] = useState(frontLineSettings.value.insertionPointIndex);
  const [maxEndPointNumValue, setMaxEndPointNumValue] = useState(0);

  useEffect(() => {
    const activeFrontline = frontLineSettings.value.activeFrontline;
    // console.log(activeFrontline?.points.length,'max point value', frontLineSettings.value.activeFrontline)
    setMaxEndPointNumValue(activeFrontline?.points.length || 0);
  } );

  useEffect(() => {
    // Update local state when settings change
    setEditedPointNum(frontLineSettings.value.insertionPointIndex);
  },  );

  const handleEndFrontLineIndexChange = (e: Event, value: number | number[] ) => {
    console.log('CHANGING VALUE');
    const activeFrontline = frontLineSettings.value.activeFrontline;

    const newValue = typeof value === 'number' ? value : -1;

    if (!isNaN(newValue)) {
      // Update the insertionPointIndex in settings and local state
      frontLineSettings.value.insertionPointIndex = newValue;
      setEditedPointNum(newValue);
    } else {
      // If the value is NaN, set it to -1
      frontLineSettings.value.insertionPointIndex = -1;
      setEditedPointNum(-1);
    }

    if (activeFrontline) {
      const maxPoints = activeFrontline.points.length;
    }
  };

  const handleCurFrontlineColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor =  e.target.value as Color;
    frontLineSettings.value.frontLineColor = hexColor;
    const changedFrontline = frontLineSettings.value.activeFrontline;
    if (changedFrontline) {
        changedFrontline.color = hexColor;
      }
        
  };

  const handleThicknessChange = (e: Event, value: number | number[]) => {
    const newThickness = Array.isArray(value) ? value[0] : value;
    const activeFrontline = frontLineSettings.value.activeFrontline;
  
    if (activeFrontline) {
      activeFrontline.thickness = newThickness;
    }
  };
  

  const deleteCurrentFrontLine = () => {
    const activeFrontline = frontLineSettings.value.activeFrontline;

    if (activeFrontline) {
      frontLineSettings.value.frontLines = frontLineSettings.value.frontLines.filter(
        (frontline) => frontline.idNum !== activeFrontline.idNum
      );
    }
  };

  const handleNewFrontLine = () => {
    const newFrontlineData: FrontlineData = {
      idNum: uuidv4(),
      points: [],
      topLeftPoint: { x: 0, y: 0 },
      thickness: 4,
      endPointIndex: 0,
      color: frontLineSettings.value.frontLineColor,
    };

    // Add the new frontline to the frontLines array
    frontLineSettings.value.frontLines.push(newFrontlineData);

    // Set the new frontline as active
    frontLineSettings.value.activeFrontline = newFrontlineData;
  };

  const handleLayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLayerId = e.target.value;
    const newFrontline = findFrontLineObj(selectedLayerId);
    frontLineSettings.value.activeFrontline = newFrontline;
  };

  return (
    <Grid container spacing={1}>
    <Grid item xs={3}>
    <ColorPicker value={frontLineSettings.value.frontLineColor} handleColorChange={handleCurFrontlineColorChange} customText={'front line color'} />
      <FormControl>
        
        <InputLabel style={{ color: 'white' }}>
          Set insertion index{' '}
          {frontLineSettings.value.insertionPointIndex}
        </InputLabel>
        <Slider
          min={-1}
          defaultValue={-1}
          max={maxEndPointNumValue - 1}
          onChange={  handleEndFrontLineIndexChange  }
          valueLabelDisplay="auto"
          marks
        />
      </FormControl>
      <br />
      <br />
      <FormControl>
        <InputLabel style={{ color: 'white' }}>
          Set line thickness:
        </InputLabel>
        <Slider
          min={0.1}
          max={10}
          step={0.1}
          value={
            frontLineSettings.value.activeFrontline?.thickness || 0
          }
          onChange={handleThicknessChange }
          valueLabelDisplay="auto"
        />
      </FormControl>
      <br />
    
       
    </Grid>

    <Grid item xs={3}>
      <InputLabel style={{ color: 'white' }}>
            Choose Active Layer:
      </InputLabel>
        <Select
          onChange={(e) => handleLayerChange}
          value={
            frontLineSettings.value.activeFrontline?.idNum
          }
        >
          {frontLineSettings.value.frontLines.map(
            (frontline, index) => (
              <MenuItem
                key={frontline.idNum}
                value={frontline.idNum}
                style={{
                  backgroundColor: frontline.color,
                  opacity: 0.5,
                  cursor: 'pointer',
                }}
              >
                {`Index: ${index}, Color: `}
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    marginLeft: '2em',
                    backgroundColor: frontline.color,
                    border: '1px solid #000',
                  }}
                />
                {`, Index: ${frontLineSettings.value.frontLines.indexOf(
                  frontline
                )}`}
              </MenuItem>
            )
          )}
        </Select>
    </Grid>
    
    <Grid item xs={6}>
      
      <br />
      <Button
        onClick={handleNewFrontLine}
        sx={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        New FrontLine
      </Button>
      <br  />
      <br  />
      {frontLineSettings.value.activeFrontline && (
        <Button
          onClick={deleteCurrentFrontLine}
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          Delete Current FrontLine
        </Button>
      )}
   
   
    </Grid>
  </Grid>
  );
};

export default FrontlineLayerSettings;
 
 