 
import React, { useState, useContext, useEffect } from 'react';
import { BackgroundContext } from '../page';
 
const BackgroundImageLayer: React.FC<{ onImageLoad: (imageUrl: string) => void }> = ({ onImageLoad }) => {
  const [image, setImage] = useState<File | null>(null);
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
      setImage(backgroundImage);
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
    <div className='absolute' style={{ position: 'absolute', top: '0px', zIndex: 0, pointerEvents: 'none' }}>
      {(image && backgroundCanvasRef) && (
        <div>
          <canvas
            ref={backgroundCanvasRef}
            width={800}
            height={600}
            style={{ pointerEvents: 'none', objectFit: 'contain', border: '0px', padding: '0', margin: '0' }}
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundImageLayer;