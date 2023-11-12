import { useContext, useState, useRef, useEffect, ReactNode } from "react";
import { MousePositionContext } from "../page";
import { Vector2 } from "@/public/types/GeometryTypes";
import { settings } from "../Signals";
import { useCanvas, useGlobalValue } from "../CanvasContext";
import Point from "@/app/components/frontline/Point";
import ReusableLayer from "@/app/components/utility/ResuableLayer";
import fillCanvas from "@/app/components/utility/fillCanvas";
import { Color } from "@/public/types/OtherTypes";
import Frontline from "@/app/components/frontline/Frontline";

import { v4 as uuidv4 } from "uuid";
import { drawLineAlongPoints } from "@/app/components/utility/CanvasUtils";
import {   getCtxFromRef } from "@/app/components/utility/otherUtils";

export type FrontlineData = {
  idNum: string;
  topLeftPoint: Vector2;
  points: Array<Vector2>;
  endPointIndex: number; 
  thickness: number ;
  color: Color
};
 
const FrontlineLayer = () => {
  const mousePosition = useContext(MousePositionContext);
  const { frontlineCanvasRef } = useCanvas();
  const frontLines = settings.value.frontLineSettings.frontLines;
  // DOUFÁM ŽE SE TO BUDE UPDATOVAT
  const activeFrontLineId = settings.value.frontLineSettings.activeFrontlineId;
  const [topLeft, setTopLeft] = useState<Vector2>({ x: 0, y: 0 });
  const [endPointIndex, setEndPointIndex] = useState<number | null>(0);
  const isActive = settings.value.activeLayer === "frontLine";

  useEffect(() => {
    // Assuming you want to instantiate one Frontline initially
    const initialFrontlineData: FrontlineData = {
      idNum: uuidv4(),
      points: [],
      topLeftPoint: {x:0,y:0},
      endPointIndex:0,
      thickness: 4,
      color:  settings.value.frontLineSettings.frontLineColor
    };
    settings.value.frontLineSettings.frontLines = [initialFrontlineData];
    settings.value.frontLineSettings.activeFrontlineId =
      initialFrontlineData.idNum;
  }, [isActive, frontlineCanvasRef, topLeft]);

  const renderFrontLines = () => {
    const frontLines = settings.value.frontLineSettings.frontLines;
    const ctx = getCtxFromRef(frontlineCanvasRef)
    if(!ctx){return}
    ctx.clearRect(0, 0, settings.value.canvasSize.x!, settings.value.canvasSize.y!)
    for (const line in frontLines) {
      if(frontLines[line].points.length < 2){return}
      drawLineAlongPoints(
        frontLines[line].points,
        frontLines[line].endPointIndex,
        ctx,
        frontLines[line].color,
        frontLines[line].thickness
      );
    }
  };

  useEffect(() => {
    renderFrontLines()
  }, [
    settings.value.activeLayer,
    frontlineCanvasRef,
    frontLines,
    settings.value.frontLineSettings.insertionPointIndex,
    mousePosition
  ] )

  useEffect(() => {
    const canvas = frontlineCanvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (rect) {
      console.log("SETTING TOP LEFT POS", { x: rect.left, y: rect.top });
      setTopLeft({ x: rect.left, y: rect.top });
    }
  }, [frontlineCanvasRef, settings.value.activeLayer]);

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {frontlineCanvasRef && (
        <ReusableLayer
          canvasRef={frontlineCanvasRef}
          style={{
            opacity: isActive ? "1" : "0.4",
          }}
          layerName="frontLine"
        >
          {frontLines.map((frontlineData) => (
            <Frontline
              key={frontlineData.idNum}
              idNum={frontlineData.idNum}
              topLeftPoint={topLeft}
              thickness={frontlineData.thickness}
            />
          ))}
        </ReusableLayer>
      )}
    </>
  );
};

export default FrontlineLayer;

// const handlePointDrag = (index: number, newPosition: Vector2) => {
//   console.log("HANDLING POINT DRAG", newPosition);
//   setPoints((prevPoints) => {
//     const newPoints = [...prevPoints];
//     newPoints[index] = newPosition;
//     return newPoints;
//   });
// };

// const findNewEndPointIndex = (clickedPoint: Vector2) => {
//   console.log("Clicked Point Position:", clickedPoint);
//   // Find the index of the clicked point in the points array
//   const clickedPointIndex = points.findIndex(
//     (point) => point.x === clickedPoint.x && point.y === clickedPoint.y
//   );
//   console.log(clickedPointIndex);
//   // Set the clicked point as the endpoint
//   setEndPointIndex(clickedPointIndex);
// };

// const handleDeletePoint = (index: number) => {
//   setPoints((prevPoints) => {
//     const newPoints = [...prevPoints];
//     newPoints.splice(index, 1); // Remove the point at the specified index
//     return newPoints;
//   });
// };
