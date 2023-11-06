import ImageUploader from "@/app/components/Dropzone";

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

// const imageContainerStyles: React.CSSProperties = {
//   // marginTop: '20px',
//   // margin: "0 auto"
// };

const imageStyles: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '300px',
};

const Home: React.FC = () => {
  return (
    <div>
      <h1>Image Uploader</h1>
          <ImageUploader  dropzoneStyles={dropzoneStyles}    imageStyles={imageStyles} /> {/*/imageContainerStyles={imageContainerStyles}  */}
    </div>
  );
};

export default Home;