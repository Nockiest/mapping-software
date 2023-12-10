import { useCanvas } from "@/app/canvasEditor/CanvasContext";
import { backgroundImage, settings } from "@/app/canvasEditor/Signals";
import { LayerNames, Settings } from "@/public/types/OtherTypes";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { ReactNode, useEffect, useState } from "react";
import { getCtxFromRef } from "./otherUtils";


type ReusableLayerProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null | undefined>;
  layerName: LayerNames;
  onLeftClick?: (e: React.MouseEvent) => void;
  onRightClick?: (e: React.MouseEvent) => void;
  onMouseUp?: () => void;
  onMouseWheel?: (e: React.MouseEvent) => void;
  style?: {
    [key: string]: string; // Allow any CSS property
  };
  children?: ReactNode;
  positioning: string;
};

const ReusableLayer: React.FC<ReusableLayerProps> = ({
  onMouseWheel,
  canvasRef,
  layerName,
  onLeftClick,
  onRightClick,
  onMouseUp,
  style,
  children,
  positioning,
}) => {
  const [savedCanvasData, setSavedCanvasData] = useState<ImageData | null>(null);
  const canvas = canvasRef.current;
  const isActive =
    layerName === "none" ? true : layerName === settings.value.activeLayer;
  const backgroundCanvasRef = useCanvas()

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
    // const canvas = canvasRef.current;
    const {ctx, canvas} = getCtxFromRef(canvasRef)
    // console.log("saving data");

    if (canvas && ctx && layerName !== 'background') {
      // const dataURL = canvas.toDataURL("image/png");
      const data = ctx.getImageData(0,0,settings.value.canvasSize.x, settings.value.canvasSize.y)
      setSavedCanvasData(data);
    }
  };

  useEffect(() => {
    // Update canvas data when canvas size changes
    requestAnimationFrame(() => {
      saveCanvasData();
    });

    window.addEventListener("click", saveCanvasData);

    return () => {
      window.removeEventListener("click", saveCanvasData);
    };
  }, [backgroundImage.value]);

  useEffect(() => {
    // Draw the saved canvas data onto the new canvas when canvas size changes
    const {ctx, canvas} = getCtxFromRef(canvasRef)
    if (canvas && ctx&& savedCanvasData) {
      // const dataURL = canvas.toDataURL("image/png");

       ctx.putImageData(savedCanvasData, 0,0  )
    }

  }, [savedCanvasData, settings.value.canvasSize,  ]);

  return (
    <div
      id={layerName}
      className={` ${positioning} canvas-rectangle ${
        isActive
          ? "z-30 "
          : `${settings.value.canvasZindexes[layerName]} opacity-40 `
      }
      ${
        layerName === 'background'&& isActive? 'opacity-90':''
      }
      `}
    >
      <p className="fixed left-0 top-0 z-50 text-black">{( layerName === 'background'&& isActive).toString()}</p>
      {canvasRef && (
        <>
          <canvas
            onClick={handleMouseClick}
            onContextMenu={
              isActive
                ? handleMouseClick
                : (e) => {
                    e.preventDefault();
                  }
            }
            ref={canvasRef as React.RefObject<HTMLCanvasElement>}
            width={settings.value.canvasSize.x}
            height={settings.value.canvasSize.y}
            style={{
              pointerEvents: isActive ? "auto" : "none",
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


    // if (canvas && savedCanvasData) {
    //   const tempCanvas = document.createElement("canvas");
    //   const tempCtx = tempCanvas.getContext("2d");

    //   if (tempCtx) {
    //     const img = new Image();
    //     img.onload = () => {
    //       // Use the original size of the saved canvas data
    //       tempCanvas.width = img.width;
    //       tempCanvas.height = img.height;

    //       tempCtx.drawImage(img, 0, 0);

    //       const ctx = canvas.getContext("2d");
    //       if (ctx) {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         ctx.drawImage(tempCanvas, 0, 0);
    //       }
    //     };
    //     img.src = savedCanvasData;
    //   }
    // }