 export default function createDotOnImage(
  file: File,
  positionX: number,
  positionY: number,
  dotSize: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const loadImage = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        drawDot(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const drawDot = (image: HTMLImageElement) => {
    canvas.width = image.width;
    canvas.height = image.height;
  
    // Draw the image
    ctx.drawImage(image, 0, 0);
  
    // Calculate normalized dot size based on canvas dimensions
    const normalizedDotSize = dotSize * (canvas.width / image.width);
  
    // Draw a dot at the specified position
    ctx.fillStyle = 'red'; // You can customize the color
    ctx.fillRect(positionX - normalizedDotSize / 2, positionY - normalizedDotSize / 2, normalizedDotSize, normalizedDotSize);
  };

  loadImage();

  return canvas;
}
  // Example usage:
//   const file = /* your image file */;
//   const position = { x: 50, y: 50 };
//   const dotSize = 10;
  
//   const canvasWithDot = createDotOnCanvas({file, position, dotSize});
  
//   // Append the canvas to the document body or any other container
//   document.body.appendChild(canvasWithDot);


// import { useEffect, useRef } from 'react';

// type DotMakerProps = {
//   file: File;
//   position: { x: number; y: number };
//   dotSize: number;
// };

// const DotMaker: React.FC<DotMakerProps> = ({ file, position, dotSize }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const loadImage = () => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.onload = () => {
//           drawDot(img);
//         };
//         img.src = e.target?.result as string;
//       };
//       reader.readAsDataURL(file);
//     };

//     loadImage();
//   }, [file]);

//   const drawDot = (image: HTMLImageElement) => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         canvas.width = image.width;
//         canvas.height = image.height;

//         // Draw the image
//         ctx.drawImage(image, 0, 0);

//         // Draw a dot at the specified position
//         ctx.fillStyle = 'red'; // You can customize the color
//         ctx.beginPath();
//         ctx.arc(position.x, position.y, dotSize, 0, 2 * Math.PI);
//         ctx.fill();
//       }
//     }
//   };

//   return <canvas ref={canvasRef} />;
// };

// export default DotMaker;