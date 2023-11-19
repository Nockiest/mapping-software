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
    <SettingsColumn>
      <br />
      <Button
        onClick={onNewFrontLine}
        sx={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        New FrontLine
      </Button>
      
      <br />
      {activeFrontline && (
        <Button
          onClick={onDeleteCurrentFrontLine}
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          Delete Current FrontLine
        </Button>
      )}
    </SettingsColumn>
  );
};

export default ButtonColumn;
