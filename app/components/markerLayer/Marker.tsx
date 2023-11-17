// import { CanvasSettingsContext } from "@/app/canvasEditor/CanvasContext";
import { MousePositionContext } from "@/app/canvasEditor/MouseContext";
import { Vector2 } from "@/public/types/GeometryTypes";
import {
  Color,
  MarkerSettings,
  MarkerType,
  PositionedText,
} from "@/public/types/OtherTypes";
import { useState, useContext, useEffect, useRef } from "react";
import { markers, settings } from "@/app/canvasEditor/Signals";
import Image from "next/image";
import { signal } from "@preact/signals";
import { newMarkerSettings } from "@/app/canvasEditor/settings/MarkerEditorSettings";
import Point from "../frontline/Point";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { extractImageUrl } from "../utility/utils";
type MarkerProps = {
  topLeftOffset: Vector2;
  initialPosition: Vector2;
  shouldUpdateOnSettingsChange?: boolean;
  customStyling?: MarkerSettings;
  id: string;
  dragHandler?: (
    position: Vector2,
    isDragging: boolean,
    currentPosition: Vector2,
    dragStartPosition: Vector2
  ) => Vector2;
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
  topLeftOffset,
  initialPosition,
  shouldUpdateOnSettingsChange = false,
  dragHandler,
  customStyling,
  id,
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

  const handleMouseMove = (position: Vector2) => {
    if (dragHandler) {
      // Call dragHandler with the updated position
      const updatedPosition = dragHandler(
        position,
        false,
        topLeftOffset,
        settings.value.canvasSize
      );
      setCurrentPosition(updatedPosition);
      // Update the position of the marker in markers.value
      markers.value = markers.value.map((marker) =>
        marker.id === id ? { ...marker, position: updatedPosition } : marker
      );
    }
  };

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

  const textBackgroundStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "5px",
    borderRadius: "5px",
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
      styling={{ ...markerStyle }}
      position={currentPosition}
      rightClk={handleDelete}
      onDrag={(position) => handleMouseMove(position)}
      className="marker"
      onDelete={handleDelete}
      id={id}
    >
      <p style={{ ...textBackgroundStyle, top: "-5px" }}>
        {mergedSettings.topText}
      </p>
      {mergedSettings.width > 20 && (
        <p style={{ ...textBackgroundStyle, bottom: "-5px" }}>
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
