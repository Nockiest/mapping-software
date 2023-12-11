import { Vector2 } from "@/public/types/GeometryTypes";
import { hexToRGBA } from "../utility/utils";
import { DrawLineWithShapeParams } from "./LineDrawer";

const drawQuadraticCurve = ({
    ctx,
    lineStart,
    lineEnd,
    color,
    size,
    lineShape='squared'
  }: DrawLineWithShapeParams): void => {
    if (!ctx) {
      throw new Error('Canvas 2D context not supported');
    }

    const control = { x: (lineStart.x + lineEnd.x) / 2, y: Math.min(lineStart.y, lineEnd.y) - 50 };

    const colorArray = typeof color === 'string' ? hexToRGBA(color) : color;
    ctx.fillStyle = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3] / 255})`;

    ctx.beginPath();
    ctx.moveTo(lineStart.x, lineStart.y);
    ctx.quadraticCurveTo(control.x, control.y, lineEnd.x, lineEnd.y);

    const distance = Math.sqrt(Math.pow(lineEnd.x - lineStart.x, 2) + Math.pow(lineEnd.y - lineStart.y, 2));
    const numberOfShapes = Math.floor(distance * 0.1); // Adjust as needed

    for (let i = 0; i < numberOfShapes; i++) {
      const t = i / numberOfShapes;
      const x = Math.round(lineStart.x + t * (2 * (1 - t) * (control.x - lineStart.x) + t * (lineEnd.x - lineStart.x)));
      const y = Math.round(lineStart.y + t * (2 * (1 - t) * (control.y - lineStart.y) + t * (lineEnd.y - lineStart.y)));

      ctx.beginPath();
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }
  };

export type DrawQuadraticBezierWithShapeParams = DrawLineWithShapeParams & {
    controlPoint: Vector2
}

  export  const drawQuadraticBezierWithShape = ({
    ctx,
    lineStart,
    lineEnd,
    controlPoint,
    color,
    size,
    lineShape = 'squared', // Default to squared, change as needed
  }: DrawQuadraticBezierWithShapeParams): void => {
    if (!ctx) {
      throw new Error('Canvas 2D context not supported');
    }

    const numberOfShapes = 100; // Adjust as needed
    const quadraticCurve = (t:number) => {
      const x = Math.pow(1 - t, 2) * lineStart.x + 2 * (1 - t) * t * controlPoint.x + Math.pow(t, 2) * lineEnd.x;
      const y = Math.pow(1 - t, 2) * lineStart.y + 2 * (1 - t) * t * controlPoint.y + Math.pow(t, 2) * lineEnd.y;
      return { x, y };
    };

    const colorArray = typeof color === 'string' ? hexToRGBA(color) : color;
    ctx.fillStyle = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3] / 255})`;

    for (let i = 0; i < numberOfShapes; i++) {
      const t = i / (numberOfShapes - 1);
      const { x, y } = quadraticCurve(t);

      ctx.beginPath();

      if (lineShape === 'squared') {
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      } else if (lineShape === 'rounded') {
        ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        throw new Error('Invalid line shape specified');
      }
    }
  };


  export default drawQuadraticCurve;