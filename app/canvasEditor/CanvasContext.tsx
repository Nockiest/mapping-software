
// import React, { createContext, useContext, useRef, ReactNode } from 'react';

// // Create a context for the canvas
// interface CanvasContextType {
//     canvasRef: React.RefObject<HTMLCanvasElement | null>;
//     backgroundCanvasRef: React.RefObject<HTMLCanvasElement | null>;
//   }
  
// export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

// // Create a hook to use the canvas context
// export const useCanvas = () => {
//   const context =  useContext(CanvasContext);

//   if (!context) {
//     throw new Error('useCanvas must be used within a CanvasProvider');
//   }

//   return context;
// };
 
 
 
// export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);

//   const contextValue: CanvasContextType = {
//     canvasRef,
//     backgroundCanvasRef,
//   };

//   return (
//     <CanvasContext.Provider value={contextValue}>
//       {children}
//     </CanvasContext.Provider>
//   );
// };