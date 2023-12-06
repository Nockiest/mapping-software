import React from "react";
import { useCanvas } from "./CanvasContext";
import { settings } from "./Signals";
import ReusableLayer from "../components/utility/ResuableLayer";
import { timeline } from "./Signals";
import { v4 as uuidv4 } from "uuid";
const Timeline: React.FC = () => {


  return (
    <div className="  flex h-auto overflow-x-hidden overflow-y-hidden flex-row-reverse     bg-gray-200">
      <div className="flex-shrink-0">
        {timeline.value.map((imageDataURL, index) => (
          <div key={index}   style={{  width:settings.value.canvasSize.x / 2,   height:settings.value.canvasSize.y / 2 }}>
            <img
              src={imageDataURL}
              width={settings.value.canvasSize.x / 2}  // Render two times smaller
              height={settings.value.canvasSize.y / 2}  // Render two times smaller
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </div>
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
