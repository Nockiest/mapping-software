import { settings } from '@/app/canvasEditor/Signals';
import { LayerNames, Settings } from '@/public/types/OtherTypes';
import React from 'react';

interface ReusableLayerProps {
  canvasRef:  React.RefObject<HTMLCanvasElement | undefined>;
  layerName: LayerNames  ;
  onLeftClick?: (e:React.MouseEvent) => void;
  onRightClick?: (e:React.MouseEvent) => void;
  onMouseUp?: (e:React.MouseEvent) => void;
//   onContextMenu?:() => void;
  style?: {
    [key: string]: string; // Allow any CSS property
  };
}

const ReusableLayer: React.FC<ReusableLayerProps> = ({ canvasRef, layerName,    onLeftClick, onRightClick,onMouseUp, style }) => {
  const handleMouseClick = (e: React.MouseEvent) => {
   e.preventDefault()
    console.log("HANDLING CLICK", layerName ,settings.value.activeLayer,  layerName ===settings.value.activeLayer)
    if ( layerName !== settings.value.activeLayer){return}
    // e.preventDefault()
    if (e.button === 0 && onLeftClick) {
      // Left click
      onLeftClick(e);
    }else if (e.button === 1 && onMouseUp) {
        // mouse click
        onMouseUp(e);
      } else if (e.button === 2 && onRightClick) {
      // Right click
      onRightClick(e);
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
            // pointerEvents: layerName === settings.value.activeLayer ? 'auto' : 'none',
            zIndex: layerName === settings.value.activeLayer ? '100' : '0',
            ...style
          }}
        > 
        
    </canvas>
  );
};

export default ReusableLayer;