import React from "react";
import { useCanvas } from "./CanvasContext";
import { settings } from "./Signals";
import ReusableLayer from "../components/utility/ResuableLayer";
import { timeline } from "./Signals";
import { v4 as uuidv4 } from "uuid";
const Timeline: React.FC = () => {


  return (
    <div className=" w-full  overflow-x-auto     bg-gray-200"  >
      <div className="  flex h-auto overflow-y-hidden flex-row-reverse gap-1 py-1"  style={{  width:settings.value.canvasSize.x / 2* timeline.value.length}}>
        {timeline.value.map((imageDataURL, index) => (
          <div className="relative border-2" key={index}   style={{ border: 'black 1px solid', width: '300px'  , height:'300px'}}>
            <img
              src={imageDataURL}
              width={settings.value.canvasSize.x / 2}  // Render two times smaller
              height={settings.value.canvasSize.y / 2}  // Render two times smaller
              alt={`Image ${index}`}
            />
            <p className="absolute top-0 left-0 text-lg red text-black">{index+1}</p>
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
