import BackgroundImageSetter from '@/app/components/settings/BackgroundImageSetter'
import {useRef, useContext} from 'react'
import { BackgroundContext } from '../CanvasContext';

const BackgroundLayerSettings = () => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const {backgroundImage, setBackgroundImage} = useContext(BackgroundContext)
  return (
    <div>
        <BackgroundImageSetter setBackgroundImage={setBackgroundImage} backgroundImage={backgroundImage} />
    </div>
  )
}

export default BackgroundLayerSettings