import React, { useEffect, useRef } from 'react';
import { LineEdge, Vector2 } from '@/public/types/GeometryTypes';
import { getCtxFromRef } from '../utility/otherUtils';

export type EraseArgs = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  start: Vector2;
  end: Vector2;
  radius: number;
  eraseShape: LineEdge
}

const eraseLine = ({ canvasRef, start, end, radius, eraseShape }: EraseArgs) => {
// const canvas = canvasRef.current; 
// if (!canvas) return;

  const {ctx,canvas} =  getCtxFromRef(canvasRef)
  if (!ctx||!canvas) return;

  // Get the current global composite operation
  const originalCompositeOperation = ctx.globalCompositeOperation;

  // Set the global composite operation to 'destination-out' for erasing
  ctx.globalCompositeOperation = 'destination-out';

  // Get the image data from the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Calculate the distance and angle between start and end points
  const distance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  // Loop through the pixels along the line with specified radius
  for (let i = 0; i <= distance; i++) {
    const x = Math.round(start.x + Math.cos(angle) * i);
    const y = Math.round(start.y + Math.sin(angle) * i);

    // Loop through the pixels in the specified radius
    for (let j = -radius; j <= radius; j++) {
      for (let k = -radius; k <= radius; k++) {
        const pixelX = x + j;
        const pixelY = y + k;

        // Check if the current pixel is within the canvas bounds
        if (pixelX >= 0 && pixelX < imageData.width && pixelY >= 0 && pixelY < imageData.height) {
          // Calculate the index of the current pixel in the image data array
          const index = (pixelY * imageData.width + pixelX) * 4;

          // Set the color of the current pixel based on the erase shape
          if (eraseShape === 'rounded') {
            // Check if the current pixel is within the circular region
            if (Math.sqrt(j ** 2 + k ** 2) <= radius) {
              // Set the color of the current pixel to a blank color (transparent black)
              data[index] = 0;      // Red channel
              data[index + 1] = 0;  // Green channel
              data[index + 2] = 0;  // Blue channel
              data[index + 3] = 0;  // Alpha channel (transparency)
            }
          } else if (eraseShape === 'squared') {
            // Set the color of the current pixel to a blank color (transparent black)
            data[index] = 0;      // Red channel
            data[index + 1] = 0;  // Green channel
            data[index + 2] = 0;  // Blue channel
            data[index + 3] = 0;  // Alpha channel (transparency)
          }
        }
      }
    }
  }

  // Put the modified image data back onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Restore the original composite operation
  ctx.globalCompositeOperation = originalCompositeOperation;
};

export default eraseLine;
 