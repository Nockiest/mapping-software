// import { CanvasSettingsContext } from "@/app/canvasEditor/CanvasContext";
import { MousePositionContext } from "@/app/canvasEditor/page";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";
import { useState, useContext, useEffect,useRef } from "react";
import { settings } from "@/app/canvasEditor/Signals";
import Image from "next/image";
import { signal } from "@preact/signals";
import { newMarkerSettings } from "@/app/canvasEditor/settings/MarkerEditorSettings";
export type MarkerProps = {
  topLeftOffset: Vector2;
  initialPosition: Vector2;
  canvasSize: Vector2;
  shouldUpdateOnSettingsChange?: boolean;
  dragHandler?: (event: MouseEvent, isDragging: boolean, currentPosition: Vector2, dragStartPosition: Vector2) => Vector2;
  customSettings?: {x:any}
}

const Marker: React.FC<MarkerProps> = ({
  topLeftOffset,
  initialPosition,
  canvasSize,
  shouldUpdateOnSettingsChange = false,
  dragHandler ,
  customSettings
}) => {
  const [currentPosition, setCurrentPosition] = useState<Vector2>(initialPosition);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [canRemove, setCanRemove] = useState<boolean>(false);
  const [initialMarkerSettings, setInitialMarkerSettings] = useState({
   ...customSettings 
  });
  const usedSettings = shouldUpdateOnSettingsChange ? newMarkerSettings.value : initialMarkerSettings;

  const imageUrl =
    usedSettings.imageURL instanceof File
      ? URL.createObjectURL(usedSettings.imageURL)
      : usedSettings.imageURL; // Change this line

  const handleMouseDown = () => {
    setIsDragged(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragged && dragHandler) {
      const updatedPosition = dragHandler(e, true, topLeftOffset, canvasSize);
      setCurrentPosition(updatedPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragged(false);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (settings.value.activeLayer !== "marker"){return}
    if (canRemove) {
      const markerElement = e.currentTarget as HTMLDivElement;
      markerElement.remove();
      console.log('Marker destroyed!');
    }
    setCanRemove(true);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragged]);

  const markerStyle: React.CSSProperties = {
    left: `${currentPosition.x}px`,
    top: `${currentPosition.y}px`,
    width: `${usedSettings.width}px`,
    color: `${usedSettings.textColor} `,
    height: `${usedSettings.width}px`,
    fontSize: `${usedSettings.width / 4}px`,
    backgroundColor: usedSettings.color,
    backgroundImage: usedSettings.imageURL ? `url(${imageUrl})` : 'none',
    zIndex: isDragged ? 10 : 1,
  };

  const textBackgroundStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '5px',
    borderRadius: '5px',
    userSelect: 'none',
  };

  const imageStyle: React.CSSProperties = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  };

  return (
    <div
      style={markerStyle}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      className="marker"
    >
      <p style={{ ...textBackgroundStyle, top: '-5px' }}>{usedSettings.topValue}</p>
      {usedSettings.width > 20 && (
        <p style={{ ...textBackgroundStyle, bottom: '-5px' }}>{usedSettings.bottomValue}</p>
      )}
    </div>
  );
};

export default Marker;
 

