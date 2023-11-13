import { ThemeProvider, createTheme} from "@mui/material"

 

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Speed and efficiency green
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
      primary: "#212121", // Dark grey text for good contrast
    },
  },
  spacing: 5,
});
