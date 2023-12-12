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
import { markerSettings } from "@/app/canvasEditor/Signals";
import Point from "../frontline/Point";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { extractImageURL } from "../utility/utils";
import { movePosByOffset } from "../utility/CanvasUtils";
type MarkerProps = {
  initialPosition: Vector2;
  shouldUpdateOnSettingsChange?: boolean;
  customStyling?: MarkerSettings;
  id: string;
  dragHandler?: Function;
  topLeftOffset?: Vector2;
  boundToCanvasEditor?: boolean;
  centerPosition: Vector2;
} & Partial<PositionedText>;

export const MarkerDefaultSettings: Omit<
  MarkerSettings,
  "popularMarkerColors"
> = {
  radius: 5,
  color: `#000000`,
  textColor: `#000000`,
  topText: "",
  bottomText: "",
  imageURL: null,
};

/*
I dont thing the dragging of this component would work properly, when it wouldnt be part of the
markrer canvas layer. The problem is that the updatePos function updates the pos of the marker
inside of the markers.value array which may not contain all the instance of this marker
*/

const Marker: React.FC<MarkerProps> = ({
  initialPosition,
  shouldUpdateOnSettingsChange = false,
  dragHandler,
  customStyling,
  id,
  boundToCanvasEditor = false,
  centerPosition,
}) => {
  const [canRemove, setCanRemove] = useState<boolean>(false);
  const [initialMarkerSettings] = useState<Partial<MarkerSettings>>({
    ...customStyling,
  });
  const usedSettings = shouldUpdateOnSettingsChange
    ? markerSettings.value
    : initialMarkerSettings;

  const imageURL = extractImageURL(
    usedSettings?.imageURL,
    MarkerDefaultSettings.imageURL
  );

  const mergedSettings = { ...MarkerDefaultSettings, ...usedSettings };

  const handleMouseMove = (newPosition: Vector2) => {
    console.log(newPosition);
    if (dragHandler) {
      dragHandler(id, newPosition);
    }
  };

  useEffect(() => {
    if (shouldUpdateOnSettingsChange) {
      centerPosition = initialPosition;
    }
  }, [initialPosition]);
  const markerStyle: React.CSSProperties = {
    width: `${mergedSettings.radius * 2}px`,
    color: mergedSettings.textColor,
    height: `${mergedSettings.radius * 2}px`,
    fontSize: `${mergedSettings.radius / 4}px`,
    backgroundColor: mergedSettings.color,
    backgroundImage: mergedSettings.imageURL ? `url(${imageURL})` : "none",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const markerTextStyle: React.CSSProperties = {
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

  useEffect(() => {
    if (
      (!boundToCanvasEditor && shouldUpdateOnSettingsChange) ||
      !dragHandler
    ) {
      return;
    }

    if (
      settings.value.canvasSize.x < mergedSettings.radius ||
      settings.value.canvasSize.y < mergedSettings.radius
    ) {
      handleDelete();
    }

    const newPos: Vector2 = {
      x: Math.min(
        settings.value.canvasSize.x - mergedSettings.radius / 2,
        centerPosition.x
      ),
      y: Math.min(
        settings.value.canvasSize.y - mergedSettings.radius / 2,
        centerPosition.y
      ),
    };
    dragHandler(id, newPos);
  }, [settings.value.canvasSize]);

  if (!centerPosition) {
    return;
  }
  return (
    <Point
      radius={mergedSettings.radius / 2}
      styling={{ ...markerStyle }}
      centerPosition={centerPosition}
      rightClk={handleDelete}
      onDrag={(pos) => handleMouseMove(pos)}
      className="marker"
      id={id}
    >
      <p style={{ ...markerTextStyle, marginTop: "2px", background: "black" }}>
        {Math.round(centerPosition?.x)} {Math.round(centerPosition?.y)}
      </p>
      {mergedSettings.radius > 20 && (
        <p
          style={{
            ...markerTextStyle,
            marginTop: mergedSettings.radius
              ? `${mergedSettings.radius / 5}px`
              : "10px",
          }}
        >
          {mergedSettings.bottomText}
        </p>
      )}
    </Point>
  );
};

export default Marker;
