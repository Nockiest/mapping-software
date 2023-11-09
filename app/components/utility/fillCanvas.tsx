export default function fillCanvas(canvasRef, color) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    // Set the fill color
    context.fillStyle = color;
  
    // Fill the entire canvas
    context.fillRect(0, 0, canvas.width, canvas.height);
  }