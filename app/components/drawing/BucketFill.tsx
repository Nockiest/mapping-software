import { Color, RGBA } from "@/public/types/OtherTypes";
import { hexToRGBA } from "../utility/utils";

const COLOR_TOLERANCE = 0.01 ; // You can adjust this tolerance level

export default function bucketFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: Color): void {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  const hexFillColor = hexToRGBA(fillColor);
  const targetColor = getColorAtPixel(ctx, data, x, y);

  if (areColorsEqual(targetColor, hexFillColor)) {
    return; // No need to fill if target and fill colors are the same
  }

  const stack: [number, number][] = [[x, y]];
  while (stack.length > 0) {
    const [currentX, currentY] = stack.pop()!;
    const pixelIndex = (currentY * ctx.canvas.width + currentX) * 4;

    if (isInsideCanvas(currentX, currentY, ctx.canvas.width, ctx.canvas.height) && areColorsEqual(targetColor, getColorAtPixel(ctx, data, currentX, currentY))) {
      // Blend the fill color with the existing color at the pixel
      for (let i = 0; i < 3; i++) {
        const newColor = (hexFillColor[i] * hexFillColor[3] + data[pixelIndex + i] * (255 - hexFillColor[3])) / 255;
        data[pixelIndex + i] = Math.round(newColor);
      }

      // Update the alpha value
      data[pixelIndex + 3] = 255;

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
  for (let i = 0; i < 4; i++) {
    if (Math.abs(color1[i] - color2[i]) > COLOR_TOLERANCE) {
      return false;
    }
  }
  return true;
}

function isInsideCanvas(x: number, y: number, canvasWidth: number, canvasHeight: number): boolean {
  return x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight;
}
