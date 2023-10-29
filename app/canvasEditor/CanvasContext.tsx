import { createContext, useContext } from 'react';

// Define the type for the context value
export interface CanvasContextType {
 canvas: 
}

// Create the context with an initial value (can be null)
export const CanvasContextType = createContext<CanvasContextType | null>(null);

 