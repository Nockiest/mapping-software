import { settings } from "@/app/canvasEditor/Signals";
import { FrontlineData } from "@/app/canvasEditor/layers/FronlineLayer";
import { CanvasRef } from "@/public/types/OtherTypes";

// export const  settings.value.frontLineSettings.activeFrontline = (): FrontlineData | null => {
//   const activeFrontline = settings.value.frontLineSettings.activeFrontline 
//   if (activeFrontline) {
//     return activeFrontline
//   } else {
//     return null;
//   }
// };

export const findFrontLineObj = (id: string) => {
  const frontline = settings.value.frontLineSettings.frontLines.find(
    (frontline) => frontline.idNum === id
  );
  if (frontline === null) {
    throw new Error(`PROBLEM WITH FINDING FRONTLINE ${id} `);
  }
  return frontline;
};

export const getCtxFromRef = (
  canvasRef: React.RefObject<HTMLCanvasElement | null|undefined>
): CanvasRenderingContext2D | null => {
  if (!canvasRef || !canvasRef.current) {
    console.error("Canvas reference is missing.");
    return null;
  }

  const canvas = canvasRef.current;

  if (!canvas) {
    console.error("Canvas element is missing.");
    return null;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("2D context cannot be obtained from the canvas.");
    return null;
  } else {
    return ctx;
  }
};

