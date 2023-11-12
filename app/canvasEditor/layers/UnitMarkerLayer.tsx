"use client";
import { useState, useEffect, useContext, useReducer } from "react";
import Marker from "@/app/components/markerLayer/Marker"; // Adjust the import path as needed
import { CanvasContext, useCanvas } from "../CanvasContext";
// import { Color } from '@/public/types/OtherTypes';
import { Vector2 } from "@/public/types/GeometryTypes";
import { settings } from "../Signals";
import { Color, MarkerSettings } from "@/public/types/OtherTypes";
// import LineComponent from '@/app/components/frontline/FrontLine2D';

import { MousePositionContext } from "../page";
import { followMouseComponent } from "@/public/utils";
import ReusableLayer from "@/app/components/utility/ResuableLayer";

const drawMarkersOnCanvas = (
  ctx: CanvasRenderingContext2D,
  markers: Marker[],
  topLeftOffset: Vector2
) => {
  markers.forEach((marker) => {
    const { position, usedSettings } = marker;

    const markerStyle: React.CSSProperties = {
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${usedSettings.width}px`,
      color: `${usedSettings.textColor} `,
      height: `${usedSettings.width}px`,
      fontSize: `${usedSettings.width / 4}px`,
      backgroundColor: usedSettings.color,
      zIndex: 1, // You can set zIndex as needed for drawing on the canvas
    };

    // Create a temporary div element
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = markerStyle.left!;
    tempDiv.style.top = markerStyle.top!;
    tempDiv.style.width = markerStyle.width!;
    tempDiv.style.height = markerStyle.height!;
    tempDiv.style.color = markerStyle.color!;
    tempDiv.style.fontSize = markerStyle.fontSize!;
    tempDiv.style.backgroundColor = markerStyle.backgroundColor!;
    tempDiv.innerHTML = "Marker"; // You can customize the content based on your Marker component

    // Append the temporary div to the body
    document.body.appendChild(tempDiv);

    // Use the browser's layout engine to calculate the styles
    const computedStyles = window.getComputedStyle(tempDiv);

    // Set the canvas font based on the computed styles
    ctx.font = `${computedStyles.fontSize} ${computedStyles.fontFamily}`;
    ctx.fillStyle = computedStyles.color!;
    ctx.textAlign = "center";

    // Draw text on the canvas
    ctx.fillText(
      "Marker",
      position.x + topLeftOffset.x,
      position.y + topLeftOffset.y
    );

    // Remove the temporary div from the body
    document.body.removeChild(tempDiv);
  });
};

enum MarkerLayerState {
  Idle,
  Dragging,
  EditingMarker,
  MakingLine,
}

export type MarkerType = {
  color: Color;
  position: Vector2;
  isDragging: boolean;
  topLeftOffset: Vector2;
  topText: string;
  bottomText:string;
  customStyling?:MarkerSettings;
};

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
  const [markers, setMarkers] = useState<MarkerType[]>([]);
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
    const handleMouseDown = (e: MouseEvent) => {
      if (!isActive) {
        return;
      }
      const rect = markerCanvasRef.current?.getBoundingClientRect();
      const x = e.clientX - rect!.left;
      const y = e.clientY - rect!.top;

      if (e.button === 2) {
        const clickedMarkerIndex = markers.findIndex(
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
          };
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
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
  }, [markerCanvasRef, markers, mousePosition, settings, markerLayerState]);

  return (
    <>
      <ReusableLayer layerName="marker" canvasRef={markerCanvasRef}>
        {markers.map((marker, index) => (
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

// const handleMarkerDoubleClick = (e: MouseEvent) => {
//   const rect = markerCanvasRef.current?.getBoundingClientRect();
//   const x = e.clientX - rect!.left;
//   const y = e.clientY - rect!.top;
//   console.log('Marker double-clicked!');
//   dispatchState({ type: 'MAKING_LINE' });
// };
{
  /* <canvas
        width={800}
        height={600}
        className="border-2 canvas-rectangle markerLayer  "
        ref={markerCanvasRef}
        // style={{ pointerEvents: isActive ? 'auto' : 'none' }}
      /> */
}

// const handleMouseMove = (e: MouseEvent) => {
//   // if (markerLayerState === MarkerLayerState.Dragging) {
//   //   const rect = canvas.getBoundingClientRect();
//   //   const x = e.clientX - rect.left;
//   //   const y = e.clientY - rect.top;

//   //   setMarkers((prevMarkers) =>
//   //     prevMarkers.map((marker, index) =>
//   //       index === draggingMarkerIndex ? { ...marker, position: { x, y } } : marker
//   //     )
//   //   );
//   // }
// };
