import React from 'react'
import { settings } from '@/app/canvasEditor/Signals'
import { Color } from '@/public/types/OtherTypes'

interface ColorRectangleProps {
    color: Color;
    // onClick: () => void;
    colorList: Array<Color>
  }
  const ColorRectangle: React.FC<ColorRectangleProps> = ({ color,colorList  }) => {
    const handleColorClick = () => {
      // changeSettings('color', color);
      settings.value.color = color
    };
  
    const handleRightClick = (e: React.MouseEvent) => {
      e.preventDefault();
      // Remove color from popularColors
      settings.value.popularColors = colorList.filter((c) => c !== color);
      // setPopularColors((prevColors) => prevColors.filter((c) => c !== color));
    };
    return (
        <input
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: color,
            cursor: 'pointer',
            userSelect: 'none',  
          }}
          readOnly={true}  
          onClick={handleColorClick}
          onContextMenu={handleRightClick}
        />
      );
    };
    
type FavoriteColorProps = {
    handleColorClick: (color: Color) => void;
    colorList: Array<Color>
    newColor: Color
}
const FavoriteColorLister: React.FC<FavoriteColorProps> = ({ handleColorClick, colorList,newColor }) => {
    return (
      <div style={{ display: 'flex', gap: '5px' }}>
          {  !colorList.includes(newColor) &&
        <button className="border-black-1 bg-black text-white"onClick={()=> {colorList.push(newColor)}}>Save Color to Favorites</button>}  

        {colorList.map((color, index) => (
          <ColorRectangle key={index} color={color} colorList={colorList} onClick={() => handleColorClick(color)} />
        ))}
      </div>
    );
  };
  
export default FavoriteColorLister

 