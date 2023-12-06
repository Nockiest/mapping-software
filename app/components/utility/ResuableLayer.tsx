import { settings } from '@/app/canvasEditor/Signals';
import { LayerNames, Settings } from '@/public/types/OtherTypes';
import { CSSProperties } from '@mui/material/styles/createMixins';
import {ReactNode, useEffect} from 'react';

type ReusableLayerProps = {
  canvasRef:  React.RefObject<HTMLCanvasElement | null|undefined>;
  layerName: LayerNames  ;
  onLeftClick?: (e:React.MouseEvent) => void;
  onRightClick?: (e:React.MouseEvent) => void;
  onMouseUp?: ( ) => void;
  onMouseWheel?: (e:React.MouseEvent) => void;
  style?: {
    [key: string]: string; // Allow any CSS property

  };
  children?: ReactNode;
  positioning: string
}

const ReusableLayer: React.FC<ReusableLayerProps> = ({
  onMouseWheel,
  canvasRef,
  layerName,
  onLeftClick,
  onRightClick,
  onMouseUp,
  style,
  children, // Add the children prop
  positioning
}) => {
  const canvas = canvasRef.current;
  const isActive = layerName === 'none'? true: layerName === settings.value.activeLayer;

  const handleMouseClick = (e: React.MouseEvent) => {
    e.preventDefault();

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
    <div id={layerName} className={`  ${positioning}   canvas-rectangle   ${isActive ? 'z-30 ' : `${settings.value.canvasZindexes[layerName]} opacity-40  `}`}>
      {/* <h1>{positioning} </h1> */}
      {canvasRef && (
        <>

          <canvas
            onClick={handleMouseClick}
            onContextMenu={isActive ? handleMouseClick : (e) => { e.preventDefault(); }}
            ref={canvasRef as React.RefObject<HTMLCanvasElement>}
            width={settings.value.canvasSize.x}
            height={settings.value.canvasSize.y}
            style={{
              pointerEvents: isActive ? 'auto' : 'none',
              ...style,
            }}
          />

          {children}
        </>
      )}
    </div>

  );
};

export default ReusableLayer;
