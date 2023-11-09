import { settings } from "@/app/canvasEditor/Signals";

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