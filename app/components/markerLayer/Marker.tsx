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
import { extractImageUrl } from "../utility/utils";
import { movePosByOffset } from "../utility/CanvasUtils";
type MarkerProps = {
  initialPosition: Vector2;
  shouldUpdateOnSettingsChange?: boolean;
  customStyling?: MarkerSettings;
  id: string;
  dragHandler?: FollowMouseFunction;
  topLeftOffset?: Vector2;
  boundToCanvasEditor?: boolean;
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

const Marker: React.FC<MarkerProps> = ({
  topText,
  bottomText,
  initialPosition,
  shouldUpdateOnSettingsChange = false,
  dragHandler,
  customStyling,
  id,
  topLeftOffset,
  boundToCanvasEditor = false,
}) => {
  const [currentPosition, setCurrentPosition] =
    useState<Vector2>(initialPosition);
  const [canRemove, setCanRemove] = useState<boolean>(false);
  const [initialMarkerSettings] = useState<Partial<MarkerSettings>>({
    ...customStyling,
  });
  const usedSettings = shouldUpdateOnSettingsChange
    ? markerSettings.value
    : initialMarkerSettings;

  const imageUrl = extractImageUrl(
    usedSettings?.imageURL,
    MarkerDefaultSettings.imageURL
  );

  const mergedSettings = { ...MarkerDefaultSettings, ...usedSettings };

  const handleMouseMove = (newPosition: Vector2) => {
    if (dragHandler) {
      const adjustedPos = movePosByOffset(
        newPosition,
        mergedSettings.radius / 2
      );
      setCurrentPosition(adjustedPos);
      // Update the position of the marker in markers.value

    }
  };

  useEffect(() => {
    if (shouldUpdateOnSettingsChange) {
      setCurrentPosition(initialPosition);
    }
  }, [initialPosition]);
  const markerStyle: React.CSSProperties = {
    width: `${mergedSettings.radius}px`,
    color: mergedSettings.textColor,
    height: `${mergedSettings.radius}px`,
    fontSize: `${mergedSettings.radius / 4}px`,
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

  useEffect(() => {
    if (!boundToCanvasEditor) {
      return;
    }

    setCurrentPosition({
      x: Math.min(
        settings.value.canvasSize.x - mergedSettings.radius / 2,
        currentPosition.x
      ),
      y: Math.min(
        settings.value.canvasSize.y - mergedSettings.radius / 2,
        currentPosition.y
      ),

    }


    );
  }, [settings.value.canvasSize]);

  useEffect(() => {
    markers.value = markers.value.map((marker) =>
    marker.id === id ? { ...marker, position: currentPosition } : marker
  );
  }, [currentPosition])

  return (
    <Point
      radius={mergedSettings.radius}
      styling={{ ...markerStyle }}
      position={currentPosition}
      rightClk={handleDelete}
      onDrag={(position) => handleMouseMove(position)}
      className="marker"
      onDelete={handleDelete}
      id={id}
    >
      <p style={{ ...markerTextStyle, marginTop: "2px" }}>
      { Math.round(currentPosition.x) } {/* {mergedSettings.topText} */}
      </p>
      {mergedSettings.radius > 20 && (
        <p
          style={{
            ...markerTextStyle,
            marginTop: usedSettings.radius
              ? `${usedSettings.radius / 5}px`
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
