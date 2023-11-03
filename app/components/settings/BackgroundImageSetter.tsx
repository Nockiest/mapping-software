import React from 'react'

// Define the prop types for BackgroundImageSetter
type BackgroundImageSetterProps = {
    setBackgroundImage: (file: File) => void;
    imageInputRef: React.RefObject<HTMLInputElement>;
  };
  
  const BackgroundImageSetter: React.FC<BackgroundImageSetterProps> = ({ setBackgroundImage, imageInputRef }) => {
    return (
      <> 
        <br />
        <input
          type="file"
          ref={imageInputRef}
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setBackgroundImage(selectedFile);
            }
          }}
        />
        <br />
      </>
    );
  };
  
  export default BackgroundImageSetter;