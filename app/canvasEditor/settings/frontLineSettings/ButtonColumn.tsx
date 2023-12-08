import React from 'react';
import { Button } from '@mui/material';
import { theme } from '../../theme/theme';
import SettingsColumn from '../settingsComponents/SettingsColumn';

type ButtonColumnProps = {
  onNewFrontLine: () => void;
  onDeleteCurrentFrontLine: () => void;
  activeFrontline: boolean;
};

const ButtonColumn: React.FC<ButtonColumnProps> = ({
  onNewFrontLine,
  onDeleteCurrentFrontLine,
  activeFrontline,
}) => {
  return (
    <SettingsColumn >
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br />
      <Button
        onClick={onNewFrontLine}
        sx={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.light,
        }}
      >
        New FrontLine
      </Button>


      {activeFrontline && (
        <Button
          onClick={onDeleteCurrentFrontLine}
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.light,
          }}
        >
          Delete Current FrontLine
        </Button>
      )}
      </div>

    </SettingsColumn>
  );
};

export default ButtonColumn;
