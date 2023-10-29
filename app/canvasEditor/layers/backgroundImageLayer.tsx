import React, { useState, useContext } from 'react';
import { BackgroundContext } from '../page';
 
 

const BackgroundImageLayer: React.FC<{ onImageLoad: (imageUrl: string) => void }> = ({ onImageLoad }) => {
  const [image, setImage] = useState<File | null>(null);

  const loadImage = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imageUrl = await loadImage(selectedFile);
      setImage(selectedFile);
      setCanvasBackground(imageUrl);
      onImageLoad(imageUrl); // Notify the parent component about the loaded image
    }
  };

  const setCanvasBackground = (imageUrl: string) => {
    const imgElement = document.getElementById('background-image') as HTMLImageElement;
    if (imgElement) {
      imgElement.src = imageUrl;
      imgElement.style.pointerEvents = 'none'; // Ignore mouse events on the image
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {image && (
        <div>
          <img
            id="background-image"
            className="canvas-rectangle"
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ pointerEvents: 'none', objectFit:"contain" , border:"0px", padding:"0" ,margin:"0" }}
          />
          {/* <button onClick={() => setCanvasBackground(URL.createObjectURL(image))}>Redraw Canvas</button> */}
        </div>
      )}
    </div>
  );
};
export default BackgroundImageLayer;