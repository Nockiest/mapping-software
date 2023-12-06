import React, { useEffect, useRef } from 'react';
import { LineEdge, Vector2 } from '@/public/types/GeometryTypes';
import { getCtxFromRef } from '../utility/otherUtils';

export type EraseArgs = {
  canvasRef: React.RefObject<HTMLCanvasElement | null|undefined>;
  start: Vector2;
  end: Vector2;
  radius: number;
  eraseShape: LineEdge
}

const eraseLine = ({ canvasRef, start, end, radius, eraseShape }: EraseArgs) => {
  const { ctx, canvas } = getCtxFromRef(canvasRef);
  if (!ctx || !canvas) return;
  radius = Math.ceil(radius / 2) //- Math.ceil(radius / 2 / 10);

  // Get the current global composite operation
  const originalCompositeOperation = ctx.globalCompositeOperation;

  // Set the global composite operation to 'destination-out' for erasing
  ctx.globalCompositeOperation = 'destination-out';

  // Calculate the distance and angle between start and end points
  const distance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  // Calculate the starting and ending coordinates for the square region
  const startX = Math.round(start.x - radius);
  const startY = Math.round(start.y - radius);
  const endX = Math.round(end.x + radius);
  const endY = Math.round(end.y + radius);

  // Get the image data from the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Iterate over the square region
  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      // Check if the current pixel is within the canvas bounds
      if (x >= 0 && x < imageData.width && y >= 0 && y < imageData.height) {
        // Calculate the index of the current pixel in the image data array
        const index = (y * imageData.width + x) * 4;

        // Set the color of the current pixel based on the erase shape
        if (eraseShape === 'rounded') {
          // Check if the current pixel is within the circular region
          if (Math.sqrt((x - start.x) ** 2 + (y - start.y) ** 2) <= radius) {
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

  // Put the modified image data back onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Restore the original composite operation
  ctx.globalCompositeOperation = originalCompositeOperation;
};

export default eraseLine;
