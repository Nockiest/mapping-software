import React, { useRef, useState } from 'react';

interface CanvasToImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CanvasToImage: React.FC<CanvasToImageProps> = ({ canvasRef }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const convertToImage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      setImageUrl(dataUrl);
    }
  };

  return (
    <div>
      <button onClick={convertToImage}>Convert to Image</button>
      {imageUrl && <img src={imageUrl} alt="Canvas" />}
    </div>
  );
};

export default CanvasToImage;