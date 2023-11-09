import { useContext, useState, useRef, useEffect, ReactNode } from "react";
import { MousePositionContext } from "../page";
import { Vector2 } from "@/public/types/GeometryTypes";
import { settings } from "../Signals";
import { useCanvas } from "../CanvasContext";
import Point from "@/app/components/frontline/Point";
import ReusableLayer from "@/app/components/utility/ResuableLayer";
import fillCanvas from "@/app/components/utility/fillCanvas";
import { Color } from "@/public/types/OtherTypes";
import Frontline from "@/app/components/frontline/Frontline";

const FrontlineLayer = () => {
  const mousePosition = useContext(MousePositionContext);
  const { frontlineCanvasRef } = useCanvas();
  const [frontLines, setFrontlines] = useState<ReactNode[]>([])
  const [activeFrontLine, setActiveFrontline] = useState<ReactNode|null>(null)
  const [topLeft, setTopLeft] = useState<Vector2>({ x: 0, y: 0 });
  const [endPointIndex, setEndPointIndex] = useState<number | null>(0);
  const rightClickTimerRef = useRef<number | null>(null);
  const isActive = settings.value.activeLayer === "frontLine";
  useEffect(() => {
    // Assuming you want to instantiate one Frontline component initially
    const initialFrontline = (
      <Frontline
        idNum="frontline-1"
        activeFrontLine
        topLeftPoint={topLeft}
      />
    );

    setFrontlines([initialFrontline]);
    setActiveFrontline(initialFrontline)
  }, [isActive, frontlineCanvasRef, topLeft]);
  useEffect(() => {
    const canvas = frontlineCanvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (rect) {
      console.log("SETTING TOP LEFT POS", { x: rect.left, y: rect.top });
      setTopLeft({ x: rect.left, y: rect.top });
    }
    // fillCanvas (frontlineCanvasRef, 'rgba(0,  0, 211, 0.3)'); 
  }, [frontlineCanvasRef, settings.value.activeLayer]);

  // useEffect(() => {
  //   const canvas = frontlineCanvasRef.current;
  //   const ctx = canvas?.getContext("2d");
  //   if (!ctx) {
  //     return;
  //   }
  //   if (isActive && mousePosition) {
  //     // const x = e.clientX //- rect!.left;
  //     // const y = e.clientY - rect!.top;
  //     // Clear the canvas
  //     ctx.clearRect(0, 0, canvas?.width!, canvas?.height!);

  //     // Draw lines
  //     if (points.length >= 2) {
  //       ctx.beginPath();
  //       ctx.moveTo(points[0].x, points[0].y);
  //       for (let i = 1; i < points.length; i++) {
  //         ctx.lineTo(points[i].x, points[i].y);
  //       }

  //       if (endPointIndex !== null) {
  //         // Draw a line from the last point to the endpoint
  //         if (points[endPointIndex]) {
  //           ctx.lineTo(points[endPointIndex].x, points[endPointIndex].y);
  //         }
  //         else {
  //           console.error('Endpoint index is null or invalid');
  //         }
  //       }

  //       ctx.strokeStyle = color;
  //       ctx.lineWidth = 2;
  //       ctx.stroke();
  //       ctx.closePath();
  //     }
  //   }
  // }, [
  //   mousePosition,
  //   settings.value.activeLayer,
  //   frontlineCanvasRef,
  //   endPointIndex,
  // ]);

  const handleMouseUp = () => {
    // Clear the timer if the right mouse button is released before it expires
    clearTimeout(rightClickTimerRef.current);
    rightClickTimerRef.current = null;
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    // console.log(e.button)
    if (!isActive) return;

    
  };

 
      //{/* this topleft offset works in case the canvas editor has only vertical offset */}
  return (
    <>
      {frontlineCanvasRef && (
        <ReusableLayer
          canvasRef={frontlineCanvasRef}
          ref={frontlineCanvasRef}
          style={{
            opacity: isActive ? "1" : "0.4",
          }}
          layerName="frontLine"
          onLeftClick={(e) => handleMouseDown(e)}
          onMouseUp={handleMouseUp}
          onRightClick={(e) => handleMouseDown(e)}
        >
          {frontLines && frontLines.map((frontLine, idNum, index) => (
            <Frontline key={index} idNum={idNum} activeFrontLine={activeFrontLine}   topLeftPoint={topLeft} />
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