import BackgroundImageSetter from '@/app/components/settings/BackgroundImageSetter'
import {useRef, useContext} from 'react'
import { BackgroundContext } from '../CanvasContext';
import { backgroundImage } from '../Signals';
import { Button } from '@mui/material';
const BackgroundLayerSettings = () => {
  //   const imageInputRef = useRef<HTMLInputElement>(null);
  //   // const {backgroundImage, setBackgroundImage} = useContext(BackgroundContext)
    const handleImageRevert = () => {
    // setBackgroundImage(null);
    backgroundImage.value = null
    // if (imageInputRef.current) {
    //   imageInputRef.current.value = '';
    // }
  };
  return (
    <>
        <BackgroundImageSetter  />
        {/* setBackgroundImage={setBackgroundImage} backgroundImage={backgroundImage.value} */}
        {backgroundImage &&  
        <Button variant="contained" color="primary" onClick={handleImageRevert}>
        Revert Background Image
      </Button>}
    </ >
  )
}

export default BackgroundLayerSettings