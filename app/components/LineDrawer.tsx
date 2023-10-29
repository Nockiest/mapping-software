interface Point {
    x: number;
    y: number;
  }
  
  type CanvasRenderingContext = CanvasRenderingContext2D | null;

  function drawLineOnCanvas(
    ctx: CanvasRenderingContext,
    lineStart: Point,
    lineEnd: Point,
    color: string,
    radius: number
  ): void {
    if (!ctx) {
      throw new Error('Canvas 2D context not supported');
    }
  
    ctx.beginPath();
    ctx.moveTo(lineStart.x, lineStart.y);
    ctx.lineTo(lineEnd.x, lineEnd.y);
    ctx.lineWidth = radius; // Adjust line width as needed
    ctx.strokeStyle = color; // Set line color
    ctx.stroke();
    ctx.closePath();
  }
  
  export default drawLineOnCanvas;
 
//   // Example usage:
//   const canvas = document.getElementById('yourOriginalCanvasId') as HTMLCanvasElement;
//   const lineStart: Point = { x: 50, y: 50 }; // Adjust line start position as needed
//   const lineEnd: Point = { x: 150, y: 150 }; // Adjust line end position as needed
  
//   const newCanvas = drawLineOnCanvas(canvas, lineStart, lineEnd);
  
//   // Append the new canvas to the document body or any desired container
//   document.body.appendChild(newCanvas);