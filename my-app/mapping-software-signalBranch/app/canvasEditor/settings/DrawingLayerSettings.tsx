import  {useRef,useContext} from 'react'
import { settings } from '../Signals';
import LineTypeSettings from '@/app/components/settings/LineTypeSettings';
import { Color, Settings } from '@/public/types/OtherTypes';
import { LineEdge } from '@/public/types/GeometryTypes';
import { CanvasContext, useCanvas } from '../CanvasContext';
import FavoriteColorLister from '@/app/components/settings/FavoriteColorLister';
 

 
const DrawingLayerSettings = ( ) => {
   const imageInputRef = useRef<HTMLInputElement>(null);
  const {dispatch,   }= useCanvas( )
  const changeSettings = <K extends keyof Settings['value']>(property: K, newValue: Settings['value'][K]) => {
    // Assuming settings is a mutable signal, otherwise, you might need to use `setSettings` if it's a state
    settings.value = { ...settings.value, [property]: newValue };
  };
  
 
  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value as Color;
    // const rgbColor = hexToRgb(hexColor);
    changeSettings('color', hexColor);
  };

  // Handle radius change
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value, 10);
    const sanitizedRadius = newRadius < 0 ? 0 : newRadius;
    
    changeSettings('radius', sanitizedRadius);
  };

  // Handle line type change
  const handleLineTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLineType = e.target.value as LineEdge// "rounded" | "squared";
    changeSettings('lineType', newLineType);
  };

  // Handle bucket fill
  const handleBucketFill = () => {
   if(dispatch){dispatch({ type: 'ENTER_BUCKET_MODE' })}
   
  };
  const handleSaveToFavorites = () => {
    const currentColor = settings.value.color;
    if (!settings.value.popularColors.includes(currentColor)) {
      // Save the color to favorites if it's not already in the list
      settings.value.popularColors.push(currentColor);
 
    }
  };
  const handleColorClick = (color: Color) => {
    // Set the settings color on click
    changeSettings('color', color);
  };
  return (
    <>
      <label>
        Color:
        <input type="color" value={settings.value.color} onChange={handleColorChange} />
       
        <FavoriteColorLister handleColorClick={handleColorClick} colorList={ settings.value.popularColors} newColor={settings.value.color} />
        {/* <div style={{ display: 'flex', gap: '5px' }}>
        {settings.value.popularColors.map((color, index) => (
          <ColorRectangle key={index} color={color} onClick={() => handleColorClick(color)} />
          ))}
        </div> */}
        
    
      </label>
          <br />
          <label>
            Radius: {settings.value.radius}
            <input
                type="range"
                value={settings.value.radius}
                onChange={handleRadiusChange}
                style={{ color: 'black' }}
                min="1"
                max="100"
            />
          </label>
          <br />
          {/* Dropdown for line type */}
          <LineTypeSettings lineType={settings.value.lineType} handleLineTypeChange={handleLineTypeChange} />
          <br />
 
          <br />
          {/* Add the bucket fill button */}
          <button   onClick={handleBucketFill}>
            {/* style={{ backgroundColor: state === DrawingState.BucketFill ? 'red' : 'initial' }} */}
            Bucket Fill
          </button>
        </>
  )
}

export default DrawingLayerSettings

  // const {backgroundImage, setBackgroundImage} = useContext(BackgroundContext)
          {/* <br />
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setBackgroundImage(selectedFile);
              }
            }}
          />
          <br /> */}
          {/* {backgroundImage && <button onClick={handleImageRevert}>Revert Background Image</button>} */}