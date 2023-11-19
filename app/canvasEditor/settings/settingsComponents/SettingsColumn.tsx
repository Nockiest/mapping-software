import React from 'react';
import { CssBaselineProps, Paper,useTheme} from '@mui/material';

// const useStyles = makeStyles((theme: Theme) => ({
//   paper: {
//     maxWidth: '300px',
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(2),
//     overflowY: 'auto',
//     maxHeight: '80vh',
//   },
// }));

 
type SettingsColumnProps = {
  children: React.ReactNode;
  sx?: React.CSSProperties; // Allow additional styles to be passed through props
  styles?: React.CSSProperties; // Fix the type here
};

const SettingsColumn: React.FC<SettingsColumnProps> = ({ children, sx, styles }) => {
  const theme = useTheme();

  return (
    <Paper sx={{
      maxWidth: styles?.maxWidth || '200px', // Adjusted the property name to camelCase
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(2),
      overflowY: 'auto',
      height: '250px',
      margin: '2px',
      ...sx, // Spread additional styles passed through props
    }}>
      {children}
    </Paper>
  );
};

export default SettingsColumn;
