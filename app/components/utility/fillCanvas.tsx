export default function fillCanvas(canvasRef: React.RefObject<HTMLCanvasElement>, color: string): void {
  const canvas = canvasRef.current;

  if (!canvas) {
    console.error('Canvas not found in fillCanvas function.');
    return;
  }

  const context = canvas.getContext('2d');

  if (!context) {
    console.error('2D context not found for the canvas in fillCanvas function.');
    return;
  }

  // Set the fill color
  context.fillStyle = color;

  // Fill the entire canvas
  context.fillRect(0, 0, canvas.width, canvas.height);
}
