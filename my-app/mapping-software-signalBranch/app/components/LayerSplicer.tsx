import React, { useRef, useEffect } from 'react';

interface ImageLayer {
  type: 'image';
  src: string;
  zIndex?: number;
}

interface CanvasLayer {
  type: 'canvas';
  canvasRef: React.RefObject<HTMLCanvasElement>;
  zIndex?: number;
}

type Layer = ImageLayer | CanvasLayer;

interface LayerSplicerProps {
  layers: Layer[];
}

const LayerSplicer: React.FC<LayerSplicerProps> = ({ layers }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
      
        if (!canvas || !ctx) return;
      
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        // Keep track of the loaded image count
        let loadedImageCount = 0;
      
        const checkIfAllImagesLoaded = () => {
          loadedImageCount++;
          if (loadedImageCount === layers.filter(layer => layer.type === 'image').length) {
            // All images are loaded, now draw the layers
            layers.forEach((layer) => {
              if (layer.type === 'image') {
                const img = new Image();
                img.onload = () => {
                  // ... (your existing drawing logic)
                  ctx.drawImage(img, 0, 0, 500, 700);
                };
                img.src = layer.imageUrl;
              } else if (layer.type === 'canvas') {
                const canvasLayer = layer.canvasRef.current;
                if (canvasLayer) {
                  ctx.drawImage(canvasLayer, 0, 0);
                }
              }
            });
          }
        };
      
        // Draw each layer onto the canvas
        layers.forEach((layer) => {
          if (layer.type === 'image') {
            const img = new Image();
            img.onload = () => {
              checkIfAllImagesLoaded();
            };
            img.src = layer.imageUrl;
          } else if (layer.type === 'canvas') {
            const canvasLayer = layer.canvasRef.current;
            if (canvasLayer) {
              ctx.drawImage(canvasLayer, 0, 0);
            }
          }
          // You can add more types of layers (e.g., text, shapes) as needed
        });
      }, [layers]);
    return <canvas className="mt-480" ref={canvasRef} width={800} height={600} style={{ marginTop: "500px" }} />;
  };
  
  export default LayerSplicer;