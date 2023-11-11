import React from "react";
import { useCanvas } from "../CanvasContext";
import { settings } from "../Signals";
import { computed } from "@preact/signals";
import { findActiveFrontLine } from "@/app/components/utility/otherUtils";
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FrontlineData } from "../layers/FronlineLayer";
 
const FrontlineLayerSettings = () => {
  const handleEndFrontLineIndexChange = (e) => {
    const activeFrontline = findActiveFrontLine();

    if (activeFrontline) {
      const maxPoints = activeFrontline.points.length;
      const newValue = parseInt(e.target.value, 10);

      // Update the editedPointNum in settings
      settings.value.frontLineSettings.editedPointNum = newValue;

      // Update the max attribute of the input
      e.target.max = maxPoints.toString();
    }
  };

  const handleCurFrontlineColorChange = (e) => {
    settings.value.frontLineSettings.frontLineColor = e.target.value;
    const changedFrontline = findActiveFrontLine();

    if (changedFrontline) {
      changedFrontline.color = e.target.value;
    }
  };

  const deleteCurrentFrontLine = () => {
    const activeFrontlineId = settings.value.frontLineSettings.activeFrontlineId;

    if (activeFrontlineId) {
      settings.value.frontLineSettings.frontLines = settings.value.frontLineSettings.frontLines.filter(
        (frontline) => frontline.idNum !== activeFrontlineId
      );
    }
  };

  const handleNewFrontLine = () => {
    const newFrontlineData: FrontlineData = {
      idNum: uuidv4(),
      points: [],
      topLeftPoint: { x: 0, y: 0 },
      radius: 2,
      color: settings.value.frontLineSettings.frontLineColor,
    };

    // Add the new frontline to the frontLines array
    settings.value.frontLineSettings.frontLines.push(newFrontlineData);

    // Set the new frontline as active
    settings.value.frontLineSettings.activeFrontlineId = newFrontlineData.idNum;
  };

  const handleLayerChange = (e) => {
    const selectedLayerId = e.target.value;
    settings.value.frontLineSettings.activeFrontlineId = selectedLayerId;
  };

  return (
    <div>
      <label>
        Set endFrontLine index
        <input
          type="number"
          value={settings.value.frontLineSettings.editedPointNum}
          onChange={handleEndFrontLineIndexChange}
          style={{ color: 'black' }}
          min="-1"
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
      <button onClick={handleNewFrontLine}>New FrontLine</button>
      <br />
      <label>
        Choose Active Layer:
        <select style={{ color: 'black' }} onChange={handleLayerChange} value={settings.value.frontLineSettings.activeFrontlineId}>
          {settings.value.frontLineSettings.frontLines.map((frontline) => (
            <option key={frontline.idNum} value={frontline.idNum}>
              {`ID: ${frontline.idNum}, Color: ${frontline.color}, Index: ${settings.value.frontLineSettings.frontLines.indexOf(frontline)}`}
            </option>
          ))}
        </select>
      </label>
      <br />
      {settings.value.frontLineSettings.activeFrontlineId && (
        <button onClick={deleteCurrentFrontLine}>Delete Current FrontLine</button>
      )}
    </div>
  );
};

export default FrontlineLayerSettings;