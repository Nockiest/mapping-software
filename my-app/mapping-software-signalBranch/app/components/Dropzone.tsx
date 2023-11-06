"use client";
import React, { useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import Downloader from "./Downloader";
import getExtension from "../utils/ExtensionExtractor";
// Define the types for the styles
interface ImageUploaderProps {
  dropzoneStyles: React.CSSProperties;
  imageStyles: React.CSSProperties;
}
 
const ImageUploader: React.FC<ImageUploaderProps> = ({ dropzoneStyles, imageStyles }) => {
  const [image, setImage] = useState<File | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
  
    if (file) {
      setImage(file);
  
      // Extract the file extension
      const extension = getExtension(file)// file.name.split('.').pop() ?? null;
      console.log("EXTENSION ", extension)
      setFileExtension(extension);
    }
  };
  
  const dropzoneOptions: DropzoneOptions = {
    // accept: 'image/*',
    onDrop,
  };
  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>

      {image && (
        <div style={imageStyles}>
          <img src={URL.createObjectURL(image)} alt="Uploaded" />
          {fileExtension && <Downloader file={image} fileExtension={fileExtension} />}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
