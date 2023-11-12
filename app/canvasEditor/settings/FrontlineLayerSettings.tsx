import React, {useState, useEffect} from "react";
import { useCanvas } from "../CanvasContext";
import { settings } from "../Signals";
import { computed,   } from "@preact/signals";
import {  findFrontLineObj } from "@/app/components/utility/otherUtils";
import { v4 as uuidv4 } from 'uuid';
import { FrontlineData } from "../layers/FronlineLayer";
 
const FrontlineLayerSettings = () => {
  const [insertionPointIndex, setEditedPointNum] = useState(settings.value.frontLineSettings.insertionPointIndex);
  const [maxEndPointNumValue, setMaxEndPointNumValue] = useState(0)
   
  useEffect(() => {
    const activeFrontLine = settings.value.frontLineSettings.activeFrontline
    setMaxEndPointNumValue(activeFrontLine?.points.length|| 0)
     
  }, )
  useEffect(() => {
    // Update local state when settings change
    setEditedPointNum(settings.value.frontLineSettings.insertionPointIndex);
  }, [settings.value.frontLineSettings.insertionPointIndex]);

  const handleEndFrontLineIndexChange = (e) => {
    console.log("CHANGING VALUE");
    const activeFrontline = settings.value.frontLineSettings.activeFrontline
  
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
    const changedFrontline =  settings.value.frontLineSettings.activeFrontline ;

    if (changedFrontline) {
      changedFrontline.color = e.target.value;
    }
  };

  const handleThicknessChange = (e) => {
    const newThickness = parseFloat(e.target.value);
    const activeFrontline =  settings.value.frontLineSettings.activeFrontline ;

    if (activeFrontline) {
      activeFrontline.thickness = newThickness;
    }
  };

  const deleteCurrentFrontLine = () => {
    const activeFrontline = settings.value.frontLineSettings.activeFrontline ;

    if (activeFrontline) {
      settings.value.frontLineSettings.frontLines = settings.value.frontLineSettings.frontLines.filter(
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
      color: settings.value.frontLineSettings.frontLineColor,
    };

    // Add the new frontline to the frontLines array
    settings.value.frontLineSettings.frontLines.push(newFrontlineData);

    // Set the new frontline as active
    settings.value.frontLineSettings.activeFrontline  = newFrontlineData ;
  };

  const handleLayerChange = (e) => {
    const selectedLayerId = e.target.value;
    const newFrontline = findFrontLineObj(selectedLayerId);
    settings.value.frontLineSettings.activeFrontline = newFrontline;
  };

  return (
    <div>
      <label>
        Set insertion index {settings.value.frontLineSettings.insertionPointIndex}
        <input
          type="range"
          min="-1"
          defaultValue={-1}
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
          value={ settings.value.frontLineSettings.activeFrontline ?.thickness || 0}
          onChange={handleThicknessChange}
        />
      </label>
      <br />
      <button onClick={handleNewFrontLine}>New FrontLine</button>
      <br />
      <label>
        Choose Active Layer:
        <select style={{ color: 'black' }} onChange={handleLayerChange} value={settings.value.frontLineSettings.activeFrontline.idNum}>
        {settings.value.frontLineSettings.frontLines.map((frontline, index) => (
          <option key={frontline.idNum} value={frontline.idNum} style={{backgroundColor: frontline.color, opacity:0.5, cursor:"pointer"}}>
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
            {`, Index: ${settings.value.frontLineSettings.frontLines.indexOf(frontline)}`}
          </option>
        ))}

        </select>
      </label>
      <br />
      {settings.value.frontLineSettings.activeFrontline && (
        <button onClick={deleteCurrentFrontLine}>Delete Current FrontLine</button>
      )}
    </div>
  );
};

export default FrontlineLayerSettings;