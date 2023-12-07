import { backgroundImage, settings } from '@/app/canvasEditor/Signals';
import { LayerNames, Settings } from '@/public/types/OtherTypes';
import { CSSProperties } from '@mui/material/styles/createMixins';
import {ReactNode, useEffect, useState} from 'react';

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
  children,
  positioning
}) => {
  const [savedCanvasData, setSavedCanvasData] = useState<string | null>(null);
  const canvas = canvasRef.current;
  const isActive = layerName === 'none' ? true : layerName === settings.value.activeLayer;

  const handleMouseClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isActive) {
      return;
    }

    if (e.button === 0 && onLeftClick) {
      // Left click
      onLeftClick(e);

      // Save canvas data on click
      saveCanvasData();
    } else if (e.button === 1 && onMouseWheel) {
      // Middle mouse button or mouse wheel click
      onMouseWheel(e);
    } else if (e.button === 2 && onRightClick) {
      // Right click
      onRightClick(e);
    }
  };

  const saveCanvasData = () => {
    const canvas = canvasRef.current;
    console.log('saving data')

    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      setSavedCanvasData(dataURL);
    }
  };

  useEffect(() => {
    // Update canvas data when canvas size changes
    requestAnimationFrame(() => {

        saveCanvasData();


    });

    window.addEventListener('click', saveCanvasData);


    return () => {
      window.removeEventListener('click', saveCanvasData);

    }
  }, [backgroundImage.value ]);


  useEffect(() => {
    // Draw the saved canvas data onto the new canvas when canvas size changes
    const canvas = canvasRef.current;

    if (canvas && savedCanvasData) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = savedCanvasData;
      }
    }
  }, [settings.value.canvasSize]);
  return (
    <div id={layerName} className={` ${positioning} canvas-rectangle ${isActive ? 'z-30 ' : `${settings.value.canvasZindexes[layerName]} opacity-40 `}`}>
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

      {/* Render the saved canvas data */}
      {savedCanvasData && (
        <img
          src={savedCanvasData}
          width={settings.value.canvasSize.x}
          height={settings.value.canvasSize.y}
          alt={`Saved Canvas`}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

export default ReusableLayer;
