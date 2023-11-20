import { FollowMouseFunction } from "@/public/types/OtherTypes";
import { Vector2 } from "../../../public/types/GeometryTypes";
import { editorTopLeftPosition } from "@/app/canvasEditor/Signals";

function zoomIn(
  scale: number,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  scale *= 1.1; // Increase the scale factor (you can adjust this value)
  applyZoom(scale, canvas, ctx);
}

function zoomOut(
  scale: number,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  scale /= 1.1; // Decrease the scale factor (you can adjust this value)
  applyZoom(scale, canvas, ctx);
}

function applyZoom(
  scale: number,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Save the current state
  ctx.save();

  // Apply the scale transformation
  ctx.scale(scale, scale);

  // Redraw your content at the zoomed scale

  // Restore the previous state
  ctx.restore();
}

export const hexToRgb = (hex: string): string => {
  // Remove the hash if it exists
  const cleanedHex = hex.replace(/^#/, "");

  // Parse the cleaned hex value to separate RGB components
  const bigint = parseInt(cleanedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGB format
  return `rgb(${r}, ${g}, ${b})`;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  // Ensure the RGB components are within the valid range (0 to 255)
  const validR = Math.min(255, Math.max(0, r));
  const validG = Math.min(255, Math.max(0, g));
  const validB = Math.min(255, Math.max(0, b));

  // Convert the RGB components to hex and concatenate them
  const hexR = validR.toString(16).padStart(2, "0");
  const hexG = validG.toString(16).padStart(2, "0");
  const hexB = validB.toString(16).padStart(2, "0");

  // Return the hex color value
  return `#${hexR}${hexG}${hexB}`;
};

export const hexToRGBA = (hex: string): [number, number, number, number] => {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) throw new Error("trying to convert color with incorrect format");

  const [, r, g, b] = match.map((component) => parseInt(component, 16));
  return [r, g, b, 255];
};

export const followMouseComponent: FollowMouseFunction = (
  position,
  withscroll,
  maxPosition,
  topLeftOffset = editorTopLeftPosition.value
) => {
  // Calculate updated position without subtracting topLeftOffset.y and window.scrollY
  const updatedPosition: Vector2 = {
    x: Math.min(
      Math.max(
        position.x - topLeftOffset.x + (withscroll ? window.scrollX : 0),
        0
      ),
      maxPosition.x
    ),
    y: Math.min(
      Math.max(
        position.y - topLeftOffset.y + (withscroll ? window.scrollY : 0),
        0
      ),
      maxPosition.y
    ),
  };
  // console.log(e.clientY, topLeftOffset.y, window.scrollY, updatedPosition);
  console.log('args',   position,
  {x:window.scrollX, y: window.scrollY},
  maxPosition,
  topLeftOffset )
  console.log(updatedPosition, "updated position");
  return updatedPosition;
};

export function extractImageUrl(
  url: string | File | null | undefined,
  fallbackURL: string | File | null
): string | null {
  // should take a blob url find out wheter it can use it as url and then run the conditions
  return url
    ? url instanceof File
      ? URL.createObjectURL(url)
      : url
    : fallbackURL instanceof File
    ? URL.createObjectURL(fallbackURL)
    : null;
}
