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

  
export const hexToRgb = (hex: string): string => {
  // Remove the hash if it exists
  const cleanedHex = hex.replace(/^#/, '');

  // Parse the cleaned hex value to separate RGB components
  const bigint = parseInt(cleanedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGB format
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  // Ensure the RGB components are within the valid range (0 to 255)
  const validR = Math.min(255, Math.max(0, r));
  const validG = Math.min(255, Math.max(0, g));
  const validB = Math.min(255, Math.max(0, b));

  // Convert the RGB components to hex and concatenate them
  const hexR = validR.toString(16).padStart(2, '0');
  const hexG = validG.toString(16).padStart(2, '0');
  const hexB = validB.toString(16).padStart(2, '0');

  // Return the hex color value
  return `#${hexR}${hexG}${hexB}`;
};