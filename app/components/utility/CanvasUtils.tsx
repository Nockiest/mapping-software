import { settings } from "@/app/canvasEditor/Signals";
import { FrontLinePointData } from "@/app/canvasEditor/layers/FronlineLayer";
import { Vector2 } from "@/public/types/GeometryTypes";
import {
  Color,
  DrawQuadraticBezierWithShapeParams,
  LayerNames,
} from "@/public/types/OtherTypes";
import { MutableRefObject, RefObject } from "react";
import { getCtxFromRef } from "./otherUtils";
import drawLineWithShape, {
  DrawLineWithShapeParams,
} from "../drawing/LineDrawer"; // Adjust the import path
import { drawQuadraticCurve } from "../drawing/CurvedLineDrawer";
import { hexToRGBA } from "./utils";

export const drawDot = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void => {
  if (!ctx) {
    console.trace();
    throw new Error("ctx not defined");
  }

  // Round the coordinates to ensure they are on whole number pixels
  const roundedX = Math.round(x);
  const roundedY = Math.round(y);

  // Draw based on lineType
  ctx.beginPath();
  if (settings.value.lineType === "rounded") {
    ctx.arc(roundedX, roundedY, Math.round(radius / 2), 0, 2 * Math.PI);
  } else if (settings.value.lineType === "squared") {
    ctx.rect(
      Math.round(roundedX - radius / 2),
      Math.round(roundedY - radius / 2),
      radius,
      radius
    );
  }
  ctx.fillStyle = color;
  ctx.fill();
};

export function calculateRelativePosition(
  position: Vector2,
  divTopLeft: Vector2
) {
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

  const adjustedPoints = points.map((point, index) => {
    const adjustedPosition = pointsCentered
      ? point.centerPosition
      : movePosByOffset(point.centerPosition, point.radius);
    const adjustedPoint = {
      ...point,
      centerPosition: adjustedPosition,
    };
    return adjustedPoint;
  });

  for (let i = 1; i < adjustedPoints.length; i++) {
    const lineStart = adjustedPoints[i - 1].centerPosition;
    const lineEnd = adjustedPoints[i].centerPosition;
    //|| (i === adjustedPoints.length - 1 && endPointIndex !== null && adjustedPoints[endPointIndex].bezierType
    if (adjustedPoints[i].bezierType && adjustedPoints[i + 1]) {
      // Draw quadratic Bézier curve instead of a straight line
      drawQuadraticBezierCurveWithDashedControlLines({
        ctx,
        lineStart,
        controlPoints: [lineEnd],
        lineEnd: adjustedPoints[i + 1]?.centerPosition,
        color,
        size: width,
      });
      i++;
    } else {
      // Draw straight line with shape
      drawStraightLine({
        ctx,
        lineStart,
        lineEnd,
        color,
        size: width,
        lineShape: "squared",
      });
    }
  }
};
const drawQuadraticBezierCurveWithDashedControlLines = ({
  ctx,
  lineStart,
  controlPoints,
  lineEnd,
  color,
  size,
}: DrawQuadraticBezierWithShapeParams): void => {
  if (!ctx) {
    throw new Error("Canvas 2D context not supported");
  }
  const rgbColor = hexToRGBA(color);
  // Draw dashed line from lineStart to the control point and to the lineEnd
  drawStraightLine({
    ctx,
    lineStart,
    lineEnd: controlPoints[0],
    color,
    size,
    lineShape: "dashed",
  });
  drawStraightLine({
    ctx,
    lineStart:  controlPoints[0],
    lineEnd  ,
    color,
    size,
    lineShape: "dashed",
  });
  // Draw the quadratic Bezier curve
  drawQuadraticBezierCurve({
    ctx,
    lineStart,
    controlPoints,
    lineEnd,
    color,
    size,
  });
};

const drawQuadraticBezierCurve = ({
  ctx,
  lineStart,
  controlPoints,
  lineEnd,
  color,
  size,
  lineShape = "squared",
}: DrawQuadraticBezierWithShapeParams): void => {
  if (!ctx || controlPoints.length === 0) {
    throw new Error(
      `Canvas 2D context not supported or controlpoints not provided ${controlPoints.length}`
    );
  }

  ctx.beginPath();
  ctx.moveTo(lineStart.x, lineStart.y);
  ctx.quadraticCurveTo(
    controlPoints[0].x,
    controlPoints[0].y,
    lineEnd.x,
    lineEnd.y
  );
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
  ctx.closePath();
};
export const drawStraightLine = ({
  ctx,
  lineStart,
  lineEnd,
  color,
  size,
  lineShape = settings.value.lineType,
}: DrawLineWithShapeParams) => {
  if (!ctx) {
    throw new Error("Canvas 2D context not supported");
  }

  ctx.beginPath();

  if (lineShape === "dashed") {
    // Draw dashed line
    ctx.setLineDash([5, 5]); // Set dash pattern (adjust as needed)
  }
  // Draw solid line
  ctx.moveTo(lineStart.x, lineStart.y);
  ctx.lineTo(lineEnd.x, lineEnd.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.closePath();
};

export const movePosByOffset = (
  position: Vector2,
  offset: number | Vector2
): Vector2 => {
  if (typeof offset === "number") {
    // If offset is a number, apply it to both x and y values
    return { x: position.x + offset, y: position.y + offset };
  } else {
    // If offset is a Vector2, apply its x and y values separately
    return { x: position.x + offset.x, y: position.y + offset.y };
  }
};

type ClearCanvasFn = (
  canvasRef: RefObject<HTMLCanvasElement | null | undefined>
) => void;

export const clearCanvas: ClearCanvasFn = (canvasRef) => {
  const canvas = canvasRef.current;
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
};

export const getCanasData = (
  canvasRef: React.RefObject<HTMLCanvasElement | null | undefined>,
  layerName: LayerNames
) => {
  const { ctx, canvas } = getCtxFromRef(canvasRef);
  if (!canvas || !ctx || !canvasRef ) {
    return;
  }


  const data = ctx.getImageData(0,0,settings.value.canvasSize.x, settings.value.canvasSize.y)
  return data

};
