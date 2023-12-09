import React, { useEffect, useRef, useState } from "react";
import ReusableLayer from "./ResuableLayer";
import { settings, timeline } from "@/app/canvasEditor/Signals";
import { useCanvas } from "@/app/canvasEditor/CanvasContext";

interface CanvasLayer {
  canvasRef: React.RefObject<HTMLCanvasElement | null | undefined>;
  zIndex?: number;
}

interface LayerSplicerProps {
  layers: Array<CanvasLayer>;
}


interface CanvasLayer {
  canvasRef: React.RefObject<HTMLCanvasElement | null | undefined>;
  zIndex?: number;
}

interface LayerSplicerProps {
  layers: Array<CanvasLayer>;
}

const LayerSplicer: React.FC<LayerSplicerProps> = ({ layers }) => {
  const {
    canvasRef,
    frontlineCanvasRef,
    markerCanvasRef,
    backgroundCanvasRef,
    compiledCanvasRef,
  } = useCanvas();
  const canvasArr = [
    canvasRef,
    frontlineCanvasRef,
    markerCanvasRef,
    backgroundCanvasRef,
  ];

  const [isCanvasCompiled, setIsCanvasCompiled] = useState(false);

  useEffect(() => {
    const canvas = compiledCanvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      console.error("Canvas or context is null");
      return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sort layers based on zIndex
    const sortedLayers = layers
      .slice()
      .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    // Draw each layer onto the canvas
    sortedLayers.forEach((layer, index) => {
      const canvasLayer = layer.canvasRef.current;

      if (canvasLayer) {
        ctx.drawImage(canvasLayer, 0, 0);
        console.log('compiling layers')
      } else {
        console.warn(`Layer ${index} is missing canvasRef`);
      }
    });

    setIsCanvasCompiled(true);
  }, [settings.value.activeLayer, settings.value.canvasSize]);

  const compileCanvas = () => {
    if (isCanvasCompiled) {
      const canvas = compiledCanvasRef.current;

      if (!canvas) {
        console.error("Compiled canvas is null");
        return;
      }

      const dataURL = canvas.toDataURL("image/png");

      // Assuming timeline.value is an array of image data URLs
      timeline.value = [...timeline.value, dataURL];

      alert("Compiling canvas as image");
    } else {
      alert("Canvas is not yet compiled");
    }
  };

  return (
    <div className="relative h-600 w-full flex justify-center">
      <ReusableLayer canvasRef={compiledCanvasRef} layerName="compiled" positioning={'absolute top-0'} />
     {settings.value.activeLayer==='compiled'&& <button
        onClick={compileCanvas}
        className="z-10 h-20 absolute bottom-0 right-0"
      >
        Save Image
      </button>}
    </div>
  );
};

export default LayerSplicer;
