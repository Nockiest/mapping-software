// import { Color } from "@/public/types/OtherTypes";

 
 
// function namedColorToRGBA(color: string): Array<number> {
//   const canvas = document.createElement('canvas');
//   canvas.width = 1;
//   canvas.height = 1;
//   const ctx = canvas.getContext('2d');
//   if (!ctx) {
//     throw new Error('Canvas 2D context not supported');
//   }
//   ctx.fillStyle = color;
//   ctx.fillRect(0, 0, 1, 1);
//   const [r, g, b, a] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
//   return [r, g, b, a];
// }

// export default function bucketFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: Color): void {
//   const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
//   const data = imageData.data;
//   const targetColor = getColorAtPixel(ctx, data, x, y);

//   if (areColorsEqual(targetColor, fillColor)) {
//     return; // No need to fill if target and fill colors are the same
//   }

//   const stack: [number, number][] = [[x, y]];

//   while (stack.length > 0) {
//     const [currentX, currentY] = stack.pop()!;
//     const pixelIndex = (currentY * ctx.canvas.width + currentX) * 4;

//     if (isInsideCanvas(currentX, currentY, ctx.canvas.width, ctx.canvas.height) && areColorsEqual(targetColor, getColorAtPixel(ctx, data, currentX, currentY))) {
//       // Set the fill color with alpha blending
//       const fillColorArray = typeof fillColor === 'string' ? namedColorToRGBA(fillColor) : fillColor;
//       for (let i = 0; i < 3; i++) {
//         data[pixelIndex + i] = (fillColorArray[i] * fillColorArray[3] + data[pixelIndex + i] * (255 - fillColorArray[3])) / 255;
//       }
//       data[pixelIndex + 3] = 255; // Set alpha to fully opaque

//       stack.push([currentX + 1, currentY]);
//       stack.push([currentX - 1, currentY]);
//       stack.push([currentX, currentY + 1]);
//       stack.push([currentX, currentY - 1]);
//     }
     
//   }

//   ctx.putImageData(imageData, 0, 0);
// }

// // ... (remaining functions unchanged)

// // Convert a hex color to RGBA format
// function hexToRGBA(hex: string): Array<number> {
//   // Check if the input is a valid hex color
//   const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
//   const result = hexRegex.exec(hex);
//   if (!result) {
//     throw new Error(`Invalid hex color: ${hex}`);
//   }

//   // Extract the RGB values
//   const [, red, green, blue] = result.map((value) => parseInt(value, 16));

//   // Return the RGBA format
//   return [red, green, blue, 255];
// }

// function getColorAtPixel(ctx: CanvasRenderingContext2D, data: Uint8ClampedArray, x: number, y: number): string {
//   const pixelIndex = (y * ctx.canvas.width + x) * 4;
//   const r = data[pixelIndex];
//   const g = data[pixelIndex + 1];
//   const b = data[pixelIndex + 2];
//   const a = data[pixelIndex + 3];

//   // Convert RGBA values to hex color
//   const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

//   return hexColor;
// }

// function areColorsEqual(color1: any, color2: any): boolean {
//   return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
// }

// function isInsideCanvas(x: number, y: number, canvasWidth: number, canvasHeight: number): boolean {
//   return x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight;
// }

import { Color, RGBA } from "@/public/types/OtherTypes"; 
import { hexToRGBA } from "../utility/utils";

 
export default function bucketFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: Color): void {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  const hexFillColor= hexToRGBA(fillColor)
  const targetColor = getColorAtPixel(ctx, data, x, y);

  if (areColorsEqual(targetColor, hexFillColor)) {
    return; // No need to fill if target and fill colors are the same
  }
  const stack: [number, number][] = [[x, y]];
  while (stack.length > 0) {
    const [currentX, currentY] = stack.pop()!;
    const pixelIndex = (currentY * ctx.canvas.width + currentX) * 4;

    if (isInsideCanvas(currentX, currentY, ctx.canvas.width, ctx.canvas.height) && areColorsEqual(targetColor, getColorAtPixel(ctx, data, currentX, currentY))) {
      // Set the fill color with alpha blending
      for (let i = 0; i < 3; i++) {
        data[pixelIndex + i] = (hexFillColor[i] * hexFillColor[3] + data[pixelIndex + i] * (255 - hexFillColor[3])) / 255;
      }
      data[pixelIndex + 3] = 255; // Set alpha to fully opaque

      stack.push([currentX + 1, currentY]);
      stack.push([currentX - 1, currentY]);
      stack.push([currentX, currentY + 1]);
      stack.push([currentX, currentY - 1]);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function getColorAtPixel(ctx: CanvasRenderingContext2D, data: Uint8ClampedArray, x: number, y: number): RGBA {
  const pixelIndex = (y * ctx.canvas.width + x) * 4;
  return [data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]];
}

function areColorsEqual(color1: RGBA, color2: RGBA): boolean {
  return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
}

function isInsideCanvas(x: number, y: number, canvasWidth: number, canvasHeight: number): boolean {
  return x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight;
}