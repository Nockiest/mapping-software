// import { CanvasSettingsContext } from "@/app/canvasEditor/CanvasContext";
// import { MousePositionContext } from "@/app/canvasEditor/MouseContext";
import { Vector2 } from "@/public/types/GeometryTypes";
import {
  Color,
  FollowMouseFunction,
  MarkerSettings,
  MarkerType,
  PositionedText,
} from "@/public/types/OtherTypes";
import { useState, useContext, useEffect, useRef } from "react";
import { markers, settings } from "@/app/canvasEditor/Signals";
import Image from "next/image";
import { signal } from "@preact/signals";
import { newMarkerSettings } from "@/app/canvasEditor/settings/markerSettings/MarkerEditorSettings";
import Point from "../frontline/Point";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { extractImageUrl } from "../utility/utils";
import { movePosByOffset } from "../utility/CanvasUtils";
type MarkerProps = {
  initialPosition: Vector2;
  shouldUpdateOnSettingsChange?: boolean;
  customStyling?: MarkerSettings;
  id: string;
  dragHandler?: FollowMouseFunction;
  topLeftOffset?: Vector2;
} & Partial<PositionedText>;

export const MarkerDefaultSettings: Omit<
  MarkerSettings,
  "popularMarkerColors"
> = {
  width: 5,
  color: `#000000`,
  textColor: `#000000`,
  topText: "",
  bottomText: "",
  imageURL: null,
};

const Marker: React.FC<MarkerProps> = ({
  
  topText,
  bottomText,
  initialPosition,
  shouldUpdateOnSettingsChange = false,
  dragHandler,
  customStyling,
  id,
  topLeftOffset
}) => {
  const [currentPosition, setCurrentPosition] =
    useState<Vector2>(initialPosition);
  const [canRemove, setCanRemove] = useState<boolean>(false);
  const [initialMarkerSettings] = useState<Partial<MarkerSettings>>({
    ...customStyling,
  });
  const usedSettings = shouldUpdateOnSettingsChange
    ? newMarkerSettings.value
    : initialMarkerSettings;

  const imageUrl = extractImageUrl(usedSettings?.imageURL, MarkerDefaultSettings.imageURL);

  const mergedSettings = { ...MarkerDefaultSettings, ...usedSettings };

  const handleMouseMove = (newPosition: Vector2) => {
    if (dragHandler) {
      const adjustedPos = movePosByOffset(newPosition,mergedSettings.width/2 )
      setCurrentPosition(adjustedPos);
      // Update the position of the marker in markers.value
      markers.value = markers.value.map((marker) =>
        marker.id === id ? { ...marker, position: adjustedPos } : marker
      );
    }
  };
  
  useEffect(() => {
    if (shouldUpdateOnSettingsChange){
      setCurrentPosition(initialPosition)
    }
  }, [initialPosition])
  const markerStyle: React.CSSProperties = {
    width: `${mergedSettings.width}px`,
    color: mergedSettings.textColor,
    height: `${mergedSettings.width}px`,
    fontSize: `${mergedSettings.width / 4}px`,
    backgroundColor: mergedSettings.color,
    backgroundImage: mergedSettings.imageURL ? `url(${imageUrl})` : "none",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const markerTextStyle: React.CSSProperties = {
    //position: 'absolute',
    textAlign: "center",
    userSelect: "none",
  };

  const handleDelete = () => {
    if (canRemove) {
      // Remove the marker with the specified id
      markers.value = markers.value.filter((marker) => marker.id !== id);
    } else {
      setCanRemove(true);
    }
  };

  return (
    <Point
      radius={mergedSettings.width}
      styling={{ ...markerStyle,  }}
      position={currentPosition}
      rightClk={handleDelete}
      onDrag={(position) => handleMouseMove(position)}
      className="marker"
      onDelete={handleDelete}
      id={id}
    >
      <p style={{ ...markerTextStyle, marginTop:  '2px' }}>
        {mergedSettings.topText}
      </p>
      {mergedSettings.width > 20 && (
        <p style={{ ...markerTextStyle,   marginTop: usedSettings.width ? `${usedSettings.width / 5}px` : '10px'}}>
          {mergedSettings.bottomText}
        </p>
      )}
      {/* <p className="text-black">{id}</p> */}
      {/* <p className="text-black"> */}
        {/* {Math.round(currentPosition.x)} {Math.round(currentPosition.y)} */}
      {/* </p> */}
    </Point>
  );

 
};

export default Marker;
// const updatedPosition:Vector2 = {
//   x: position.x - topLeftOffset.x + mergedSettings.width,
//   y: position.y - topLeftOffset.y + mergedSettings.width,
// };
