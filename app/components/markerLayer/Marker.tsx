// import { CanvasSettingsContext } from "@/app/canvasEditor/CanvasContext";
import { MousePositionContext } from "@/app/canvasEditor/page";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color, MarkerSettings, MarkerType } from "@/public/types/OtherTypes";
import { useState, useContext, useEffect,useRef } from "react";
import { settings } from "@/app/canvasEditor/Signals";
import Image from "next/image";
import { signal } from "@preact/signals";
import { newMarkerSettings } from "@/app/canvasEditor/settings/MarkerEditorSettings";
import Point from "../frontline/Point";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";

type MarkerProps = MarkerType & {
  initialPosition: Vector2;
  shouldUpdateOnSettingsChange?: boolean;
  dragHandler?: (
    event: MouseEvent,
    isDragging: boolean,
    currentPosition: Vector2,
    dragStartPosition: Vector2
  ) => Vector2;
};

const Marker: React.FC<MarkerProps> = ({
  topText,
  bottomText,
  topLeftOffset,
  initialPosition,
  shouldUpdateOnSettingsChange = false,
  dragHandler,
  customStyling,
}) => {
  const [currentPosition, setCurrentPosition] = useState<Vector2>(initialPosition);
  const [canRemove, setCanRemove] = useState<boolean>(false);
  const [initialMarkerSettings] = useState<MarkerSettings>({ ...customStyling });
  const usedSettings = shouldUpdateOnSettingsChange ? newMarkerSettings.value : initialMarkerSettings;

  const defaultSettings: Omit<MarkerSettings, `popularMarkerColors`> = {
    width: 5,
    color: `#000000`,
    textColor: `#000000`,
    topValue: '',
    bottomValue: '',
    imageURL: null,
  };
 
  const imageUrl =
  usedSettings.imageURL? usedSettings.imageURL instanceof File
    ? URL.createObjectURL(usedSettings.imageURL)
    : usedSettings.imageURL : defaultSettings.imageURL;


  const mergedSettings = { ...defaultSettings, ...usedSettings };

  const handleMouseMove = (position: Vector2) => {
    if (dragHandler) {
      const updatedPosition = {
        x: position.x - topLeftOffset.x + mergedSettings.width,
        y: position.y - topLeftOffset.y + mergedSettings.width,
      };
      setCurrentPosition(updatedPosition);
    }
  };

  const handleContextMenu = (e: React.MouseEvent ) => {
    e.preventDefault();
    if (settings.value.activeLayer !== 'marker') {
      return;
    }
    if (canRemove) {
      const markerElement = e.currentTarget as HTMLDivElement;
      markerElement.remove();
      console.log('Marker destroyed!');
    }
    setCanRemove(true);
  };

  const markerStyle: React.CSSProperties = {
    width: `${mergedSettings.width}px`,
    color: mergedSettings.textColor,
    height: `${mergedSettings.width}px`,
    fontSize: `${mergedSettings.width / 4}px`,
    backgroundColor: mergedSettings.color,
    backgroundImage: mergedSettings.imageURL ? `url(${imageUrl})` : 'none',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const textBackgroundStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '5px',
    borderRadius: '5px',
    userSelect: 'none',
  };

  return (
    <Point
      radius={mergedSettings.width}
      styling={markerStyle}
      position={currentPosition}
      rightClk={(e) => handleContextMenu(e)}
      onDrag={(position) => handleMouseMove(position)}
      className="marker"
    >
      <p style={{ ...textBackgroundStyle, top: '-5px' }}>{mergedSettings.topValue}</p>
      {mergedSettings.width > 20 && (
        <p style={{ ...textBackgroundStyle, bottom: '-5px' }}>{mergedSettings.bottomValue}</p>
      )}
    </Point>
  );
};

export default Marker;
 
