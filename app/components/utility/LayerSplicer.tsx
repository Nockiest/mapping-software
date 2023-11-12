 
import React, { useEffect, useRef } from 'react';
import ReusableLayer from './ResuableLayer';

interface CanvasLayer {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  zIndex?: number;
}

interface LayerSplicerProps {
  layers: Array<CanvasLayer & { zIndex?: number }>;
}

const LayerSplicer: React.FC<LayerSplicerProps> = ({ layers }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sort layers based on zIndex
    const sortedLayers = layers.slice().sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    // Draw each layer onto the canvas
    sortedLayers.forEach((layer) => {
      const canvasLayer = layer.canvasRef.current;
      if (canvasLayer) {
        ctx.drawImage(canvasLayer, 0, 0);
      }
    });
  }, [layers]);

  return  <div className='relative h-600 flex justify-center'>
  <ReusableLayer canvasRef={canvasRef} layerName='end_result' />
  </div> 
};

export default LayerSplicer;
