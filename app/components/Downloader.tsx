import React from 'react';

 
 
type DownloaderProps = {
  file: File | null;
  fileExtension: string;
};

const Downloader: React.FC<DownloaderProps> = ({ file, fileExtension }) => {
  const handleDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = `downloaded_file.${fileExtension}`;
      // Trigger the download directly to the user's computer
      a.click();
      // Clean up
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      {file ? (
        <button onClick={handleDownload}>Download File</button>
      ) : (
        <p>No file to download</p>
      )}
    </div>
  );
};

export default Downloader;
