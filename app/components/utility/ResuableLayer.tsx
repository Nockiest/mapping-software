import { settings } from '@/app/canvasEditor/Signals';
import React from 'react';

interface ReusableLayerProps {
  canvasRef:  React.RefObject<HTMLCanvasElement | undefined>;
  layerName: string  ;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  style?: {
    [key: string]: string; // Allow any CSS property
  };
}

const ReusableLayer: React.FC<ReusableLayerProps> = ({ canvasRef, layerName,    onLeftClick, onRightClick,style }) => {
  const handleMouseClick = (e: React.MouseEvent) => {
    if (layerName !== settings.value.activeLayer) {return}
    if (e.button === 0 && onLeftClick) {
      // Left click
      onLeftClick();
    } else if (e.button === 2 && onRightClick) {
      // Right click
      onRightClick();
    }
  };

  return (
    <canvas className={`canvas-rectangle top-0 absolute ${layerName}`} 
        onClick={handleMouseClick} 
        ref={canvasRef}
        width={settings.value.canvasSize.x} 
        height={settings.value.canvasSize.y} 
        style={{ pointerEvents: 'none',  ...style }}> 
 
    </canvas>
  );
};

export default ReusableLayer;