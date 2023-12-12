"use client";
import { useState, useEffect, useContext, useReducer } from "react";
import Marker, {
  MarkerDefaultSettings,
} from "@/app/components/markerLayer/Marker"; // Adjust the import path as needed
import { CanvasContext, useCanvas, useGlobalValue } from "../CanvasContext";

import { Vector2 } from "@/public/types/GeometryTypes";
import { markerSettings, settings } from "../Signals";
import {
  Color,
  MarkerArraySignal,
  MarkerSettings,
  MarkerType,
} from "@/public/types/OtherTypes";
import { markers } from "../Signals";
import {
  extractImageURL,
  followMouseComponent,
} from "@/app/components/utility/utils";
import ReusableLayer from "@/app/components/global/ResuableLayer";
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
      return state === MarkerLayerState.MakingLine
        ? MarkerLayerState.Idle
        : MarkerLayerState.MakingLine;
    default:
      console.error("INVALID ACTION: " + action);
      return state;
  }
};

const UnitMarkerLayer: React.FC = () => {
  const { markerCanvasRef } = useCanvas();
  const [markerLayerState, dispatchState] = useReducer(
    markerLayerStateMachine,
    MarkerLayerState.Idle
  );
  const {GlobalData} = useGlobalValue()
  const {mousePosition} = GlobalData
  const isActive = settings.value.activeLayer === "marker";

  useEffect(() => {

    const { ctx , canvas } = getCtxFromRef(markerCanvasRef);
    if (!ctx|| !canvas) {
      return;
    }
    drawMarkersOnCanvas(ctx, markers);

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
            Math.abs(marker.centerPosition.x - x) < 10 &&
            Math.abs(marker.centerPosition.y - y) < 10
        );
        // tohle mus9m prepsat
        if (clickedMarkerIndex !== -1) {
          dispatchState({ type: "DRAG", markerIndex: clickedMarkerIndex });
        } else {
          const newMarker: MarkerType = {
            color:  markerSettings.value.color,
            centerPosition: { x, y },
            isDragging: false,
            topText: markerSettings.value.topText,
            bottomText: markerSettings.value.bottomText,
            customStyling: { ...markerSettings.value },
            id: uuid(),
          };
          markers.value.push(newMarker);
        }
      }
    };

      canvas.addEventListener("mousedown", handleMouseDown);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [
    markerCanvasRef,
    markers.value,
    mousePosition,
    settings,
    markerLayerState,
  ]);

  const onMarkerMovement= (markerId: string, newCenterPosition: Vector2) => {
    console.log('newcenter', newCenterPosition)
    markers.value = markers.value.map((marker) =>
    marker.id === markerId ? { ...marker, centerPosition: newCenterPosition } : marker);
  }

  return (

      <ReusableLayer layerName="marker" canvasRef={markerCanvasRef}  positioning={'absolute top-0'}>
        {markers.value.map((marker) => (
          <Marker
            key={marker.id}
            initialPosition={marker.centerPosition}
            id={marker.id}
            dragHandler={onMarkerMovement}
            customStyling={markerSettings.value}
            boundToCanvasEditor={true}
            centerPosition={marker.centerPosition}
          />
        ))}
      </ReusableLayer>

  );
};

export default UnitMarkerLayer;
