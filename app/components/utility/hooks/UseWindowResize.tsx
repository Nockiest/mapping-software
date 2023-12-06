import {useState, useEffect} from 'react'

export const useWindowResize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  
    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  
      window.addEventListener('resize', handleResize);
  
      // Call the handleResize function once initially to set the initial window size
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return windowSize;
  };