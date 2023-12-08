import React from 'react'
import { settings } from '@/app/canvasEditor/Signals'
import { Color } from '@/public/types/OtherTypes'
import { Button } from '@mui/material';
import { theme } from '@/app/canvasEditor/theme/theme';

interface ColorRectangleProps {
    color: Color;
    onClickFc: (color:Color) => void;
    colorList: Array<Color>
  }
  const ColorRectangle: React.FC<ColorRectangleProps> = ({ color,onClickFc,colorList  }) => {
    const handleColorClick = () => {
      // changeSettings('color', color);
      settings.value.color = color
      onClickFc(color)
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
    handleColorClick: ( color:Color) => void;
    colorList: Array<Color>
    newColor: Color
}
const FavoriteColorLister: React.FC<FavoriteColorProps> = ({ handleColorClick, colorList,newColor }) => {
    return (
      <div style={{ display: 'flex', gap: '5px' }}>
          {  !colorList.includes(newColor) &&
        <Button className="border-black-1 text-xs " sx={{color:theme.palette.text.primary, backgroundColor:theme.palette.info.main}} onClick={()=> {colorList.push(newColor)}}>Save Color to Favorites</Button>}

        {colorList.map((color, index) => (
          <ColorRectangle key={index} color={color} colorList={colorList} onClickFc= { handleColorClick  } />
        ))}
      </div>
    );
  };

export default FavoriteColorLister
