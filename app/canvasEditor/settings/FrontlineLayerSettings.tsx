import React, {useState, useEffect} from "react";
import { useCanvas } from "../CanvasContext";
import { settings } from "../Signals";
import { computed,   } from "@preact/signals";
import { findActiveFrontLine } from "@/app/components/utility/otherUtils";
import { v4 as uuidv4 } from 'uuid';
import { FrontlineData } from "../layers/FronlineLayer";
 
const FrontlineLayerSettings = () => {
  const [insertionPointIndex, setEditedPointNum] = useState(settings.value.frontLineSettings.insertionPointIndex);
  const [maxEndPointNumValue, setMaxEndPointNumValue] = useState(0)
  //  computed(() =>  {
  //   const activeFrontLine =findActiveFrontLine()
  //   return activeFrontLine?.points.length
  // })
  useEffect(() => {
    const activeFrontLine =findActiveFrontLine()
    setMaxEndPointNumValue(activeFrontLine?.points.length|| 0)
     
  }, )
  useEffect(() => {
    // Update local state when settings change
    setEditedPointNum(settings.value.frontLineSettings.insertionPointIndex);
  }, [settings.value.frontLineSettings.insertionPointIndex]);

  const handleEndFrontLineIndexChange = (e) => {
    console.log("CHANGING VALUE");
    const activeFrontline = findActiveFrontLine();
  
    const newValue = parseInt(e.target.value, 10);
  
    if (!isNaN(newValue)) {
      // Update the insertionPointIndex in settings and local state
      settings.value.frontLineSettings.insertionPointIndex = newValue;
      setEditedPointNum(newValue);
    } else {
      // If the value is NaN, set it to -1
      settings.value.frontLineSettings.insertionPointIndex = -1;
      setEditedPointNum(-1);
    }
  
    if (activeFrontline) {
      const maxPoints = activeFrontline.points.length;
  
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

  const handleThicknessChange = (e) => {
    const newThickness = parseFloat(e.target.value);
    const activeFrontline = findActiveFrontLine();

    if (activeFrontline) {
      activeFrontline.thickness = newThickness;
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
      thickness: 4,
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
      {maxEndPointNumValue}
      <label>
        Set insertion index {settings.value.frontLineSettings.insertionPointIndex}
        <input
          type="range"
          min="-1"
          max={maxEndPointNumValue-1 }
          onChange={handleEndFrontLineIndexChange}
          style={{ color: 'black' }}
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
      <label>
        Set line thickness:
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={findActiveFrontLine()?.thickness || 0}
          onChange={handleThicknessChange}
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