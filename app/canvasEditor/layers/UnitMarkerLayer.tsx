"use client";
import { useState, useEffect, useContext, useReducer } from "react";
import Marker from "@/app/components/markerLayer/Marker"; // Adjust the import path as needed
import { CanvasContext, useCanvas } from "../CanvasContext";
// import { Color } from '@/public/types/OtherTypes';
import { Vector2 } from "@/public/types/GeometryTypes";
import { settings } from "../Signals";
import { Color, MarkerSettings, MarkerType } from "@/public/types/OtherTypes";
// import LineComponent from '@/app/components/frontline/FrontLine2D';
import { markers } from "../Signals";
import { MousePositionContext } from "../page";
import { followMouseComponent } from "@/public/utils";
import ReusableLayer from "@/app/components/utility/ResuableLayer";
import { Signal } from "@preact/signals";
import { getCtxFromRef } from "@/app/components/utility/otherUtils";

 
enum MarkerLayerState {
  Idle,
  Dragging,
  EditingMarker,
  MakingLine,
}

type MarkerLayerAction =
  | { type: "DRAG"; markerIndex: number }
  | { type: "MAKING_LINE" | "IDLE" }
  | { type: "EDITING_MARKER" };

const markerLayerStateMachine: React.Reducer<
  MarkerLayerState,
  MarkerLayerAction
> = (state, action) => {
  console.log("SWITCHING TO ", action);
  switch (action.type) {
    case "DRAG":
      return MarkerLayerState.Dragging;
    case "IDLE":
      return MarkerLayerState.Idle;
    case "EDITING_MARKER":
      return state === MarkerLayerState.EditingMarker
        ? MarkerLayerState.Idle
        : MarkerLayerState.EditingMarker;
    case "MAKING_LINE":
      console.log("DISPATCHED");
      return state === MarkerLayerState.MakingLine
        ? MarkerLayerState.Idle
        : MarkerLayerState.MakingLine;
    default:
      console.error("INVALID ACTION: " + action);
      return state;
  }
};

const UnitMarkerLayer: React.FC = () => {
  // const [markers, setMarkers] = useState<MarkerType[]>([]);
  const { markerCanvasRef } = useCanvas(); /// useContext(CanvasContext);
  const [markerLayerState, dispatchState] = useReducer(
    markerLayerStateMachine,
    MarkerLayerState.Idle
  );
  const [topLeftOffset, setTopLeftOffset] = useState<Vector2>({ x: 0, y: 0 });
  const mousePosition = useContext(MousePositionContext);
  const isActive = settings.value.activeLayer === "marker";

  
  useEffect(() => {
    const handleResize = () => {
      if (!markerCanvasRef.current) return;
      const canvas = markerCanvasRef.current;
      const rect = canvas.getBoundingClientRect();
      setTopLeftOffset({ x: rect.left, y: rect.top });
    };
    handleResize();
  }, [settings.value.activeLayer]);

  useEffect(() => {
    // console.log("NEW CALL")
    const ctx = getCtxFromRef(markerCanvasRef)
    if(!ctx){return}
      drawMarkersOnCanvas   (
        ctx ,
        markers,
        topLeftOffset 
      )
   
  
    const handleMouseDown = (e: MouseEvent) => {
      if (!isActive) {
        return;
      }
      const rect = markerCanvasRef.current?.getBoundingClientRect();
      const x = e.clientX - rect!.left;
      const y = e.clientY - rect!.top;

      if (e.button === 2) {
        const clickedMarkerIndex = markers.value.findIndex(
          (marker) =>
            Math.abs(marker.position.x - x) < 10 &&
            Math.abs(marker.position.y - y) < 10
        );

        if (clickedMarkerIndex !== -1) {
          dispatchState({ type: "DRAG", markerIndex: clickedMarkerIndex });
        } else {
          const newMarker: MarkerType = {
            color: settings.value.color,
            position: { x, y },
            isDragging: false,
            topLeftOffset,
            topText: "",
            bottomText: "",
            customStyling: {...settings.value.markerSettings}
          };
          markers.value.push(newMarker)
          // setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        }
      }
    };

    const canvas = markerCanvasRef.current;
    if (canvas && isActive) {
      canvas.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      // canvas.removeEventListener('dblclick', handleMarkerDoubleClick);
    };
  }, [markerCanvasRef, markers.value, mousePosition, settings, markerLayerState]);

  return (
    <>
      <ReusableLayer layerName="marker" canvasRef={markerCanvasRef}>
        {markers.value.map((marker, index) => (
          <Marker
            key={index}
            topLeftOffset={marker.topLeftOffset}
            topText={marker.topText}
            bottomText={marker.bottomText}
            initialPosition={marker.position}
            // canvasSize={{ x: 800, y: 600 }}
            dragHandler={followMouseComponent}
            customStyling={settings.value.markerSettings}
          />
        ))}
      </ReusableLayer>
    </>
  );
};

export default UnitMarkerLayer;

 

export const drawMarkersOnCanvas = (
  ctx: CanvasRenderingContext2D,
  markers: Signal<MarkerType[]>,
 
  topLeftOffset: Vector2
) => {
  ctx.clearRect(0,0,settings.value.canvasSize.x,settings.value.canvasSize.y)
  markers.value.forEach((marker, index) => {
    // const imageUrl =
    //   settings.value.imageURL instanceof File
    //     ? URL.createObjectURL(settings.value.imageURL)
    //     : settings.value.imageURL;
    const usedWidth = marker.customStyling?.width|| 10
    const usedTextColor = marker.customStyling?.textColor|| "black"

    const markerStyle: React.CSSProperties = {
      left: `${marker.position.x}px`,
      top: `${marker.position.y}px`,
      width: `${usedWidth}px`,
      color: `${marker.customStyling?.textColor|| "black"} `,
      height: `${usedWidth}px`,
      fontSize: `${usedWidth }px`,
      backgroundColor: marker.customStyling?.color,
      // backgroundImage: settings.value.imageURL ? `url(${imageUrl})` : 'none',
      zIndex: marker.isDragging ? 10 : 1,
    };

    const textBackgroundStyle: React.CSSProperties = {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: '5px',
      borderRadius: '5px',
      userSelect: 'none',
    };

    const imageStyle: React.CSSProperties = {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
    };

    ctx.save();

    ctx.beginPath();
    ctx.arc(
      marker.position.x, //- topLeftOffset.x,
      marker.position.y, //- topLeftOffset.y,
      usedWidth / 2,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = settings.value.color;
    ctx.fill();
    ctx.closePath();

    // if (settings.value.imageURL) {
    //   const img = new Image();
    //   // img.src = imageUrl!;
    //   ctx.drawImage(
    //     img,
    //     marker.position.x - topLeftOffset.x - usedWidth/ 2,
    //     marker.position.y - topLeftOffset.y - usedWidth / 2,
    //     usedWidth,
    //     usedWidth
    //   );
    // }

    if (marker.topText) {
      ctx.font = `${usedWidth/ 4}px Arial`;
      ctx.fillStyle = usedTextColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        marker.topText,
        marker.position.x , - topLeftOffset.x,
        marker.position.y  - usedWidth/ 2 - 10//- topLeftOffset.y - usedWidth/ 2 - 10
      );
    }

    if (marker.bottomText && usedWidth > 20) {
      ctx.font = `${usedWidth / 4}px Arial`;
      ctx.fillStyle = usedTextColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        marker.bottomText,
        marker.position.x - topLeftOffset.x,
        marker.position.y //- topLeftOffset.y + usedWidth / 2 + 10
      );
    }

    ctx.restore();
  });
};