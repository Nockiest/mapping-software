import React from "react";
import { useCanvas } from "./CanvasContext";
import { settings } from "./Signals";
import ReusableLayer from "../components/utility/ResuableLayer";
import { timeline } from "./Signals";
import { v4 as uuidv4 } from "uuid";
import IndexLabel from "../components/utility/IndexLabel";
import JSZip from "jszip";
import { saveAs } from "file-saver";
const Timeline: React.FC = () => {
  const handleDownloadImages = () => {
    // Create a zip file
    const zip = new JSZip();

    // Add each image to the zip file
    timeline.value.forEach((imageDataURL, index) => {
      const base64Data = imageDataURL.split(",")[1];
      zip.file(`image_${index + 1}.png`, base64Data, { base64: true });
    });

    // Generate the zip file and trigger download
    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "timeline_images.zip");
    });
  };

  const handleDeleteImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the parent div
    console.log("click");
    const updatedImages = [...timeline.value];
    updatedImages.splice(index, 1);
    timeline.value = updatedImages;
    console.log("splicing");
  };

  return (
    <div   className="relative w-full overflow-x-auto bg-gray-200">
      <div
        className="flex h-auto overflow-y-hidden flex-row-reverse gap-1 py-1"
        style={{
          width:
            (settings.value.canvasSize.x / 2) * timeline.value.length -
            settings.value.canvasSize.x,
        }}
      >
        {timeline.value.map((imageDataURL, index) => (
          <div
            className="relative border-2"
            key={uuidv4()}
            style={{
              border: "black 1px solid",
              width: "300px",
              height: "300px",
            }}
          >
            <button
              onClick={(e) => handleDeleteImage(index, e)}
              className="z-10 top-0 right-0 p-2 bg-red-500 text-white rounded-md cursor-pointer"
            >
              Delete
            </button>
            <img
              src={imageDataURL}
              width={settings.value.canvasSize.x / 2} // Render two times smaller
              height={settings.value.canvasSize.y / 2} // Render two times smaller
              alt={`Image ${index}`}
            />
            <IndexLabel
              label={(index + 1).toString()}
              customClasses="absolute top-0 left-0 text-lg"
            />

          </div>
        ))}
      </div>
      {timeline.value.length > 0 && (
        <button
          onClick={handleDownloadImages}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md cursor-pointer absolute bottom-0 right-0"
        >
          Download Images
        </button>
      )}
       <button
              onClick={() => {console.log('hello')}}
              className="z-10   top-0 right-0 p-2 bg-red-500 text-white rounded-md cursor-pointer"
            >
              Delete
            </button>
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
