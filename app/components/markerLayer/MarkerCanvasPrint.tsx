import { settings } from "@/app/canvasEditor/Signals";
import { MarkerDefaultSettings } from "./Marker";
import { Vector2 } from "@/public/types/GeometryTypes";
import { MarkerArraySignal } from "@/public/types/OtherTypes";
import { extractImageUrl } from "../utility/utils";

/**
 * Draws markers on a canvas based on the provided marker data.
 * @param ctx - The CanvasRenderingContext2D for drawing on the canvas.
 * @param markers - The array of marker data to be drawn.
 * @param topLeftOffset - The offset of the top-left corner of the canvas.
 */
export const drawMarkersOnCanvas = (
    ctx: CanvasRenderingContext2D,
    markers: MarkerArraySignal,
    // topLeftOffset: Vector2
  ) => {
    // Clear the entire canvas before drawing new markers
    ctx.clearRect(0, 0, settings.value.canvasSize.x, settings.value.canvasSize.y);
  
    // Iterate through each marker in the array
    markers.value.forEach((marker, index) => {
      // Extract image URL from marker styling
      const imageUrl = extractImageUrl(marker?.customStyling?.imageURL, null);
  
      // Determine the width of the marker
      const usedWidth = marker.customStyling?.width || MarkerDefaultSettings.width;
  
      // Determine the text color of the marker
      const usedTextColor =
        marker.customStyling?.textColor || MarkerDefaultSettings.textColor;
  
      // Styling for the marker element
      const markerStyle: React.CSSProperties = {
        left: `${marker.position.x}px`,
        top: `${marker.position.y}px`,
        width: `${usedWidth}px`,
        color: `${marker.customStyling?.textColor || MarkerDefaultSettings.textColor} `,
        height: `${usedWidth}px`,
        fontSize: `${usedWidth}px`,
        backgroundColor: marker.customStyling?.color || MarkerDefaultSettings.color,
        zIndex: marker.isDragging ? 10 : 1,
      };
  
      // Styling for the background of text (if any)
      const textBackgroundStyle: React.CSSProperties = {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '5px',
        borderRadius: '5px',
        userSelect: 'none',
      };
  
      // Styling for the image element
      const imageStyle: React.CSSProperties = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
      };
  
     
  
      // If an image URL is provided, draw the image
      if (imageUrl) {
        const img = new Image();
    
        // Handle the image load event
        img.onload = () => {
            // Save the current canvas state
            ctx.save();
    
            // Create a circular clipping path
            ctx.beginPath();
            ctx.arc(
                marker.position.x,
                marker.position.y,
                usedWidth / 2,
                0,
                2 * Math.PI
            );
            ctx.clip(); // Clip the drawing to the circular path
    
            // Draw the clipped image
            ctx.drawImage(
                img,
                marker.position.x - usedWidth / 2,
                marker.position.y - usedWidth / 2,
                usedWidth,
                usedWidth
            );
    
            // Restore the canvas state to the saved state
            ctx.restore();
        };
    
        // Handle the image error event
        img.onerror = (error) => {
            console.error('Error loading image:', error);
        };
    
        // Set the image source
        img.src = imageUrl;
    } else {
        // Save the current canvas state
        ctx.save();
        
        // Draw a filled circle for the marker
        ctx.beginPath();
        ctx.arc(
            marker.position.x,
            marker.position.y,
            usedWidth / 2,
            0,
            2 * Math.PI
        );

        // Set the fill color to the marker color
        ctx.fillStyle =
            marker.customStyling?.color || MarkerDefaultSettings.color;
        ctx.fill();
        ctx.closePath();
      }
  
      // Draw top text (if any)
      if (marker.topText) {
        ctx.font = `${usedWidth / 4}px Arial`;
        ctx.fillStyle = usedTextColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          marker.topText,
          marker.position.x,
          marker.position.y - usedWidth / 4
        );
      }
  
      // Draw bottom text (if any) when the width is greater than 20
      if (marker.bottomText && usedWidth > 20) {
        ctx.font = `${usedWidth / 4}px Arial`;
        ctx.fillStyle = usedTextColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          marker.bottomText,
          marker.position.x,
          marker.position.y + usedWidth / 4
        );
      }
  
      // Restore the canvas state to the saved state
      ctx.restore();
    });
  };
  