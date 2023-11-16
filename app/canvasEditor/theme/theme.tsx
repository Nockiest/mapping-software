import { createTheme } from '@mui/material/styles';
 
export const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Speed and efficiency green
      darker: "#388E3C",
    },
    secondary: {
      main: "#FFC107", // Amber for highlights and warnings
    },
    info: {
      main: "#2196F3", // Blue for a professional touch
    },
    background: {
      default: "#FFFFFF", // White background for clarity
    },
    text: {
      primary: "#ffffff", // White text color
    },
  },
  spacing: 5,
  typography: {
    h1: {
      fontWeight: 'bold',
      fontSize: '1.7rem', // You can adjust the font size as needed
      fontFamily: 'Open Sans, sans-serif', // Replace 'Your Custom Font' with the actual font name
      color: '#FFFFFF', // White color for h1
      textAlign: 'center'
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          minWidth: '200px', // Set the minimum width to 300px
        },
        thumb: {
          color: "#FFFFFF", // White color for the thumb
        },
        track: {
          color: "#FFFFFF", // White color for the track
        },
        rail: {
          color: "#FFFFFF", // White color for the rail
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        color: {
          appearance: 'none',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          //border: '1px solid #ccc',
          //boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          marginRight: '8px', // Adjust spacing as needed
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        margin: '16px', // Adjust the margin as needed
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: {
        color: 'black', // Set the color of the dropdown icon
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&$selected': {
          color: 'black', // Set the color of the selected (active) item text
        },
      },
    },
  },
 
});
