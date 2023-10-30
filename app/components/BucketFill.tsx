type Color = [number, number, number, number];

function bucketFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: Color): void {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  const targetColor = getColorAtPixel(data, x, y);

  if (areColorsEqual(targetColor, fillColor)) {
    return; // No need to fill if target and fill colors are the same
  }

  const stack: [number, number][] = [[x, y]];

  while (stack.length > 0) {
    const [currentX, currentY] = stack.pop()!;
    const pixelIndex = (currentY * ctx.canvas.width + currentX) * 4;

    if (isInsideCanvas(currentX, currentY, ctx.canvas.width, ctx.canvas.height) && areColorsEqual(targetColor, getColorAtPixel(data, currentX, currentY))) {
      data[pixelIndex] = fillColor[0];
      data[pixelIndex + 1] = fillColor[1];
      data[pixelIndex + 2] = fillColor[2];
      data[pixelIndex + 3] = fillColor[3];

      stack.push([currentX + 1, currentY]);
      stack.push([currentX - 1, currentY]);
      stack.push([currentX, currentY + 1]);
      stack.push([currentX, currentY - 1]);
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function getColorAtPixel(data: Uint8ClampedArray, x: number, y: number): Color {
  const pixelIndex = (y * ctx.canvas.width + x) * 4;
  return [data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]];
}

function areColorsEqual(color1: Color, color2: Color): boolean {
  return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
}

function isInsideCanvas(x: number, y: number, canvasWidth: number, canvasHeight: number): boolean {
  return x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight;
}
