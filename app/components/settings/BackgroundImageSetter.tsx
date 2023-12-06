import React from 'react'
import { backgroundImage } from '@/app/canvasEditor/Signals';
 
  const BackgroundImageSetter: React.FC  = ( ) => {
    return (
      <> 
  
        <br />
        <input
          type="file"
          // ref={backgroundImage.value}
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