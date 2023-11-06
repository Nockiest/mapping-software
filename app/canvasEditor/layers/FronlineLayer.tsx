import React, {useContext, useState, useEffect} from 'react'
import { MousePositionContext } from '../page'
import { Vector2 } from '@/public/types/GeometryTypes';
import { settings } from '../Signals';
import { useCanvas } from '../CanvasContext';
import Point from '@/app/components/frontline/linePoint';
 

const FrontlineLayer = () => {
    const mousePosition = useContext(MousePositionContext);
    const { forntlineCanvasRef } = useCanvas();
    const [points, setPoints] = useState<Vector2[]>([]);
    const [topLeft, setTopLeft] = useState<Vector2>({ x: 0, y: 0 });
    const [endPointIndex, setEndPointIndex] = useState<number | null>(0);
  
    useEffect(() => {
      const canvas = forntlineCanvasRef.current;
      const rect = canvas?.getBoundingClientRect();
      if (rect) {
        console.log("SETTING TOP LEFT POS",{ x: rect.left, y: rect.top })
        setTopLeft({ x: rect.left, y: rect.top });
      }
    }, [forntlineCanvasRef, settings.value.activeLayer]);
  
    useEffect(() => {
      const canvas = forntlineCanvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx) {
        return;
      }
      if (settings.value.activeLayer === 'frontLine' && mousePosition) {
        // Clear the canvas
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
            ctx.lineTo(points[endPointIndex].x, points[endPointIndex].y);
          }
  
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }, [mousePosition, settings.value.activeLayer, forntlineCanvasRef, points, endPointIndex]);
  
    const handleRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
     console.log("HANDLING RIGHT CLICK")
      if (settings.value.activeLayer === 'frontLine') {
        const rect = forntlineCanvasRef.current?.getBoundingClientRect();
        const x = e.clientX - rect!.left;
        const y = e.clientY - rect!.top;
  
        // Check if an existing point is clicked
        const clickedPointIndex = points.findIndex((point) => {
            const isClicked = Math.abs(point.x - x) < 5 && Math.abs(point.y - y) < 5;
        //    console.log( Math.abs(point.x - x),point.x ,x ,  Math.abs(point.y - y),point.y,y)
            if (isClicked) {
              console.log('Clicked Point Position:', point);
            }
            return isClicked;
          });
  
        if (clickedPointIndex !== -1) {
        console.log("EXISTING POINT ")
          // Set the clicked point as the endpoint
          setEndPointIndex(clickedPointIndex);
        } else {
          // Add a new point
          setPoints((prevPoints) => [...prevPoints, { x, y }]);
        }
      }
    };
  
    const handlePointDrag = (index: number, newPosition: Vector2) => {
      setPoints((prevPoints) => {
        const newPoints = [...prevPoints];
        newPoints[index] = newPosition;
        return newPoints;
      });
    };
    const testRightClick = (clickedPoint: Vector2) => {
      console.log("Clicked Point Position:", clickedPoint);
  
      // Find the index of the clicked point in the points array
      const clickedPointIndex = points.findIndex(
        (point) => point.x === clickedPoint.x && point.y === clickedPoint.y
      );
  
      // Set the clicked point as the endpoint
      setEndPointIndex(clickedPointIndex);
    };
    const handleDeletePoint = (index: number) => {
      setPoints((prevPoints) => {
        const newPoints = [...prevPoints];
        newPoints.splice(index, 1); // Remove the point at the specified index
        return newPoints;
      });
    };
    return (
      <div className="absolute top-0" onContextMenu={(e) => e.preventDefault()}>
        <canvas
          width={800}
          height={600}
          className="border-2 canvas-rectangle"
          ref={forntlineCanvasRef}
          style={{
            pointerEvents: settings.value.activeLayer === 'frontLine' ? 'auto' : 'none',
            opacity: settings.value.activeLayer === 'frontLine' ? '1' : '0.4',
          }}
          onContextMenu={handleRightClick}
        />
        {points.map((point, index) => (
          <Point
            key={index}
            position={point}
            topLeft={topLeft} // Pass the topLeft position
            onDrag={(newPosition) => handlePointDrag(index, newPosition)}
            radius={5}
            mouseWheelClk={() => handleDeletePoint(point)}
            onRightClk={() =>  testRightClick(point)}
            onDelete={() => handleDeletePoint(index)} // Pass the deletion callback
            styling={{
              background: index === points.length - 1 ? 'white' : 'red',
              border: '2px solid black'
            }}
          />
        ))}
        <p>  {endPointIndex}</p> 
      </div>
    );
  };
  
  export default FrontlineLayer;
  