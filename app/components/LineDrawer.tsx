interface Point {
    x: number;
    y: number;
  }
  
  type CanvasRenderingContext = CanvasRenderingContext2D | null;
  
  function drawLineOnCanvas(
    ctx: CanvasRenderingContext2D,
    lineStart: Point,
    lineEnd: Point,
    color: string,
    radius: number
  ): void {
    if (!ctx) {
      throw new Error('Canvas 2D context not supported');
    }
  
    const distance = Math.sqrt(
      Math.pow(lineEnd.x - lineStart.x, 2) + Math.pow(lineEnd.y - lineStart.y, 2)
    );
  
    const numberOfDots = Math.floor(distance);
    const deltaX = (lineEnd.x - lineStart.x) / numberOfDots;
    const deltaY = (lineEnd.y - lineStart.y) / numberOfDots;
  
    ctx.fillStyle = color;
  
    for (let i = 0; i < numberOfDots - 1; i++) {
      const x = lineStart.x + i * deltaX;
      const y = lineStart.y + i * deltaY;
  
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  export default drawLineOnCanvas;
 
//   // Example usage:
//   const canvas = document.getElementById('yourOriginalCanvasId') as HTMLCanvasElement;
//   const lineStart: Point = { x: 50, y: 50 }; // Adjust line start position as needed
//   const lineEnd: Point = { x: 150, y: 150 }; // Adjust line end position as needed
  
//   const newCanvas = drawLineOnCanvas(canvas, lineStart, lineEnd);
  
//   // Append the new canvas to the document body or any desired container
//   document.body.appendChild(newCanvas);