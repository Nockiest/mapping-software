 
import React, { useEffect, useRef } from 'react';
import ReusableLayer from './ResuableLayer';
import { settings } from '@/app/canvasEditor/Signals';
import { useCanvas } from '@/app/canvasEditor/CanvasContext';

interface CanvasLayer {
  canvasRef: React.RefObject<HTMLCanvasElement|null |undefined>;
  zIndex?: number ;
}

interface LayerSplicerProps {
  layers: Array<CanvasLayer>;
}

const LayerSplicer: React.FC<LayerSplicerProps> = ({ layers }) => {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
 const { canvasRef, frontlineCanvasRef, markerCanvasRef, backgroundCanvasRef, compiledCanvasRef} = useCanvas()
 const canvasArr = [canvasRef, frontlineCanvasRef, markerCanvasRef, backgroundCanvasRef]
  
 useEffect(() => {
  const canvas = compiledCanvasRef.current;
  const ctx = canvas?.getContext('2d');

  if (!canvas || !ctx) {
    console.error("Canvas or context is null");
    return;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sort layers based on zIndex
 // Sort layers based on zIndex
const sortedLayers = layers.slice().sort((a, b) =>  (a.zIndex || 0)  - (b.zIndex || 0)  );

// Draw each layer onto the canvas
sortedLayers.forEach((layer, index) => {
  const canvasLayer = layer.canvasRef.current;

  if (canvasLayer) {
    console.log(`Drawing layer ${index} (${canvasLayer.dataset.name}) with zIndex: ${layer.zIndex || 0}`);
    ctx.drawImage(canvasLayer, 0, 0);
  } else {
    console.warn(`Layer ${index} is missing canvasRef`);
  }
});

}, [settings.value.activeLayer]);

  

  return  <div className='relative h-600 flex justify-center'>
  <ReusableLayer canvasRef={compiledCanvasRef} layerName= 'compiled'  />
  </div> 
};

export default LayerSplicer;
