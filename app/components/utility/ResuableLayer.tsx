import { settings } from '@/app/canvasEditor/Signals';
import { Settings } from '@/public/types/OtherTypes';
import React from 'react';

interface ReusableLayerProps {
  canvasRef:  React.RefObject<HTMLCanvasElement | undefined>;
  layerName: LayerNames  ;
  onLeftClick?: (e:React.MouseEvent) => void;
  onRightClick?: () => void;
  onMouseUp?: () => void;
  onContextMenu?:() => void;
  style?: {
    [key: string]: string; // Allow any CSS property
  };
}

const ReusableLayer: React.FC<ReusableLayerProps> = ({ canvasRef, layerName,    onLeftClick, onRightClick,onMouseUp, style }) => {
  const handleMouseClick = (e: React.MouseEvent) => {
    console.log("HANDLING CLICK", layerName ,settings.value.activeLayer,  layerName ===settings.value.activeLayer)
    e.preventDefault()
    if (e.button === 0 && onLeftClick) {
      // Left click
      onLeftClick(e);
    }else if (e.button === 1 && onMouseUp) {
        // mouse click
        onMouseUp();
      } else if (e.button === 2 && onRightClick) {
      // Right click
      onRightClick();
    }
  };

  return (
    <canvas className={`canvas-rectangle top-0 absolute ${layerName}`} 
        onClick={handleMouseClick} 
        onContextMenu={handleMouseClick} 
        ref={canvasRef}
        width={settings.value.canvasSize.x} 
        height={settings.value.canvasSize.y} 
        style={{
            pointerEvents: layerName === settings.value.activeLayer ? 'auto' : 'none',
            ...style
          }}
        > 
        
    </canvas>
  );
};

export default ReusableLayer;