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
  const handleMouseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // console.log("HANDLING CLICK", layerName, settings.value.activeLayer, layerName === settings.value.activeLayer);
    if (layerName !== settings.value.activeLayer) {
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

  // useEffect(() => {
  //   const handleMouseUp = (e:MouseEvent) => {
  //     // Handle mouse up event
  //     console.log("Mouse up event:", onMouseUp);
  //     if( !onMouseUp){return}

  //     onMouseUp()
  //   };
  //   if (!canvas ){return}

  //   canvas.addEventListener("mouseup", handleMouseUp);
  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     canvas.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [canvas]); // Make sure to include canvas as a dependency if it's used inside the effect
  
  
  

  return (
    <canvas
      className={`canvas-rectangle top-0 absolute ${layerName}`}
      onClick={handleMouseClick}
      onContextMenu={handleMouseClick}
      // onMouseUp={handleMouseUp}
      ref={canvasRef}
      width={settings.value.canvasSize.x}
      height={settings.value.canvasSize.y}
      style={{
        zIndex: layerName === settings.value.activeLayer ? '100' : '0',
        ...style,
      }}
    ></canvas>
  );
};

export default ReusableLayer;

 