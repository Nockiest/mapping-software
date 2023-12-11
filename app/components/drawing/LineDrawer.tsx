import { Color,  } from "@/public/types/OtherTypes";
import { Vector2, LineEdge } from "@/public/types/GeometryTypes";
import { hexToRGBA } from "@/app/components/utility/utils";
import { settings } from "@/app/canvasEditor/Signals";



export type DrawLineWithShapeParams = {
  ctx: CanvasRenderingContext2D;
  lineStart: Vector2;
  lineEnd: Vector2;
  color: Color;
  size: number;
  lineShape?: LineEdge |'dashed';
};

export type DrawPayload = {
  drawFunction: (params: DrawLineWithShapeParams) => void;
  drawArgs: DrawLineWithShapeParams;
};

const drawLineWithShape = ({
  ctx,
  lineStart,
  lineEnd,
  color,
  size,
  lineShape = settings.value.lineType,
}: DrawLineWithShapeParams): void => {
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  const distance = Math.sqrt(
    Math.pow(lineEnd.x - lineStart.x, 2) + Math.pow(lineEnd.y - lineStart.y, 2)
  );

  const numberOfShapes = Math.floor(distance * 5);
  const deltaX = (lineEnd.x - lineStart.x) / numberOfShapes;
  const deltaY = (lineEnd.y - lineStart.y) / numberOfShapes;

  const colorArray = typeof color === 'string' ? hexToRGBA(color) : color;
  ctx.fillStyle = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3] / 255})`;

  for (let i = 0; i < numberOfShapes - 1; i++) {
    const x = Math.round(lineStart.x + i * deltaX);
    const y = Math.round(lineStart.y + i * deltaY);

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

export default drawLineWithShape;
