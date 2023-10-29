import React, { useContext, useEffect } from 'react';
// import { CanvasProvider } from '../CanvasContext';
import drawImageToBackground from '@/app/components/DrawBackgroundCanvasImg';

type BackgroundImageLayerProps = {
  image: HTMLImageElement;
};

const BackgroundImageLayer: React.FC<BackgroundImageLayerProps> = ({ image }) => {
  // const backgroundCanvasRef = useContext(CanvasProvider);

  // useEffect(() => {
  //   if (!image || !backgroundCanvasRef) {
  //     console.error('Image or canvas reference is undefined or null');
  //     return;
  //   }

  //   const canvas = backgroundCanvasRef.current;
  //   if (!canvas) {
  //     console.error('Canvas reference is undefined or null');
  //     return;
  //   }

  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) {
  //     console.error('Canvas 2D context is not supported');
  //     return;
  //   }

  //   drawImageToBackground(ctx, image);
  // }, [image, backgroundCanvasRef]);

  return <canvas className="canvas-rectangle">backgroundImageLayer</canvas>;
};

export default BackgroundImageLayer;