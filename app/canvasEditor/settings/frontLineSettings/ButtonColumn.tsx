import React from 'react';
import { Button } from '@mui/material';
import { theme } from '../../theme/theme';
import SettingsColumn from '../settingsComponents/SettingsColumn';
import SpeedButton from '../../theme/SpeedButton';
import SettingsButton from '../../theme/SettingsButton';

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
      <SettingsButton
        onClick={onNewFrontLine}
        sx={{

        }}
      >
        New FrontLine
      </SettingsButton>


      {activeFrontline && (
        <SettingsButton
          onClick={onDeleteCurrentFrontLine}
          sx={{

          }}
        >
          Delete This FrontLine
        </SettingsButton>
      )}
      </div>

    </SettingsColumn>
  );
};

export default ButtonColumn;
