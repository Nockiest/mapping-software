// import { MousePositionContext } from "@/app/canvasEditor/MouseContext";
import { Vector2 } from "@/public/types/GeometryTypes";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import Point from "./Point";
import { frontLineSettings, settings } from "@/app/canvasEditor/Signals";
import { useCanvas } from "@/app/canvasEditor/CanvasContext";
import { computed } from "@preact/signals";
import { Color } from "@/public/types/OtherTypes";
import { FrontLinePointData, FrontlineData  } from "@/app/canvasEditor/layers/FronlineLayer";
import { findFrontLineObj } from "../utility/otherUtils";
import { v4 as uuidv4 } from "uuid";
import { findEndpointIndex } from "../utility/utils";

export type FrontlineProps = {
  idNum: string;

}
const Frontline: React.FC<FrontlineProps> = ({ idNum  }) => {
  const frontLineActive = frontLineSettings.value.activeFrontline?.idNum? frontLineSettings.value.activeFrontline.idNum === idNum: false;
  const frontLineInfo = findFrontLineObj(idNum)
  if (!frontLineInfo){
    console.warn(' cant find frontline info', idNum)
    return
  }
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
    // if (!frontLineInfo){return}
    frontLineSettings.value.activeFrontline  = frontLineInfo;
    return () => {
      frontLineSettings.value.activeFrontline  = null;
    };
  }, [idNum, frontLineInfo]);

  const addPoint = (position: Vector2) => {
    if (!frontLineInfo) return;

    const oldPoints = [...frontLineInfo.points];
    const insertionPointIndex = frontLineSettings.value.insertionPointIndex;
    const newPoint: FrontLinePointData = {
      position: position,
      id: uuidv4(),
      radius: controlPointRadius,
      bezierType: false
    };

    const endPointIndex = findEndpointIndex(frontLineInfo);
    console.log(endPointIndex, oldPoints.length - 1, oldPoints);

    if (endPointIndex === oldPoints.length - 1 && endPointIndex >= 0) {
      console.log('updating end point index');
      setEndPoint(newPoint.id);
    }

    if (oldPoints.length === 0) {
      // If oldPoints is empty, push the new point and set it as the endpoint
      oldPoints.push(newPoint);
      frontLineInfo.endPoint = newPoint;
    } else {
      // Determine the index at which to insert the new point
      const insertIndex =
        insertionPointIndex !== null && insertionPointIndex !== -1
          ? Math.min(Math.max(0, insertionPointIndex), oldPoints.length)
          : oldPoints.length;

      // Insert the new point at the specified index
      oldPoints.splice(insertIndex, 0, newPoint);

      // If the new point is added at the end, update the endpoint
      if (insertIndex === oldPoints.length - 1) {
        frontLineInfo.endPoint = newPoint;
      }
    }

    frontLineInfo.points = oldPoints;
  };


  const updatePointInformation = (key: string, value:number|boolean|string|Vector2, id:string) => {

    const pointIndex = frontLineInfo.points.findIndex(
      (point) => point.id === id
    );
    if (pointIndex !== -1) {
      // If the point is found, update its position
      const newPoints = [...frontLineInfo.points];
      newPoints[pointIndex] = { ...newPoints[pointIndex], [key]: value  };
      frontLineInfo.points = newPoints;
    } else {
      console.error(`Point with id ${id}  not found.`);
    }
  }


  const updatePointPositions = (id: string, clickPos: Vector2) => {
    updatePointInformation ('position', clickPos  , id )
  };

  const changeBezierPoints = (id: string) => {
    const pointIndex = frontLineInfo.points.findIndex((point) => point.id === id);

    if (pointIndex !== -1) {
      // If the point is found, update its bezierType
      const newPoints = [...frontLineInfo.points];

      // Toggle the bezierType for the current point
      newPoints[pointIndex] = { ...newPoints[pointIndex], bezierType: !newPoints[pointIndex].bezierType };

      // Set bezierType to false for the point before and after
      if (pointIndex > 0) {
        newPoints[pointIndex - 1] = { ...newPoints[pointIndex - 1], bezierType: false };
      }

      if (pointIndex < newPoints.length - 1) {
        newPoints[pointIndex + 1] = { ...newPoints[pointIndex + 1], bezierType: false };
      }

      frontLineInfo.points = newPoints;
    } else {
      console.error(`Point with id ${id} not found.`);
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
      frontLineInfo.endPoint  = clickedPoint ;
    } else {
      // If no point is clicked, add a new point
      addPoint({ x: canvasRelativeX, y: canvasRelativeY });
    }
  };

  const setEndPoint  = (id: string) => {
    console.log("UPDATING END POINT INDEX")
    if (!frontLineInfo) return;

    const clickedPoint = frontLineInfo.points.find((point) => point.id === id);

    if (clickedPoint) {
      frontLineInfo.endPoint = clickedPoint;
    }
  };

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
          pointTopLeftPosition={point.position}
          id={point.id}
          onDrag={(newPosition) => updatePointPositions(point.id, newPosition)}
          radius={controlPointRadius}
          mouseWheelClk={
            frontLineActive ? (e) => handleDeletePoint(point.id) : null
          }
          onDelete={(e:  MouseEvent|React.MouseEvent) => handleDeletePoint(point.id)}
          rightClk={() => changeBezierPoints(point.id)}
          styling={{
            backgroundColor: point  === frontLineInfo.endPoint  ? "red" : point.bezierType? 'green' : "white",
            border: "2px solid black",
            pointerEvents: frontLineActive ? "auto" : "none",
            zIndex: "30",
            // backgroundColor: point.bezierType? 'green' : 'blue'
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
 // if (!frontLineInfo) return;
    // Find the index of the point with the specified id
    // const pointIndex = frontLineInfo.points.findIndex(
    //   (point) => point.id === id
    // );

    // if (pointIndex !== -1) {
    //   // If the point is found, update its position
    //   const newPoints = [...frontLineInfo.points];
    //   newPoints[pointIndex] = { ...newPoints[pointIndex], position: clickPos };
    //   frontLineInfo.points = newPoints;
    // } else {
    //   console.error(`Point with id ${id}  not found.`);
    // }