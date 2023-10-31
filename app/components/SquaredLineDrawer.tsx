
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";

export const isColorArray = (value: any): value is [number, number, number, number] => {
  return Array.isArray(value) && value.length === 4 && value.every((v) => typeof v === 'number');
};

export const isValidColor = (value: string): boolean => {
  const div = document.createElement('div');
  div.style.color = value;
  return !!div.style.color;
};

export const parseColor = (value: string | [number, number, number, number]): Color | null => {
  if (isColorArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    if (isValidColor(value)) {
      return value;
    }

    // Add additional logic for parsing hex values if needed
  }

  return null;
};

export default function drawLineWithCenteredSquares(
  ctx: CanvasRenderingContext2D,
  lineStart: Vector2,
  lineEnd: Vector2,
  color: Color,
  squareSize: number
): void {
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  const distance = Math.sqrt(
    Math.pow(lineEnd.x - lineStart.x, 2) + Math.pow(lineEnd.y - lineStart.y, 2)
  );

  const numberOfSquares = Math.floor(distance * 5);
  const deltaX = (lineEnd.x - lineStart.x) / numberOfSquares;
  const deltaY = (lineEnd.y - lineStart.y) / numberOfSquares;

  ctx.fillStyle = typeof color === 'string' ? color : `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;

  for (let i = 0; i < numberOfSquares - 1; i++) {
    const x = lineStart.x + i * deltaX - squareSize / 2;
    const y = lineStart.y + i * deltaY - squareSize / 2;

    ctx.fillRect(x, y, squareSize, squareSize);
  }
}