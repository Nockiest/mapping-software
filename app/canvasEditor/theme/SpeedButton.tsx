import React, { FC, ReactNode, MouseEvent } from 'react';
import { Button, useTheme } from '@mui/material';

interface SpeedButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  sx?: React.CSSProperties;
  children: ReactNode;
}

const SpeedButton: FC<SpeedButtonProps> = ({ onClick, sx, children }) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: theme.palette.primary.main, // Speed and efficiency green
        color: theme.palette.text.primary, // Dark grey text color from theme
        "&:hover": {
          backgroundColor: theme.palette.primary.dark, // Darker green on hover
        },
        margin: '8px', // Add margin here
        fontSize: '14px',
        padding: '0px 6px',
        ...sx, // Spread additional styles passed through props

      }}
      onClick={onClick} // Assign the onClick prop
    >
      {children}
    </Button>
  );
};

export default SpeedButton;
