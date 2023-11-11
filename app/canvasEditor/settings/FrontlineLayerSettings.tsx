import React from "react";
import { useCanvas } from "../CanvasContext";
import { settings } from "../Signals";
import { computed } from "@preact/signals";
import { findActiveFrontLine } from "@/app/components/utility/otherUtils";
const FrontlineLayerSettings = () => {
  const handleEndFrontLineIndexChange = (e) => {
    const activeFrontline  =settings.value.frontLineSettings.frontLines.find(
          (frontline) =>
            frontline.idNum === settings.value.frontLineSettings.activeFrontlineId
        );
    // settings.value.frontLineSettings.frontLines.find(
    //   (frontline) =>
    //     frontline.idNum === settings.value.frontLineSettings.activeFrontlineId
    // );

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
  };

  const deleteCurrentFrontLine = (e) => {
    const activeFrontlineId =
      settings.value.frontLineSettings.activeFrontlineId;

    if (activeFrontlineId) {
      settings.value.frontLineSettings.frontLines =
        settings.value.frontLineSettings.frontLines.filter(
          (frontline) => frontline.idNum !== activeFrontlineId
        );
    }
  };

 

//   const maxEditedIndexValue = computed(() => {
//     const frontLine = findActiveFrontLine();
//     return frontLine?.points.length || 0;
//   }); //findActiveFrontLine()?.points.length || 0

  return (
    <div>
      <label>
        Set endFrontLine index
        <input
          type="number"
          value={settings.value.frontLineSettings.editedPointNum}
          onChange={handleEndFrontLineIndexChange}
          style={{ color: "black" }}
          min="0"
        //   max={maxEditedIndexValue}
        />
      </label>
      <br />
      <label>
        Set curFrontline color
        <input
          type="color"
          value={settings.value.frontLineSettings.frontLineColor}
          onChange={handleCurFrontlineColorChange}
          style={{ color: "black" }}
        />
      </label>
      <br />
      <button>New FrontLine</button>
      {settings.value.frontLineSettings.activeFrontlineId && (
        <button onClick={deleteCurrentFrontLine}>
          Delete Current FrontLine
        </button>
      )}
    </div>
  );
};

export default FrontlineLayerSettings;
