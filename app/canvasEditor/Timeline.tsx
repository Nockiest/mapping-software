import React, { useEffect, useState } from "react";
import { useCanvas } from "./CanvasContext";
import { settings } from "./Signals";
import ReusableLayer from "../components/utility/ResuableLayer";
import { timeline } from "./Signals";
import { v4 as uuidv4 } from "uuid";
import IndexLabel from "../components/utility/IndexLabel";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { TimelineFrame } from "@/public/types/OtherTypes";

const Timeline: React.FC = () => {
  const handleDownloadImages = () => {
    const zip = new JSZip();
    // Add each image to the zip file
    timeline.value.forEach((frame, index) => {
      const base64Data = frame.imageURL.split(",")[1];
      zip.file(`image_${index + 1}.png`, base64Data, { base64: true });
    });
    // Generate the zip file and trigger download
    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "timeline_images.zip");
    });
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...timeline.value];
    updatedImages.splice(index, 1);
    timeline.value = updatedImages;
  };

  const [biggestImage, setBiggestImage] = useState<TimelineFrame | null>(null);

  const findBiggestImage = (): TimelineFrame => {
    const bigImg = timeline.value.reduce(
      (prev, current) => {
        const prevArea = prev.width * prev.height;
        const currentArea = current.width * current.height;
        return prevArea > currentArea ? prev : current;
      },
      { imageURL: "", width: 0, height: 0 }
    );
    return bigImg;
  };

  useEffect(() => {
    setBiggestImage(findBiggestImage());
  }, [timeline.value]);

  const timelineImageSize = 400;

  if (!biggestImage) {
    return null;
  }

  return (
    <div className="relative w-full overflow-x-auto bg-gray-200  ">
      <div
        className="flex h-auto overflow-y-hidden flex-row-reverse gap-1 py-1"
        style={{
          width: timelineImageSize * timeline.value.length - 0,
        }}
      >
        {timeline.value.map((frame, index) => {
          const finalWidth =
            frame === biggestImage
              ? timelineImageSize
              : timelineImageSize * (frame.width / biggestImage.width); // biggestImage.width ? frame.width / biggestImage.width : 1;
          const finalHeight =
            frame === biggestImage
              ? timelineImageSize
              : timelineImageSize * (frame.height / biggestImage.height); //= biggestImage.height ? frame.height / biggestImage.height : 1;

          return (
            <div
              className="relative border-2"
              key={index}
              style={{
                border: "black 1px solid",
                width: timelineImageSize,
                height: timelineImageSize,
              }}
            >
              <button
                onClick={() => handleDeleteImage(index)}
                className="z-50  absolute top-0 right-0 p-2 bg-red-500 text-white rounded-md cursor-pointer"
              >
                Delete frame
              </button>

              <div
                style={{
                  width: finalWidth,
                  height: finalHeight,
                  border: "black 1px solid",
                }}
              >
                <img
                  src={frame.imageURL}
                  width={finalWidth}
                  height={finalHeight}
                  alt={`Image ${index}`}
                />
              </div>

              <IndexLabel
                label={(index + 1).toString()}
                customClasses="absolute top-0 left-0 text-lg"
              />
            </div>
          );
        })}

      </div>
      {timeline.value.length > 0 && (
        <button
          onClick={handleDownloadImages}
          className="mt-4 p-2 bg-blue-500 z-10 text-white rounded-md cursor-pointer"
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
          }}
        >
          Download Images
        </button>
      )}
    </div>
  );
};

export default Timeline;
