import { MousePositionContext } from "@/app/canvasEditor/page";
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
const Frontline: React.FC<FrontlineData> = ({ idNum, topLeftPoint }) => {
  const frontLineActive =
    frontLineSettings.value.activeFrontline.idNum === idNum;
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
  
    if (frontLineSettings.value.insertionPointIndex !== null && frontLineSettings.value.insertionPointIndex !== -1) {
      // Insert the new point at the specified index
      newPoints.splice(frontLineSettings.value.insertionPointIndex, 0, {
        position: position,
        id: uuidv4(),
        radius:controlPointRadius
      });
    } else {
      // Append the new point
      newPoints.push({
        position: position,
        id: uuidv4(),
        radius:controlPointRadius
      });
    }
  
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
    console.log("CLICK ", frontLineActive, frontLineInfo )
    e.preventDefault();
    if (!frontLineActive||!frontLineInfo) return;

    if (e.button === 0) {
      const rect = frontlineCanvasRef.current?.getBoundingClientRect();
      const canvasRelativeX = e.clientX - (rect?.left || 0);
      const canvasRelativeY = e.clientY - (rect?.top || 0);

      const clickedPointIndex = frontLineInfo?.points.findIndex((point) => {
        const isClicked =
          Math.abs(point.position.x - canvasRelativeX) < controlPointRadius &&
          Math.abs(point.position.y - canvasRelativeY) < controlPointRadius;
        return isClicked;
      });
      console.log(clickedPointIndex)
      if (clickedPointIndex !== -1) {
       
        frontLineInfo.endPointIndex = clickedPointIndex
        return;
      } else {
        addPoint({ x: canvasRelativeX, y: canvasRelativeY });
      }
    }
  };

  const updateEndPointIndex = (id: string) => {
    console.log("UPDATING END POINT INDEX")
    if (!frontLineInfo){return}
    const clickedPointIndex = frontLineInfo.points.findIndex(
      (point) =>
        point.id===id
    );
    frontLineInfo.endPointIndex = clickedPointIndex
  }

  const findNewEndPointIndex = (e: React.MouseEvent, clickedPoint: Vector2) => {
    e.preventDefault();
    if (!frontLineInfo) {
      return;
    }
    const clickedPointIndex = frontLineInfo?.points.findIndex(
      (point) =>
        point.position.x === clickedPoint.x &&
        point.position.y === clickedPoint.y
    );
    frontLineInfo.endPointIndex = clickedPointIndex || -1;
    // setEndPointIndex(clickedPointIndex);
  };

  const handleDeletePoint = (id: string) => {
    console.log("DELETING A POINT");

    if (frontLineInfo) {
      console.log("Point Id to Delete:", id);
      console.log("Points Before Deletion:", frontLineInfo.points);

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
      {idNum}
      <br />
      {frontLineInfo?.idNum}
      {frontLineInfo?.points.map((point, index) => (
        <Point
          key={index}
          position={point.position}
          id={point.id}
          topLeft={{ x: topLeftPoint.x, y: topLeftPoint.y }}
          onDrag={(newPosition) => updatePointPositions(point.id, newPosition)}
          radius={controlPointRadius}
          mouseWheelClk={
            frontLineActive ? (e) => handleDeletePoint(point.id) : null
          }
          rightClk={
            frontLineActive
              ? (e) => updateEndPointIndex(point.id)
              : null
          }
          // leftClk={(e) => updateEndPointIndex(point.id)}
          onDelete={(e: React.MouseEvent) => handleDeletePoint(point.id)}
          styling={{
            background: index === frontLineInfo.endPointIndex ? "white" : "red",
            border: "2px solid black",
            pointerEvents: frontLineActive ? "auto" : "none",
            zIndex: "30",
          }}
          acceptInput={frontLineActive}
        >
          {index}
        </Point>
      ))}
    </div>
  );
};

export default Frontline;

// useEffect(() => {
//   const canvas = frontlineCanvasRef.current;
//   const ctx = canvas?.getContext("2d");
//   if (!ctx || !frontLineActive || !mousePosition) {
//     return;
//   }
//   ctx.clearRect(0, 0, canvas?.width!, canvas?.height!);
//   // Draw lines
//   if (points.length >= 2) {
//     ctx.beginPath();
//     ctx.moveTo(points[0].x, points[0].y);
//     for (let i = 1; i < points.length; i++) {
//       ctx.lineTo(points[i].x, points[i].y);
//     }

//     if (endPointIndex !== null) {
//       // Draw a line from the last point to the endpoint
//       if (points[endPointIndex]) {
//         ctx.lineTo(points[endPointIndex].x, points[endPointIndex].y);
//       } else {
//         console.error("Endpoint index is null or invalid");
//       }
//     }
//     ctx.strokeStyle = color;
//     ctx.lineWidth = 2;
//     ctx.stroke();
//     ctx.closePath();
//   }
// }, [
//   mousePosition,
//   settings.value.activeLayer,
//   frontlineCanvasRef,
//   points,
//   endPointIndex,
// ]);

// const clickedPointIndex = points.findIndex((point) => {
//     const isClicked =
//       Math.abs(point.x - canvasRelativeX) < pointRadius && Math.abs(point.y - canvasRelativeY) < pointRadius;
//     if (isClicked) {
//       console.log("Clicked Point Position:", point);
//     }
//     return isClicked;
//   });

// setPoints( prevPoints => {
//     [...prevPoints, cllickPos]
// })
