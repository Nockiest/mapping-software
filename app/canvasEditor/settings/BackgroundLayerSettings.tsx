import BackgroundImageSetter from '@/app/components/settings/BackgroundImageSetter'
import {useRef, useContext} from 'react'
import { BackgroundContext } from '../CanvasContext';

const BackgroundLayerSettings = () => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const {backgroundImage, setBackgroundImage} = useContext(BackgroundContext)
    const handleImageRevert = () => {
    setBackgroundImage(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };
  return (
    <>
        <BackgroundImageSetter setBackgroundImage={setBackgroundImage} backgroundImage={backgroundImage} />
        {backgroundImage && <button onClick={handleImageRevert}>Revert Background Image</button>}
    </ >
  )
}

export default BackgroundLayerSettings