import { Color } from "@/public/types/OtherTypes";
import { Vector2 } from "@/public/types/GeometryTypes";
import { hexToRGBA } from "@/public/utils";
  
  
  export default function drawCircledLine(
    ctx: CanvasRenderingContext2D,
    lineStart: Vector2,
    lineEnd: Vector2,
    color: Color,
    diameter: number
  ): void {
    if (!ctx) {
      throw new Error(`Canvas 2D context not supported: ${ctx}`);
    }
  
    const distance = Math.sqrt(
      Math.pow(lineEnd.x - lineStart.x, 2) + Math.pow(lineEnd.y - lineStart.y, 2)
    );
  
    const numberOfDots = Math.floor(distance * 5);
    const deltaX = (lineEnd.x - lineStart.x) / numberOfDots;
    const deltaY = (lineEnd.y - lineStart.y) / numberOfDots;
  
    const colorArray = typeof color === 'string' ? hexToRGBA(color) : color;
    ctx.fillStyle = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3] / 255})`;
  
    for (let i = 0; i < numberOfDots - 1; i++) {
      const x = lineStart.x + i * deltaX;
      const y = lineStart.y + i * deltaY;
  
      ctx.beginPath();
      ctx.arc(x, y, diameter/2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  
 