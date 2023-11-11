import { settings } from "@/app/canvasEditor/Signals";
import { FrontlineData } from "@/app/canvasEditor/layers/FronlineLayer";
import { CanvasRef } from "@/public/types/OtherTypes";

export const findActiveFrontLine = (): FrontlineData | null => {
  const activeFrontlineId = settings.value.frontLineSettings.activeFrontlineId;
 ;
  if (activeFrontlineId) {
    const activeFrontline = settings.value.frontLineSettings.frontLines.find(
      (frontline) => frontline.idNum === activeFrontlineId
    );
    return activeFrontline|| null;
  } else {
    return null;
  }
};

export const findFrontLineObj = (id: string) => {
  const frontline = settings.value.frontLineSettings.frontLines.find(
    (frontline) => frontline.idNum === id
  );
  if (frontline === null) {
    throw new Error(`PROBLEM WITH FINDING FRONTLINE ${id} `);
  }
  return frontline;
};

export const assertCtxExists = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
): boolean => {
  if (!canvasRef || !canvasRef.current) {
    console.error("Canvas reference is missing.");
    return false;
  }
  if (canvasRef.current === null) {
    return false;
  }
  const canvas = canvasRef.current;
  if (!canvas) {
    return false;
  }
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("2D context cannot be obtained from the canvas.");
    return false;
  } else {
    return true;
  }

 
};
