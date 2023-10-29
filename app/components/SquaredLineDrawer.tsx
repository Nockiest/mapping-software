
import { Vector2 } from "@/public/types/GeometryTypes";
 


export default function drawLineWithCenteredSquares(
    ctx: CanvasRenderingContext2D,
    lineStart: Vector2,
    lineEnd: Vector2,
    color: string,
    squareSize: number
  ): void {
    if (!ctx) {
      throw new Error('Canvas 2D context not supported');
    }
  
    const distance = Math.sqrt(
      Math.pow(lineEnd.x - lineStart.x, 2) + Math.pow(lineEnd.y - lineStart.y, 2)
    );
  
    const numberOfSquares = Math.floor(distance);
    const deltaX = (lineEnd.x - lineStart.x) / numberOfSquares;
    const deltaY = (lineEnd.y - lineStart.y) / numberOfSquares;
  
    ctx.fillStyle = color;
  
    for (let i = 0; i < numberOfSquares - 1; i++) {
      const x = lineStart.x + i * deltaX - squareSize / 2;
      const y = lineStart.y + i * deltaY - squareSize / 2;
  
      ctx.fillRect(x, y, squareSize, squareSize);
    }
  }
 