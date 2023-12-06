import React from "react";
import { useCanvas } from "./CanvasContext";
import { settings } from "./Signals";
import ReusableLayer from "../components/utility/ResuableLayer";
import { timeline } from "./Signals";
import { v4 as uuidv4 } from "uuid";
const Timeline = () => {


  return (
    <div className="w-full border flex   flex-row-reverse p-0  gap-x-0   border-solid border-gray-500   bg-gray-200">
        {timeline.value.map((canvasRef, index) => (
          <div
            className="relative p-0"
            style={{ width: settings.value.canvasSize.x }}
          >

            <ReusableLayer
              key={uuidv4()}
              layerName='none'
              canvasRef={canvasRef}
            >{timeline.value.length}</ReusableLayer>
          </div>
        ))}
    </div>
  );
};

export default Timeline;

//   <canvas
//     key={index}
//     ref={canvasRef|| undefined}
//     className='mr-2' // Adjust the margin as needed
//     width={settings.value.canvasSize.x}
//     height={settings.value.canvasSize.y}
//   />
// ))}
