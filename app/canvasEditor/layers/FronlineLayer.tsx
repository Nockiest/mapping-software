import { useContext, useState, useRef, useEffect, ReactNode } from "react";
// import { MousePositionContext } from "../MouseContext";
import { Vector2 } from "@/public/types/GeometryTypes";
import { editorTopLeftPosition, frontLineSettings, settings } from "../Signals";
import { useCanvas, useGlobalValue } from "../CanvasContext";
import Point from "@/app/components/frontline/Point";
import ReusableLayer from "@/app/components/global/ResuableLayer";
import fillCanvas from "@/app/components/utility/fillCanvas";
import { Color, FrontLinePointData, PointData } from "@/public/types/OtherTypes";
import Frontline from "@/app/components/frontline/Frontline";
import {v4 as uuidv4} from 'uuid'
import { drawLineAlongPoints } from "@/app/components/utility/CanvasUtils";
import { getCtxFromRef } from "@/app/components/utility/otherUtils";
import onMountFrontLineData from "../settings/frontLineSettings/OnMountFrontLineData";
import { findEndpointIndex } from "@/app/components/utility/utils";
import { addNewFrontLine } from "@/app/components/utility/FrontlineUtils";



export type FrontlineData = {
  idNum: string;
  topLeftPoint: Vector2;
  points: Array<FrontLinePointData>;
  endPoint : FrontLinePointData|null;
  thickness: number;
  color: Color;
};

const FrontlineLayer = () => {
  const { GlobalData } = useGlobalValue();
  const { mousePosition } = GlobalData;
  const { frontlineCanvasRef } = useCanvas();
  const frontLines = frontLineSettings.value.frontLines;
  const activeFrontline = frontLineSettings.value.activeFrontline;
  const isActive = settings.value.activeLayer === "frontLine";

  useEffect(() => {
    // addNewFrontLine()
    const newFrontline = { ...onMountFrontLineData, idNum: uuidv4() }
    frontLineSettings.value.frontLines = [newFrontline ];
    frontLineSettings.value.activeFrontline = newFrontline;
  }, []);

  const renderFrontLines = () => {
    const frontLines = frontLineSettings.value.frontLines;
    const { ctx, canvas } = getCtxFromRef(frontlineCanvasRef);

    if (!ctx|| !canvas ) {
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
        line.thickness,
        true
      );
    }
  };


  useEffect(() => {
    renderFrontLines();
  }, [frontlineCanvasRef, mousePosition, JSON.stringify(frontLineSettings.value)]);

  useEffect(() => {
    for(let i in frontLineSettings.value.frontLines) {
      let frontline = frontLineSettings.value.frontLines[i]
      for(let y in frontline.points){
        let frontLinePoint = frontline.points[y]
        frontLinePoint.centerPosition.x = Math.min(settings.value.canvasSize.x-frontLineSettings.value.controlPointRadius ,  frontLinePoint.centerPosition.x)
        frontLinePoint.centerPosition.y = Math.min(settings.value.canvasSize.y-frontLineSettings.value.controlPointRadius,  frontLinePoint.centerPosition.y)
      }
    }
  }, [settings.value.canvasSize])

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <ReusableLayer
        canvasRef={frontlineCanvasRef}
        positioning={'absolute top-0'}
        layerName="frontLine"
      >
        {frontLines.map((frontlineData) => (
          <Frontline
            key={frontlineData.idNum}
            idNum={frontlineData.idNum}

          />
        ))}
      </ReusableLayer>
    </>
  );
};

export default FrontlineLayer;
 // style={{
        //   opacity: isActive ? "1" : "0.4",
        // }}