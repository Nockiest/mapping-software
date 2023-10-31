import { Color } from "@/public/types/OtherTypes";
interface Point {
    x: number;
    y: number;
  }
  
  type CanvasRenderingContext = CanvasRenderingContext2D | null;
  
  
  export default function drawCircledLine(
    ctx: CanvasRenderingContext2D,
    lineStart: Point,
    lineEnd: Point,
    color: Color,
    radius: number
  ): void {
    if (!ctx) {
      throw new Error('Canvas 2D context not supported');
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
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  // ... (remaining functions unchanged)
  
  function hexToRGBA(hex: string): [number, number, number, number] | null {
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!match) return null;
  
    const [, r, g, b] = match.map((component) => parseInt(component, 16));
    return [r, g, b, 255];
  }