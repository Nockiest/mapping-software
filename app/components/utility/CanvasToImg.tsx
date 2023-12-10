import React, { useRef, useState } from 'react';

interface CanvasToImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CanvasToImage: React.FC<CanvasToImageProps> = ({ canvasRef }) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  const convertToImage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      setImageURL(dataURL);
    }
  };

  return (
    <div>
      <button onClick={convertToImage}>Convert to Image</button>
      {imageURL && <img src={imageURL} alt="Canvas" />}
    </div>
  );
};

export default CanvasToImage;