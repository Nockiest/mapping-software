import React, { useEffect, useRef } from 'react';

type EraseRadiusProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  position: { x: number; y: number };
  radius: number;
};

const EraseInRadius: React.FC<EraseRadiusProps> = ({ canvasRef, position, radius }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get the image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Calculate the pixel position based on the canvas size
    const pixelX = Math.floor((position.x / canvas.width) * imageData.width);
    const pixelY = Math.floor((position.y / canvas.height) * imageData.height);

    // Loop through the pixels in the specified radius
    for (let y = pixelY - radius; y <= pixelY + radius; y++) {
      for (let x = pixelX - radius; x <= pixelX + radius; x++) {
        // Check if the current pixel is within the canvas bounds
        if (x >= 0 && x < imageData.width && y >= 0 && y < imageData.height) {
          // Calculate the index of the current pixel in the image data array
          const index = (y * imageData.width + x) * 4;

          // Set the color of the current pixel to a blank color (transparent black)
          data[index] = 0;      // Red channel
          data[index + 1] = 0;  // Green channel
          data[index + 2] = 0;  // Blue channel
          data[index + 3] = 0;  // Alpha channel (transparency)
        }
      }
    }

    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  }, [canvasRef, position, radius]);

  return null; // This component doesn't render anything directly
};

export default EraseInRadius;