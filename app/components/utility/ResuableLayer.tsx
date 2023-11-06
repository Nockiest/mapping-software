import React from 'react';

interface ReusableLayerProps {
  canvasRef:  React.RefObject<HTMLCanvasElement | undefined>;
  layerType: string  ;
  image?: string;
  name?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

const ReusableLayer: React.FC<ReusableLayerProps> = ({ canvasRef, layerType, image, name, onLeftClick, onRightClick }) => {
  const handleMouseClick = (e: React.MouseEvent) => {
    if (e.button === 0 && onLeftClick) {
      // Left click
      onLeftClick();
    } else if (e.button === 2 && onRightClick) {
      // Right click
      onRightClick();
    }
  };

  return (
    <div onClick={handleMouseClick}>
        <canvas />
      {name && <h2>{name}</h2>}
      {image && <img src={image} alt="Layer Image" />}
    </div>
  );
};

export default ReusableLayer;