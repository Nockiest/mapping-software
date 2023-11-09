import { settings } from '@/app/canvasEditor/Signals';
import { LayerNames, Settings } from '@/public/types/OtherTypes';
import {useEffect} from 'react';

interface ReusableLayerProps {
  canvasRef:  React.RefObject<HTMLCanvasElement | undefined>;
  layerName: LayerNames  ;
  onLeftClick?: (e:React.MouseEvent) => void;
  onRightClick?: (e:React.MouseEvent) => void;
  onMouseUp?: ( ) => void;
  onMouseWheel?: (e:React.MouseEvent) => void;
//   onContextMenu?:() => void;
  style?: {
    [key: string]: string; // Allow any CSS property
  };
}

const ReusableLayer: React.FC<ReusableLayerProps> = ({
  onMouseWheel,
  canvasRef,
  layerName,
  onLeftClick,
  onRightClick,
  onMouseUp,
  style,
}) => {

  const canvas = canvasRef.current
  const isActive =  layerName === settings.value.activeLayer
  const handleMouseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // console.log("HANDLING CLICK", layerName, settings.value.activeLayer, layerName === settings.value.activeLayer);
    console.log(isActive)
    if (!isActive) {
      return;
    }

    if (e.button === 0 && onLeftClick) {
      // Left click
      onLeftClick(e);
    } else if (e.button === 1 && onMouseWheel) {
      // Middle mouse button or mouse wheel click
      onMouseWheel(e);
    } else if (e.button === 2 && onRightClick) {
      // Right click
      onRightClick(e);
    }
  };

 
  
  
  return (
    <canvas
      className={`canvas-rectangle absolute  top-0  ${isActive ? 'z-20 ' : `${settings.value.canvasZindexes[layerName] } `}`}
      onClick={isActive? handleMouseClick: null}
      onContextMenu={isActive? handleMouseClick: (e) => {e.preventDefault()}}
      // onMouseUp={handleMouseUp}
      ref={canvasRef}
      width={settings.value.canvasSize.x}
      height={settings.value.canvasSize.y}
      style={{
        pointerEvents:isActive ? 'auto' : 'none',
        ...style,
      }}
    ></canvas>
  );
};

export default ReusableLayer;

 