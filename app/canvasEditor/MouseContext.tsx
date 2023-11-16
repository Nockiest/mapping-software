import { Vector2 } from "@/public/types/GeometryTypes";
import { useEffect, useState,createContext, ReactNode } from "react";
 

export const MousePositionContext = createContext< Vector2| null>(null);

// Create a provider for mouse position
export const MousePositionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mousePosition, setMousePosition] = useState<Vector2| null>(null);

  const updateMousePosition = (x: number, y: number) => {
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <MousePositionContext.Provider value={mousePosition}>
      {children}
    </MousePositionContext.Provider>
  );
};