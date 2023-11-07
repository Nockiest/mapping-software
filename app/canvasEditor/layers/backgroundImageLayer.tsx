 
import React, { useState, useContext, useEffect } from 'react';
import {   BackgroundContext } from '../CanvasContext';
import { settings } from '../Signals';
import { backgroundImage } from '../Signals';
import ReusableLayer from '@/app/components/utility/ResuableLayer';
const BackgroundImageLayer: React.FC<> = ( ) => {
  const { backgroundCanvasRef   } = useContext(BackgroundContext);
 
  useEffect(() => {
    handleFileChange( );
  }, [backgroundImage.value]);

  const loadImage = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async ( ) => {
    if (!backgroundImage.value) {
      clearCanvas();
      return;
    }

    if (backgroundImage.value instanceof File) {
      const imageUrl = await loadImage(backgroundImage.value);
      drawImageOnCanvas(imageUrl);
      // onImageLoad(imageUrl);
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
    <  >
      {(  backgroundCanvasRef) && (

          <ReusableLayer
          canvasRef={backgroundCanvasRef}
          layerName="background" 
          // style={{ pointerEvents: 'none', } }
          />
          // <canvas
          //   ref={backgroundCanvasRef}
          //   width={800}
          //   height={600}
          //   className={`absolute background-layer top-0 ${settings.value.activeLayer === "background" ? 'opacity-100' : 'opacity-40'}`}
          //   style={{ pointerEvents: 'none', objectFit: 'contain', border: '0px', padding: '0', margin: '0'  }}
          // />
      )}
    </>
  );
};

export default BackgroundImageLayer;