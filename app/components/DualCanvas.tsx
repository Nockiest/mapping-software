import React, { useState, useRef, useEffect } from 'react';

 
const DualCanvas: React.FC = () => {
  const canvasSize = 300; // Shared variable for canvas size
  const [activeCanvas, setActiveCanvas] = useState<'canvas1' | 'canvas2'>('canvas1');
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas1 = canvas1Ref.current;
    const canvas2 = canvas2Ref.current;

    if (!canvas1 || !canvas2) return;

    // Set initial styles and sizes
    canvas1.width = canvas2.width = canvasSize;
    canvas1.height = canvas2.height = canvasSize;
    canvas1.style.border = canvas2.style.border = '1px solid #000';
    canvas1.style.position = canvas2.style.position = 'absolute';
    canvas1.style.top = canvas2.style.top = '50';

    // Load background image to canvas2
    if (backgroundImage) {
      const ctx2 = canvas2.getContext('2d');
      if (ctx2) {
        const img = new Image();
        img.onload = () => {
          ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
        };
        img.src = URL.createObjectURL(backgroundImage);
      }
    }

    // Add event listeners for drawing on the active canvas
    const handleMouseDown = (e: MouseEvent) => {
      if (activeCanvas === 'canvas1') {
        const x = e.offsetX;
        const y = e.offsetY;
        drawOnCanvas(canvas1, x, y);
      }
    };

    canvas1.addEventListener('mousedown', handleMouseDown);

    // Clean up event listeners on component unmount
    return () => {
      canvas1.removeEventListener('mousedown', handleMouseDown);
    };
  }, [activeCanvas, backgroundImage]);

  const drawOnCanvas = (canvas: HTMLCanvasElement, x: number, y: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  };

  const switchCanvas = () => {
    setActiveCanvas((prevActiveCanvas) =>
      prevActiveCanvas === 'canvas1' ? 'canvas2' : 'canvas1'
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setBackgroundImage(selectedFile);
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvas2Ref} style={{ zIndex: activeCanvas === 'canvas2' ? 1 : 0 }} />
        <canvas ref={canvas1Ref} style={{ zIndex: activeCanvas === 'canvas1' ? 1 : 0 }} />
      </div>
      <div className='absolute top-96' >
        <input type="file" onChange={handleFileChange}  />
        <button onClick={switchCanvas}>Switch Canvas</button>
      </div>
    </div>
  );
};

export default DualCanvas;
