import React from 'react';
import { useCanvas } from '../CanvasContext';
import { settings } from '../Signals';

const FrontlineLayerSettings = () => {
  const handleEndFrontLineIndexChange = (e) => {
    console.log(e.target.value)
    settings.value.frontLineSettings.editedPointNum = e.target.value
  };

  const handleCurFrontlineColorChange = (e) => {
    settings.value.frontLineSettings.frontLineColor = e.target.value
  };

  return (
    <div>
      <label>
        Set endFrontLine index
        <input
          type="number"
          // value={/* value for endFrontLine index */}
          onChange={handleEndFrontLineIndexChange}
          style={{ color: 'black' }}
          min="0"
          max="100"
        />
      </label>
      <br />
      <label>
        Set curFrontline color
        <input
          type="color"
          value={settings.value.frontLineSettings.frontLineColor}
          onChange={handleCurFrontlineColorChange}
          style={{ color: 'black' }}
        />
      </label>
      <br />
      <button >New FrontLine</button>
      <button >Delete Current FrontLine</button>
    </div>
  );
};

export default FrontlineLayerSettings;
