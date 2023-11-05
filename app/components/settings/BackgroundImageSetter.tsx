import React from 'react'
import { backgroundImage } from '@/app/canvasEditor/Signals';
// Define the prop types for BackgroundImageSetter
// type BackgroundImageSetterProps = {
//     setBackgroundImage: (file: File) => void;
//     imageInputRef: React.RefObject<HTMLInputElement>;
//   };
// { setBackgroundImage, imageInputRef }
{/* <BackgroundImageSetterProps></BackgroundImageSetterProps> */}
  const BackgroundImageSetter: React.FC  = ( ) => {
    return (
      <> 
        <br />
        <input
          type="file"
          ref={backgroundImage.value}
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              backgroundImage.value = selectedFile
            }
          }}
        />
        <br />
      </>
    );
  };
  
  export default BackgroundImageSetter;