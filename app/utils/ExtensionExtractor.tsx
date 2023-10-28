const getExtension = (file:File) => {
    if (file) {
      // Extract the file extension
      const extension = file.name.split('.').pop();
      return extension || null;
    }
    return null;
  };
  
  export default getExtension;