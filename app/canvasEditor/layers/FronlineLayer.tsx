import { useContext, useState, useRef, useEffect, ReactNode } from "react";
// import { MousePositionContext } from "../MouseContext";
import { Vector2 } from "@/public/types/GeometryTypes";
import { frontLineSettings, settings } from "../Signals";
import { useCanvas, useGlobalValue } from "../CanvasContext";
import Point from "@/app/components/frontline/Point";
import ReusableLayer from "@/app/components/utility/ResuableLayer";
import fillCanvas from "@/app/components/utility/fillCanvas";
import { Color } from "@/public/types/OtherTypes";
import Frontline from "@/app/components/frontline/Frontline";

import { drawLineAlongPoints } from "@/app/components/utility/CanvasUtils";
import { getCtxFromRef } from "@/app/components/utility/otherUtils";
import onMountFrontLineData from "../settings/frontLineSettings/OnMountFrontLineData";
import { findEndpointIndex } from "@/app/components/utility/utils";

export type PointData = {
  position: Vector2;
  radius: number;
  id: string;
};

export type FrontlineData = {
  idNum: string;
  topLeftPoint: Vector2;
  points: Array<PointData>;
  endPointId: string;
  thickness: number;
  color: Color;
};

const FrontlineLayer = () => {
  const { GlobalData } = useGlobalValue();
  const { mousePosition } = GlobalData;
  const { frontlineCanvasRef } = useCanvas();
  const frontLines = frontLineSettings.value.frontLines;
  const activeFrontline = frontLineSettings.value.activeFrontline;
  const [topLeft, setTopLeft] = useState<Vector2>({ x: 0, y: 0 });
  const [endPointIndex, setEndPointIndex] = useState<number | null>(0);
  const isActive = settings.value.activeLayer === "frontLine";

  useEffect(() => {
    frontLineSettings.value.frontLines = [{ ...onMountFrontLineData }];
    frontLineSettings.value.activeFrontline = onMountFrontLineData;
  }, []);

  const renderFrontLines = () => {
    const frontLines = frontLineSettings.value.frontLines;
    const { ctx, canvas } = getCtxFromRef(frontlineCanvasRef);
  
    if (!ctx) {
      return;
    }
  
    ctx.clearRect(0, 0, settings.value.canvasSize.x!, settings.value.canvasSize.y!);
  
    for (const line of frontLines) {
      if (line.points.length < 2) {
        return;
      }
  
      const endPointIndex = findEndpointIndex(line);
  
      drawLineAlongPoints(
        line.points,
        endPointIndex !== -1 ? endPointIndex : line.points.length - 1,
        ctx,
        line.color,
        line.thickness
      );
    }
  };
  

  useEffect(() => {
    
    renderFrontLines();
  }, [frontlineCanvasRef, mousePosition, JSON.stringify(frontLineSettings.value)]);
  

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
          />
        ))}
      </ReusableLayer>
    </>
  );
};

export default FrontlineLayer;
