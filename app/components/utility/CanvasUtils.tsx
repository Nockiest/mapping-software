import { settings } from "@/app/canvasEditor/Signals";
import { Vector2 } from "@/public/types/GeometryTypes";
import { Color } from "@/public/types/OtherTypes";

export const drawDot: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
  ) => void = (ctx, x, y, radius, color) => {
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
  points: Array<Vector2>,
  endPointIndex: number|null,
  ctx: CanvasRenderingContext2D,
  color: Color,
  width: number
)  => {
  
  if (points.length <  2) {
    console.warn("Cannot draw a line with less than 2 points.");
    return;
  }
  
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    if (endPointIndex !== null) {
      // Draw a line from the last point to the endpoint
      if (points[endPointIndex]) {
        ctx.lineTo(points[endPointIndex].x, points[endPointIndex].y);
      } 
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
   
}