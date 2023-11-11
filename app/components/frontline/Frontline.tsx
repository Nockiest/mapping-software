import { MousePositionContext } from '@/app/canvasEditor/page';
import { Vector2 } from '@/public/types/GeometryTypes';
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import Point from './Point';
import { settings } from '@/app/canvasEditor/Signals';
import { useCanvas } from '@/app/canvasEditor/CanvasContext';

 

type FrontLineProps = {
  topLeftPoint: Vector2;
  idNum: string;
  frontLineActive: boolean;
};

const Frontline: React.FC<FrontLineProps> = ({ idNum,   topLeftPoint, frontLineActive }) => {
    const [points, setPoints] = useState<Vector2[]>([]);
    const pointRadius:number = 5
    const [endPointIndex, setEndPointIndex] = useState<number | null>(0);
    const mousePosition = useContext(MousePositionContext);// udělat z toho custom context
    const { frontlineCanvasRef } = useCanvas();
    
    useEffect(() => {
    const canvas = frontlineCanvasRef.current;
    if (canvas && frontLineActive) {
        canvas.addEventListener('click', handleMouseDown);
        return () => {
        // Cleanup the event listener when the component unmounts
        canvas.removeEventListener('click', handleMouseDown);
        };
    }
    }, [frontlineCanvasRef,frontLineActive]);
    const addPoint = (position:Vector2) =>{
        setPoints( prevPoints => {
           return [...prevPoints, position]
        })
    }

    const updatePointPositions = (index, cllickPos) =>{
        setPoints((prevPoints) => {
            const newPoints = [...prevPoints];
            newPoints[index] = cllickPos;
            return newPoints;
          });
      
    }
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    // console.log(e.button)
    if (!frontLineActive) return;

    if (e.button === 0) {
      const rect = frontlineCanvasRef.current?.getBoundingClientRect();
      const canvasRelativeX = e.clientX  - rect!.left;
      const canvasRelativeY = e.clientY - rect!.top;

      // Check if an existing point is clicked
      const clickedPointIndex = points.findIndex((point) => {
        const isClicked =
          Math.abs(point.x - canvasRelativeX) < 5 && Math.abs(point.y - canvasRelativeY) < 5;
        if (isClicked) {
          console.log("Clicked Point Position:", point);
        }
        return isClicked;
      });

      if (clickedPointIndex !== -1) {
        console.log("EXISTING POINT");
        // Set the clicked point as the endpoint
        setEndPointIndex(clickedPointIndex);
      } else {
        // Add a new point
        console.log("ADDING A POINT");
        setPoints((prevPoints) => [...prevPoints, { x:canvasRelativeX, y:canvasRelativeY }]);
      }

      // Set up a timer to handle the duration of the right mouse button press
      // rightClickTimerRef.current = window.setTimeout(() => {
      //   // If the timer expires, trigger the function for long press
      //   findNewEndPointIndex(points[clickedPointIndex]);
      // }, 1000); // Adjust the duration as needed
    }
  };
    const findNewEndPointIndex = (clickedPoint: Vector2) => {
 
        console.log("Clicked Point Position:", clickedPoint);
        // Find the index of the clicked point in the points array
        const clickedPointIndex = points.findIndex(
          (point) => point.x === clickedPoint.x && point.y === clickedPoint.y
        );
        console.log(clickedPointIndex);
        // Set the clicked point as the endpoint
        setEndPointIndex(clickedPointIndex);
      };
    
    useEffect(() => {
        const canvas = frontlineCanvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx||!frontLineActive || !mousePosition) {
          return;
        }
          ctx.clearRect(0, 0, canvas?.width!, canvas?.height!);
          // Draw lines
          if (points.length >= 2) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i].x, points[i].y);
            }
    
            if (endPointIndex !== null) {
              // Draw a line from the last point to the endpoint
              if (points[endPointIndex]) {
                ctx.lineTo(points[endPointIndex].x, points[endPointIndex].y);
              } else {
                console.error('Endpoint index is null or invalid');
              }
            }
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
      }, [
        mousePosition,
        settings.value.activeLayer,
        frontlineCanvasRef,
        points,
        endPointIndex,
      ]);
    const handleDeletePoint = (index: number) => {
        setPoints((prevPoints) => {
          const newPoints = [...prevPoints];
          newPoints.splice(index, 1); // Remove the point at the specified index
          return newPoints;
        });
      };

  return (
    <div className='absolute top-0'>
        {points.map((point, index) => (
          <Point
            key={index}
            position={point}
            topLeft={{ x: topLeftPoint.x, y: topLeftPoint.y }}
            onDrag={(newPosition) => updatePointPositions(index, newPosition)}
            radius={5}
            mouseWheelClk={frontLineActive ? () => handleDeletePoint(index) : null}
            rightClk={frontLineActive ? () => findNewEndPointIndex(point) : null}
            onDelete={() => handleDeletePoint(index)}
            styling={{
              background: index === points.length - 1 ? "white" : "red",
              border: "2px solid black",
              pointerEvents: frontLineActive ? "auto" : "none",
              zIndex: "30",
            }}
            acceptInput={frontLineActive}
          >
            {index}
          </Point>
        ))}
    </div >
  )
}

export default Frontline

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