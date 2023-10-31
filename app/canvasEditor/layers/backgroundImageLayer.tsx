 
import React, { useState, useContext, useEffect } from 'react';
import { BackgroundContext } from '../CanvasContext';
 
const BackgroundImageLayer: React.FC<{ onImageLoad: (imageUrl: string) => void }> = ({ onImageLoad }) => {
  const { backgroundCanvasRef, backgroundImage } = useContext(BackgroundContext);

  useEffect(() => {
    handleFileChange(backgroundImage);
  }, [backgroundImage]);

  const loadImage = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (backgroundImage: File | null) => {
    if (!backgroundImage) {
      clearCanvas();
      return;
    }

    if (backgroundImage instanceof File) {
      const imageUrl = await loadImage(backgroundImage);
      drawImageOnCanvas(imageUrl);
      onImageLoad(imageUrl);
    } else {
      console.error('Invalid file type');
    }
  };

  const drawImageOnCanvas = (imageUrl: string) => {
    const canvas = backgroundCanvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = imageUrl;
    }
  };

  const clearCanvas = () => {
    const canvas = backgroundCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <   >
      {(  backgroundCanvasRef) && (
          <canvas
            ref={backgroundCanvasRef}
            width={800}
            height={600}
            className='absolute background-layer top-0 opacity-40'
            style={{ pointerEvents: 'none', objectFit: 'contain', border: '0px', padding: '0', margin: '0'  }}
          />
      )}
    </>
  );
};

export default BackgroundImageLayer;