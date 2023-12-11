import React, { useState, useContext, useEffect } from "react";
import { useCanvas } from "../CanvasContext";
import { settings } from "../Signals";
import { backgroundImage } from "../Signals";
import ReusableLayer from "@/app/components/global/ResuableLayer";
import fillCanvas from "@/app/components/utility/fillCanvas";
const BackgroundImageLayer: React.FC = () => {
  const { backgroundCanvasRef } = useCanvas();
  const isActive = settings.value.activeLayer === 'background'
  useEffect(() => {

    handleFileChange();
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

  const handleFileChange = async () => {
    if (!backgroundImage.value) {
      clearCanvas();
      return;
    }

    if (backgroundImage.value instanceof File) {
      const imageURL = await loadImage(backgroundImage.value);
      drawImageOnCanvas(imageURL);
    } else {
      console.error("Invalid file type");
    }
  };

  const drawImageOnCanvas = (imageURL: string) => {
    const canvas = backgroundCanvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = imageURL;
    }
  };

  const clearCanvas = () => {
    const canvas = backgroundCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <  >
      {backgroundCanvasRef && (
        <ReusableLayer
          canvasRef={backgroundCanvasRef}
          layerName="background"
          positioning={"absolute top-0"}
        />
      )}
    </>
  );
};

export default BackgroundImageLayer;
