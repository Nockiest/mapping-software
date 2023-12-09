import Marker from "@/app/components/markerLayer/Marker";
import { Box } from "@mui/material";

const PreviewMarker: React.FC<{ windowWidth: number }> = ({ windowWidth }) => {
    return (
      <Box
        marginLeft="20px" // Adjust the margin as needed
        width="50%" // Adjust the width as needed
        display="flex"
        flexDirection="column" // Stack elements vertically
        alignItems="flex-start" // Align items to the start of the cross axis
      >
        <Marker
          // topLeftOffset={{ x: 500, y: 100 }}
          initialPosition={{ x: windowWidth * 0.9, y: 75 }}
          shouldUpdateOnSettingsChange={true}
          id={"x"}
          position={{x: windowWidth * 0.9,y:75}}
        />
      </Box>
    );
  }

export default PreviewMarker