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

  const deleteCurrentFrontLine = (e) => {
    const activeFrontlineId = settings.value.frontLineSettings.activeFrontlineId;
  
    if (activeFrontlineId) {
      settings.value.frontLineSettings.frontLines = settings.value.frontLineSettings.frontLines.filter(
        (frontline) => frontline.idNum !== activeFrontlineId
      );
    }
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
      { settings.value.frontLineSettings.activeFrontlineId
      &&<button onClick={deleteCurrentFrontLine} >Delete Current FrontLine</button>}
    </div>
  );
};

export default FrontlineLayerSettings;
