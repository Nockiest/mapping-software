import { settings } from "@/app/canvasEditor/Signals";
import { FrontLinePointData } from "@/app/canvasEditor/layers/FronlineLayer";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";
import { MutableRefObject, RefObject } from "react";
import { getCtxFromRef } from "./otherUtils";

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

  // Round the coordinates to ensure they are on whole number pixels
  const roundedX = Math.round(x);
  const roundedY = Math.round(y);

  // Draw based on lineType
  ctx.beginPath();
  // if (settings.value.lineType === 'rounded') {

  //   // ctx.arc(roundedX, roundedY, Math.round(radius / 2), 0, 2 * Math.PI);
  // } else if (settings.value.lineType === 'squared') {
    ctx.rect(Math.round(roundedX - radius / 2), Math.round(roundedY - radius / 2), radius, radius);
  // }
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
    pointsCentered: boolean = false
  ) => {
    if (points.length < 2) {
      console.warn("Cannot draw a line with less than 2 points.");
      return;
    }

    ctx.beginPath();
    const adjustedPoints = pointsCentered
      ? points.map((point) => point.position)
      : points.map((point) => movePosByOffset(point.position, point.radius));

    const startPos = adjustedPoints[0];
    ctx.moveTo(startPos.x, startPos.y);

    for (let i = 1; i < adjustedPoints.length; i++) {
      ctx.lineTo(adjustedPoints[i].x, adjustedPoints[i].y);
    }
    // console.log(endPointIndex)
    if (endPointIndex !== null) {
      // Draw a line from the last point to the endpoint
      if (adjustedPoints[endPointIndex]) {
        ctx.lineTo(
          adjustedPoints[endPointIndex].x,
          adjustedPoints[endPointIndex].y
        );
      }
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
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