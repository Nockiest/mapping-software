import React from "react";
import { backgroundImage, settings } from "@/app/canvasEditor/Signals";

const BackgroundImageSetter: React.FC = () => {
  const setCanvasSize = async (imageUrl: string) => {
    const img = new Image();
    console.log(imageUrl)
    img.src = imageUrl;
    img.onload = () => {
      // Set canvas size to match the dimensions of the loaded image
      const maxCanvasSize = settings.value.maxCanvasSize;
      let newWidth = img.width;
      let newHeight = img.height;

      if (newWidth > maxCanvasSize.x) {
        const scale = maxCanvasSize.x / newWidth;
        newWidth *= scale;
        newHeight *= scale;
      }

      if (newHeight > maxCanvasSize.y) {
        const scale = maxCanvasSize.y / newHeight;
        newWidth *= scale;
        newHeight *= scale;
      }

      // Set canvas size to match the scaled dimensions of the loaded image
      settings.value.canvasSize = { x: newWidth, y: newHeight };

    };
  };
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
    console.log(selectedFile)
    if (selectedFile) {
      const imageUrl = await loadImage(selectedFile);
      console.log(imageUrl)
      // Set canvas size based on the dimensions of the loaded image
      await setCanvasSize(imageUrl);
      console.log('setting image')
      // Update the backgroundImage value
      backgroundImage.value = selectedFile;
    }
  };

  return (
    <>
      <br />
      <input
        type="file"
        // ref={backgroundImage.value}
        onChange={(e) => {
          handleFileChange(e)

        }}
      />
      <br />
    </>
  );
};

export default BackgroundImageSetter;

// const BackgroundImageSetter: React.FC = () => {
//   const { backgroundCanvasRef } = useCanvas();

//   const loadImage = (file: File) => {
//     return new Promise<string>((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         resolve(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const setImageSize = (imageUrl: string) => {
//     const canvas = backgroundCanvasRef.current;
//     const ctx = canvas?.getContext("2d");

//     if (canvas && ctx) {
//       const img = new Image();
//       img.onload = () => {
//         // Set canvas size to match the dimensions of the loaded image
//         settings.
//         canvas.width = img.width;
//         canvas.height = img.height;
//       };
//       img.src = imageUrl;
//     }
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];

//     if (selectedFile) {
//       const imageUrl = await loadImage(selectedFile);

//       // Set canvas size based on the dimensions of the loaded image
//       await setImageSize(imageUrl);

//       // Update the backgroundImage value
//       backgroundImage.value = selectedFile;
//     }
//   };

//   return (
//     <>
//       <br />
//       <input
//         type="file"
//         onChange={handleFileChange}
//       />
//       <br />
//     </>
//   );
// };

// export default BackgroundImageSetter;
