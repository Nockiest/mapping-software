 
 import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCanvas } from '../../CanvasContext';
import { frontLineSettings, settings } from '../../Signals';
import { computed } from '@preact/signals';
import { findFrontLineObj } from '@/app/components/utility/otherUtils';
import { v4 as uuidv4 } from 'uuid';
import { FrontlineData } from '../../layers/FronlineLayer';
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
import { theme } from '../../theme/theme';
import ColorPicker from '../settingsComponents/ColorPicker';
import { Color } from '@/public/types/OtherTypes';
import ButtonColumn from './ButtonColumn';
import VisualSettingsColumn from './ColorSettingsColumn';
 
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
    <Grid container spacing={1} sx={{display:'flex'}}>
      <VisualSettingsColumn  setEditedPointNum={setEditedPointNum} maxEndPointNumValue={maxEndPointNumValue} />
    

    <Grid item xs={3}>
      {frontLineSettings.value.frontLines.length > 0 && 
      <>
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
        </>
        }
    </Grid>
    <ButtonColumn
        onNewFrontLine={handleNewFrontLine}
        onDeleteCurrentFrontLine={deleteCurrentFrontLine}
        activeFrontline={Boolean(frontLineSettings.value.activeFrontline)}
      />
  </Grid>
  );
};

export default FrontlineLayerSettings;
 
 