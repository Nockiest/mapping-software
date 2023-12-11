import { settings } from "@/app/canvasEditor/Signals";
import { FrontLinePointData } from "@/app/canvasEditor/layers/FronlineLayer";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";
import { MutableRefObject, RefObject } from "react";
import { getCtxFromRef } from "./otherUtils";
import drawLineWithShape, { DrawLineWithShapeParams } from "../drawing/LineDrawer";// Adjust the import path
import drawQuadraticCurve, { DrawQuadraticBezierWithShapeParams } from "../drawing/CurvedLineDrawer";

export const drawDot = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void => {
  if (!ctx) {
    console.trace();
    throw new Error('ctx not defined');
  }
  // console.log('drawing a dot')
  // Round the coordinates to ensure they are on whole number pixels
  const roundedX = Math.round(x);
  const roundedY = Math.round(y);

  // Draw based on lineType
  ctx.beginPath();
  if (settings.value.lineType === 'rounded') {

    ctx.arc(roundedX, roundedY, Math.round(radius / 2), 0, 2 * Math.PI);
  } else if (settings.value.lineType === 'squared') {
    ctx.rect(Math.round(roundedX - radius / 2), Math.round(roundedY - radius / 2), radius, radius);
  }
  ctx.fillStyle = color;
  ctx.fill();
};

export function calculateRelativePosition(position:Vector2, divTopLeft:Vector2) {
    const relativeX = position.x - divTopLeft.x;
    const relativeY = position.y - divTopLeft.y;
    return { x: relativeX, y: relativeY };
  }


  export const drawLineAlongPoints = (
    points: Array<FrontLinePointData>,
    endPointIndex: number | null,
    ctx: CanvasRenderingContext2D,
    color: Color,
    width: number,
    pointsCentered: boolean = false,
    // lineShape: 'squared' | 'rounded' = 'squared'
  ) => {
    if (points.length < 2) {
      console.warn("Cannot draw a line with less than 2 points.");
      return;
    }

    const adjustedPoints = pointsCentered
      ? points.map((point) => point.position)
      : points.map((point) => movePosByOffset(point.position, point.radius));

    for (let i = 1; i < adjustedPoints.length; i++) {
      const lineStart = adjustedPoints[i - 1];
      const lineEnd = adjustedPoints[i];
      const nextPoint =  adjustedPoints[i + 1] as Vector2
      // Check if the current point or the next point has bezierType set to true
      const isBezierType = lineEnd.bezierType || (i === adjustedPoints.length - 1 && endPointIndex !== null && points[endPointIndex].bezierType);

      if (isBezierType && nextPoint) {

        console.log(i)
        drawQuadraticBezierCurve({
          ctx,
          lineStart,
          controlPoint: lineEnd,
          lineEnd: nextPoint  ,
          color,
          size:width,
        });
        i+1
      } else {
        // Draw straight line with shape
        drawStraightLine({
          ctx,
          lineStart,
          lineEnd,
          color,
          size: width,
          lineShape: 'squared',
        });
      }
    }
  };


const drawQuadraticBezierCurve = ({
  ctx,
  lineStart,
  controlPoint,
  lineEnd,
  color,
  size,
  lineShape= 'squared'
}: DrawQuadraticBezierWithShapeParams): void => {
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  ctx.beginPath();
  ctx.moveTo(lineStart.x, lineStart.y);
  ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, lineEnd.x, lineEnd.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
  ctx.closePath();
};
export const drawStraightLine = ({ctx,
  lineStart,
  lineEnd,
  color,
  size,
  lineShape = settings.value.lineType,
}: DrawLineWithShapeParams) => {
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  ctx.beginPath();
  ctx.moveTo(lineStart.x, lineStart.y);
  ctx.lineTo(lineEnd.x, lineEnd.y);

  ctx.strokeStyle = color;
  ctx.lineWidth = size;

  ctx.stroke();
  ctx.closePath();
};



export const movePosByOffset = (position: Vector2, offset: number | Vector2): Vector2 => {
  if (typeof offset === 'number') {
    // If offset is a number, apply it to both x and y values
    return { x: position.x + offset, y: position.y + offset };
  } else {
    // If offset is a Vector2, apply its x and y values separately
    return { x: position.x + offset.x, y: position.y + offset.y };
  }
};


type ClearCanvasFn = (canvasRef: RefObject<HTMLCanvasElement | null |undefined>) => void;

export const clearCanvas: ClearCanvasFn = (canvasRef) => {
  const canvas = canvasRef.current;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
};


export const saveCanvas = (canvasRef:React.RefObject<HTMLCanvasElement|null|undefined >) => {
  const {ctx, canvas} = getCtxFromRef(canvasRef)
    if (!canvas||!ctx||!canvasRef) {
      return;
    }
}