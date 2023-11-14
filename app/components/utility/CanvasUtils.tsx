import { settings } from "@/app/canvasEditor/Signals";
import { PointData } from "@/app/canvasEditor/layers/FronlineLayer";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";

export const drawDot: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
  ) => void = (ctx, x, y, radius, color) => {
    if (!ctx){
      console.trace()
      throw new Error('ctx not defined')
      return
    }
    // console.trace(ctx, ctx.rect)
    // Draw based on lineType
    if (settings.value.lineType === "rounded") {
       
      ctx.arc(x, y, radius / 2, 0, 2 * Math.PI);
    } else if (settings.value.lineType === "squared") {
      ctx.rect(x - radius / 2, y - radius / 2, radius, radius);
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
    points: Array<PointData>,
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