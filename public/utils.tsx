function zoomIn(scale: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    scale *= 1.1; // Increase the scale factor (you can adjust this value)
    applyZoom(scale, canvas, ctx);
  }
  
  function zoomOut(scale: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    scale /= 1.1; // Decrease the scale factor (you can adjust this value)
    applyZoom(scale, canvas, ctx);
  }
  
  function applyZoom(scale: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Save the current state
    ctx.save();
  
    // Apply the scale transformation
    ctx.scale(scale, scale);
  
    // Redraw your content at the zoomed scale
  
    // Restore the previous state
    ctx.restore();
  }