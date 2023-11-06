

export default function drawImageToBackground(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
  
    if (!offscreenCtx) {
      throw new Error('Canvas 2D context not supported');
    }
  
    offscreenCanvas.width = ctx.canvas.width;
    offscreenCanvas.height = ctx.canvas.height;
  
    offscreenCtx.drawImage(image, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
    offscreenCtx.drawImage(ctx.canvas, 0, 0);
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);
  }