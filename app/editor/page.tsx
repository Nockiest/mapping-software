"use client"
 
import React, { useState, useRef } from 'react';
import Downloader from '../components/Downloader';
import getExtension from '../utils/ExtensionExtractor';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [fileExtension, setFileExtension] = useState<string|null>(null)
  const [addedColors, setAddedColors] = useState<{ x: number; y: number; color: string }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const loadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        drawCanvas(); // Draw the canvas initially with the image
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      loadImage(selectedFile);
      setFileExtension(getExtension(selectedFile))
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Get mouse coordinates
    
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    console.log("EDITING",x,y)
    // Add color at the clicked position
    setAddedColors((prevColors) => [...prevColors, { x, y, color: '#000000' }]);
    // Redraw the canvas with the added color
    drawCanvas();
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the image
      if (image) {
        const img = new Image();
        img.onload = () => {
          ctx?.drawImage(img, 0, 0);
          // Draw added colors
          addedColors.forEach((addedColor) => {
            ctx.fillStyle = addedColor.color;
            ctx?.fillRect(addedColor.x, addedColor.y, 1, 1);
          });
        };
        img.src = URL.createObjectURL(image);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {(image && fileExtension) && (
        <div>
          <canvas ref={canvasRef} width={400} height={300} onClick={handleEdit} style={{ border: '1px solid #000' }} />
          <button onClick={drawCanvas}>Redraw Canvas</button>
          <Downloader file={image}  fileExtension={fileExtension} />
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
