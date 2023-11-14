import { frontLineSettings, settings } from "@/app/canvasEditor/Signals";
import { FrontlineData } from "@/app/canvasEditor/layers/FronlineLayer";
import { CanvasRef } from "@/public/types/OtherTypes";

 

export const findFrontLineObj = (id: string) => {
  const frontline = frontLineSettings.value.frontLines.find(
    (frontline) => frontline.idNum === id
  );
  if (frontline === null) {
    throw new Error(`PROBLEM WITH FINDING FRONTLINE ${id} `);
  }
  return frontline;
};

export const getCtxFromRef = (
  canvasRef: React.RefObject<HTMLCanvasElement | null | undefined>
): { ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null } => {
  if (!canvasRef || !canvasRef.current) {
    console.error("Canvas reference is missing.");
    return { ctx: null, canvas: null };
  }

  const canvas = canvasRef.current;

  if (!canvas) {
    console.error("Canvas element is missing.");
    return { ctx: null, canvas: null };
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("2D context cannot be obtained from the canvas.");
    return { ctx: null, canvas };
  } else {
    return { ctx, canvas };
  }
};