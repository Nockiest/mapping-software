import { Vector2 } from "@/public/types/GeometryTypes";
import { hexToRGBA } from "../utility/utils";
import { DrawLineWithShapeParams } from "./LineDrawer";
import { DrawQuadraticBezierWithShapeParams } from "@/public/types/OtherTypes";


export const drawQuadraticBezierWithShape = ({
    ctx,
    lineStart,
    lineEnd,
    controlPoints,
    color,
    size,
    lineShape = "squared", // Default to squared, change as needed
  }: DrawQuadraticBezierWithShapeParams): void => {
    if (!ctx) {
      throw new Error("Canvas 2D context not supported");
    }

    const numberOfShapes = 100; // Adjust as needed

    // Validate that there are at least two control points
    if (!controlPoints || controlPoints.length < 2) {
      throw new Error("At least two control points are required");
    }

    const quadraticCurve = (t: number) => {
      const n = controlPoints.length - 1;
      let x = 0;
      let y = 0;

      for (let i = 0; i <= n; i++) {
        const binomialCoefficient = binomialCoefficientAt(n, i);
        const tPower = Math.pow(t, i) * Math.pow(1 - t, n - i);
        x += binomialCoefficient * tPower * controlPoints[i].x;
        y += binomialCoefficient * tPower * controlPoints[i].y;
      }

      return { x, y };
    };

    const colorArray = typeof color === "string" ? hexToRGBA(color) : color;
    ctx.fillStyle = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${
      colorArray[3] / 255
    })`;

    for (let i = 0; i < numberOfShapes; i++) {
      const t = i / (numberOfShapes - 1);
      const { x, y } = quadraticCurve(t);

      ctx.beginPath();

      if (lineShape === "squared") {
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      } else if (lineShape === "rounded") {
        ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        throw new Error("Invalid line shape specified");
      }
    }
  };

  // Helper function for calculating binomial coefficient
  const binomialCoefficientAt = (n: number, k: number): number => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  // Helper function for calculating factorial
  const factorial = (n: number): number => {
    if (n === 0 || n === 1) {
      return 1;
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }

    return result;
  };
export const drawQuadraticCurve = ({
    ctx,
    lineStart,
    lineEnd,
    color,
    size,
    lineShape = "squared",
  }: DrawLineWithShapeParams): void => {
    if (!ctx) {
      throw new Error("Canvas 2D context not supported");
    }

    const control = {
      x: (lineStart.x + lineEnd.x) / 2,
      y: Math.min(lineStart.y, lineEnd.y) - 50,
    };

    const colorArray = typeof color === "string" ? hexToRGBA(color) : color;
    ctx.fillStyle = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${
      colorArray[3] / 255
    })`;

    ctx.beginPath();
    ctx.moveTo(lineStart.x, lineStart.y);
    ctx.quadraticCurveTo(control.x, control.y, lineEnd.x, lineEnd.y);

    const distance = Math.sqrt(
      Math.pow(lineEnd.x - lineStart.x, 2) + Math.pow(lineEnd.y - lineStart.y, 2)
    );
    const numberOfShapes = Math.floor(distance * 0.1); // Adjust as needed

    for (let i = 0; i < numberOfShapes; i++) {
      const t = i / numberOfShapes;
      const x = Math.round(
        lineStart.x +
          t *
            (2 * (1 - t) * (control.x - lineStart.x) +
              t * (lineEnd.x - lineStart.x))
      );
      const y = Math.round(
        lineStart.y +
          t *
            (2 * (1 - t) * (control.y - lineStart.y) +
              t * (lineEnd.y - lineStart.y))
      );

      ctx.beginPath();
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }
  };
