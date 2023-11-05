import { Color } from "@/public/types/OtherTypes";

// function namedColorToRGBA(color: string): Color {
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
// function namedColorToRGBA(color: string): Color {
//   const canvas = document.createElement("canvas");
//   canvas.width = 1;
//   canvas.height = 1;
//   const ctx = canvas.getContext("2d");
//   if (!ctx) {
//     throw new Error("Canvas 2D context not supported");
//   }
//   ctx.fillStyle = color;
//   ctx.fillRect(0, 0, 1, 1);
//   const [r, g, b, a] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
//   return [`rgba(${r}, ${g}, ${b}${a === 255 ? "" : `, ${a / 255}`})`] as Color;
// }


// export default function bucketFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: Color): void {
//   console.log("Starting bucket fill...", ctx, x, y, fillColor);

//   const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
//   const data = imageData.data;
//   const targetColor = getColorAtPixel(ctx, data, x, y);

//   if (areColorsEqual(targetColor, fillColor)) {
//     console.log("Target and fill colors are the same. No need to fill.");
//     return; // No need to fill if target and fill colors are the same
//   }

//   console.log("GOT HERE");

//   // Keep track of processed pixels
//   const processedPixels = new Set<string>();
//   const stack: [number, number][] = [[x, y]];

//   while (stack.length > 0) {
//     const [currentX, currentY] = stack.pop()!;
//     const pixelIndex = (currentY * ctx.canvas.width + currentX) * 4;
//     const pixelKey = `${currentX}-${currentY}`;

//     console.log(
//       !processedPixels.has(pixelKey),
//       isInsideCanvas(currentX, currentY, ctx.canvas.width, ctx.canvas.height),
//       areColorsEqual(targetColor, getColorAtPixel(ctx, data, currentX, currentY))
//     );

//     if (
//       !processedPixels.has(pixelKey) &&
//       isInsideCanvas(currentX, currentY, ctx.canvas.width, ctx.canvas.height) &&
//       areColorsEqual(targetColor, getColorAtPixel(ctx, data, currentX, currentY))
//     ) {
//       // Set the fill color with alpha blending
//       const fillColorArray = typeof fillColor === "string" ? namedColorToRGBA(fillColor) : fillColor;
//       for (let i = 0; i < 4; i++) {
//         data[pixelIndex + i] = (fillColorArray[i] * fillColorArray[3] + data[pixelIndex + i] * (255 - fillColorArray[3])) / 255;
//       }

//       // Add the pixel to the set of processed pixels
//       processedPixels.add(pixelKey);

//       // Add adjacent pixels to the stack only if they are inside the canvas bounds
//       if (isInsideCanvas(currentX + 1, currentY, ctx.canvas.width, ctx.canvas.height) && !processedPixels.has(`${currentX + 1}-${currentY}`)) {
//         stack.push([currentX + 1, currentY]);
//       }
//       if (isInsideCanvas(currentX - 1, currentY, ctx.canvas.width, ctx.canvas.height) && !processedPixels.has(`${currentX - 1}-${currentY}`)) {
//         stack.push([currentX - 1, currentY]);
//       }
//       if (isInsideCanvas(currentX, currentY + 1, ctx.canvas.width, ctx.canvas.height) && !processedPixels.has(`${currentX}-${currentY + 1}`)) {
//         stack.push([currentX, currentY + 1]);
//       }
//       if (isInsideCanvas(currentX, currentY - 1, ctx.canvas.width, ctx.canvas.height) && !processedPixels.has(`${currentX}-${currentY - 1}`)) {
//         stack.push([currentX, currentY - 1]);
//       }
//     }
//   }

//   ctx.putImageData(imageData, 0, 0);
//   console.log("Bucket fill completed.");
// }

// function hexToRGBA(hex: string): Color {
//   // Check if the input is a valid hex color
//   const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
//   const result = hexRegex.exec(hex);
//   if (!result) {
//     throw new Error(`Invalid hex color: ${hex}`);
//   }

//   // Extract the RGB values
//   const [, red, green, blue] = result.map((value) => parseInt(value, 16));

//   // Return the RGBA format
//   return `rgba(${red}, ${green}, ${blue}, 255)` as Color;
// }

// function getColorAtPixel(ctx: CanvasRenderingContext2D, data: Uint8ClampedArray, x: number, y: number): Color {
//   const pixelIndex = (y * ctx.canvas.width + x) * 4;
//   return `rgba(${data[pixelIndex]}, ${data[pixelIndex + 1]}, ${data[pixelIndex + 2]}, ${data[pixelIndex + 3] / 255})` as Color;
// }

// function areColorsEqual(color1: Color, color2: Color): boolean {
//   // Extract alpha values (consider undefined as fully opaque)
//   const alpha1 = color1[3] === undefined ? 255 : color1[3];
//   const alpha2 = color2[3] === undefined ? 255 : color2[3];

//   return (
//     color1[0] === color2[0] &&
//     color1[1] === color2[1] &&
//     color1[2] === color2[2] &&
//     alpha1 === alpha2
//   );
// }
// function isInsideCanvas(x: number, y: number, canvasWidth: number, canvasHeight: number): boolean {
//   return x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight;
// }
 
function namedColorToRGBA(color: string): Color {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
  return [r, g, b, a];
}

export default function bucketFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: Color): void {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  const targetColor = getColorAtPixel(ctx, data, x, y);

  if (areColorsEqual(targetColor, fillColor)) {
    return; // No need to fill if target and fill colors are the same
  }

  const stack: [number, number][] = [[x, y]];

  while (stack.length > 0) {
    const [currentX, currentY] = stack.pop()!;
    const pixelIndex = (currentY * ctx.canvas.width + currentX) * 4;

    if (isInsideCanvas(currentX, currentY, ctx.canvas.width, ctx.canvas.height) && areColorsEqual(targetColor, getColorAtPixel(ctx, data, currentX, currentY))) {
      // Set the fill color with alpha blending
      const fillColorArray = typeof fillColor === 'string' ? namedColorToRGBA(fillColor) : fillColor;
      for (let i = 0; i < 3; i++) {
        data[pixelIndex + i] = (fillColorArray[i] * fillColorArray[3] + data[pixelIndex + i] * (255 - fillColorArray[3])) / 255;
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

// ... (remaining functions unchanged)

// Convert a hex color to RGBA format
function hexToRGBA(hex: string): Color {
  // Check if the input is a valid hex color
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = hexRegex.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  // Extract the RGB values
  const [, red, green, blue] = result.map((value) => parseInt(value, 16));

  // Return the RGBA format
  return [red, green, blue, 255];
}

function getColorAtPixel(ctx: CanvasRenderingContext2D,data: Uint8ClampedArray, x: number, y: number,  ): Color {
  const pixelIndex = (y * ctx.canvas.width + x) * 4;
  return [data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]];
}

function areColorsEqual(color1: Color, color2: Color): boolean {
  return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
}

function isInsideCanvas(x: number, y: number, canvasWidth: number, canvasHeight: number): boolean {
  return x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight;
}