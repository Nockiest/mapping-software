import React from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';

type LayerSelectionColumnProps = {
  activeLayerId: string | undefined;
  layers: Array<{ id: string; color: string }>;
  onLayerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LayerSelectionColumn: React.FC<LayerSelectionColumnProps> = ({
  activeLayerId,
  layers,
  onLayerChange,
}) => {
  return (
    <div>
      <InputLabel style={{ color: 'white' }}>Choose Active Layer:</InputLabel>
      <Select onChange={onLayerChange} value={activeLayerId}>
        {layers.map((layer, index) => (
          <MenuItem
            key={layer.id}
            value={layer.id}
            style={{
              backgroundColor: layer.color,
              opacity: 0.5,
              cursor: 'pointer',
            }}
          >
            {`Index: ${index}, Color: `}
            <span
              style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                marginLeft: '2em',
                backgroundColor: layer.color,
                border: '1px solid #000',
              }}
            />
            {`, Index: ${layers.indexOf(layer)}`}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default LayerSelectionColumn;
