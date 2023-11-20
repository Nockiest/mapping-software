// import { MousePositionContext } from "@/app/canvasEditor/MouseContext";
import { Vector2 } from "@/public/types/GeometryTypes";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import Point from "./Point";
import { frontLineSettings, settings } from "@/app/canvasEditor/Signals";
import { useCanvas } from "@/app/canvasEditor/CanvasContext";
import { computed } from "@preact/signals";
import { Color } from "@/public/types/OtherTypes";
import { FrontlineData } from "@/app/canvasEditor/layers/FronlineLayer";
import { findFrontLineObj } from "../utility/otherUtils";
import { v4 as uuidv4 } from "uuid";

export type FrontlineProps = {
  idNum: string;
  topLeftPoint: Vector2
}
const Frontline: React.FC<FrontlineProps> = ({ idNum, topLeftPoint }) => {
  const frontLineActive = frontLineSettings.value.activeFrontline?.idNum? frontLineSettings.value.activeFrontline.idNum === idNum: false;
  const frontLineInfo = findFrontLineObj(idNum)  
  const { frontlineCanvasRef } = useCanvas();
  const controlPointRadius = frontLineSettings.value.controlPointRadius

  useEffect(() => {
    const canvas = frontlineCanvasRef.current;
    if (canvas && frontLineActive) {
      canvas.addEventListener("click", handleMouseDown);
      return () => {
        canvas.removeEventListener("click", handleMouseDown);
      };
    }
  }, [frontlineCanvasRef, frontLineActive]);

  useEffect(() => {
    if (!frontLineInfo){return}
    frontLineSettings.value.activeFrontline  = frontLineInfo;
    return () => {
      frontLineSettings.value.activeFrontline  = null;
    };
  }, [idNum, frontLineInfo]);

  const addPoint = (position: Vector2) => {
    if (!frontLineInfo) return;
  
    const newPoints = [...frontLineInfo.points];
    const insertionPointIndex = frontLineSettings.value.insertionPointIndex;
  
    // Determine the index at which to insert the new point
    const insertIndex =
    insertionPointIndex !== null && insertionPointIndex !== -1
        ? Math.min(Math.max(0, insertionPointIndex), newPoints.length)
        : newPoints.length;
    console.log( insertionPointIndex, insertIndex , frontLineInfo.points.length)
    if ( insertionPointIndex === frontLineInfo.points.length){
      console.log('end point index should move')
    }
    // Insert the new point at the specified index
    newPoints.splice(insertIndex, 0, {
      position: position,
      id: uuidv4(),
      radius: controlPointRadius,
    });
  
    frontLineInfo.points = newPoints;
  };
  
  

  const updatePointPositions = (id: string, clickPos: Vector2) => {
    if (!frontLineInfo) return;
    // Find the index of the point with the specified id
    const pointIndex = frontLineInfo.points.findIndex(
      (point) => point.id === id
    );

    if (pointIndex !== -1) {
      // If the point is found, update its position
      const newPoints = [...frontLineInfo.points];
      newPoints[pointIndex] = { ...newPoints[pointIndex], position: clickPos };
      frontLineInfo.points = newPoints;
    } else {
      console.error(`Point with id ${id}  not found.`);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
  
    if (!frontLineActive || !frontLineInfo || e.button !== 0) {
      return;
    }
  
    const rect = frontlineCanvasRef.current?.getBoundingClientRect();
    const canvasRelativeX = e.clientX - (rect?.left || 0);
    const canvasRelativeY = e.clientY - (rect?.top || 0);
  
    // Find the clicked point
    const clickedPoint = frontLineInfo?.points.find((point) => {
      const isClicked =
        Math.abs(point.position.x - canvasRelativeX) < controlPointRadius &&
        Math.abs(point.position.y - canvasRelativeY) < controlPointRadius;
      return isClicked;
    });
  
    if (clickedPoint) {
      // If a point is clicked, set it as the endpoint
      frontLineInfo.endPointId = clickedPoint.id;
    } else {
      // If no point is clicked, add a new point
      addPoint({ x: canvasRelativeX, y: canvasRelativeY });
    }
  };
  
  const setEndPointIndex = (id: string) => {
    console.log("UPDATING END POINT INDEX")
    if (!frontLineInfo){return}
    const clickedPointIndex = frontLineInfo.points.findIndex(
      (point) =>{
       if( point.id===id ){
        return point.id
       } }  );
    frontLineInfo.endPointId =id
  }

  const handleDeletePoint = (id: string) => {
    console.log("DELETING A POINT");

    if (frontLineInfo) {
     
      const pointIndex = frontLineInfo.points.findIndex(
        (point) => point.id === id
      );

      console.log("Index to Delete:", pointIndex);

      if (pointIndex !== -1) {
        const newPoints = [...frontLineInfo.points];
        newPoints.splice(pointIndex, 1);
        frontLineInfo.points = newPoints;

        console.log("Points After Deletion:", frontLineInfo.points);
      } else {
        console.error(`Point with id ${id} not found.`);
      }
    }
  };
  
  return (
    <div className="absolute top-0">
       
      {frontLineInfo?.points.map((point, index) => (
        <Point
          key={point.id}
          position={point.position}
          id={point.id}
          // topLeft={{ x: topLeftPoint.x, y: topLeftPoint.y }}
          onDrag={(newPosition) => updatePointPositions(point.id, newPosition)}
          radius={controlPointRadius}
          mouseWheelClk={
            frontLineActive ? (e) => handleDeletePoint(point.id) : null
          }
          rightClk={
            frontLineActive
              ? (e) => setEndPointIndex(point.id)
              : null
          }
          // leftClk={(e) => updateEndPointIndex(point.id)}
          onDelete={(e:  MouseEvent|React.MouseEvent) => handleDeletePoint(point.id)}
          styling={{
            background: point.id === frontLineInfo.endPointId ? "red" : "white",
            border: "2px solid black",
            pointerEvents: frontLineActive ? "auto" : "none",
            zIndex: "30",
          }}
          acceptInput={frontLineActive}
        >
          <p className="text-black mt-2"> {index} </p> 
        </Point>
      ))}
    </div>
  );
};

export default Frontline;

 