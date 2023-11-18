"use client";
import { useState, useEffect, useContext, useReducer } from "react";
import Marker, { MarkerDefaultSettings } from "@/app/components/markerLayer/Marker"; // Adjust the import path as needed
import { CanvasContext, useCanvas } from "../CanvasContext";
// import { Color } from '@/public/types/OtherTypes';
import { Vector2 } from "@/public/types/GeometryTypes";
import { settings } from "../Signals";
import { Color, MarkerArraySignal, MarkerSettings, MarkerType } from "@/public/types/OtherTypes";
// import LineComponent from '@/app/components/frontline/FrontLine2D';
import { markers } from "../Signals";
import { MousePositionContext } from "../MouseContext";
import { extractImageUrl, followMouseComponent } from "@/app/components/utility/utils";
import ReusableLayer from "@/app/components/utility/ResuableLayer";
import { Signal } from "@preact/signals";
import { getCtxFromRef } from "@/app/components/utility/otherUtils";
import { uuid } from "uuidv4";
import { drawMarkersOnCanvas } from "@/app/components/markerLayer/MarkerCanvasPrint";
 
 
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
    const {ctx, } = getCtxFromRef(markerCanvasRef)
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
            color: settings.value.markerSettings.color,
            position: { x, y },
            isDragging: false,
            topLeftOffset,
            topText: settings.value.markerSettings.topText,
            bottomText: settings.value.markerSettings.bottomText,
            customStyling: {...settings.value.markerSettings},
            id:uuid()
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
      canvas?.removeEventListener("mousedown", handleMouseDown);
      // canvas.removeEventListener('dblclick', handleMarkerDoubleClick);
    };
  }, [markerCanvasRef, markers.value, mousePosition, settings, markerLayerState]);

  return (
    <>
      <ReusableLayer layerName="marker" canvasRef={markerCanvasRef}>
      {markers.value.map((marker) => (
          <Marker
            key={marker.id}
            topLeftOffset={marker.topLeftOffset}
            topText={marker.topText}
            bottomText={marker.bottomText}
            initialPosition={marker.position}
            id={marker.id}
            dragHandler={followMouseComponent}
            customStyling={settings.value.markerSettings}
          />
        ))}
      </ReusableLayer>
       
    </>
  );
};

export default UnitMarkerLayer;

 

 