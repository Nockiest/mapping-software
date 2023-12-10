import Marker from "@/app/components/markerLayer/Marker";
import { useWindowResize } from "@/app/components/utility/hooks/UseWindowResize";
import { Box } from "@mui/material";

const PreviewMarker: React.FC = ( ) => {
  const { width: windowWidth, height: windowHeight } = useWindowResize();
  return (
      <Box
        marginLeft="20px" // Adjust the margin as needed
        width="50%" // Adjust the width as needed
        display="flex"
        flexDirection="column" // Stack elements vertically
        alignItems="flex-start" // Align items to the start of the cross axis
      >
        <Marker
          initialPosition={{ x: windowWidth * 0.9, y: 75 }}
          shouldUpdateOnSettingsChange={true}
          id={"x"}
          position={{x: windowWidth * 0.9,y:75}}
        />
      </Box>
    );
  }

export default PreviewMarker