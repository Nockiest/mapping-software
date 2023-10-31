import {createContext, useContext, useState, useRef, } from "react"

interface CanvasContextType {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
  }
  interface CanvasSettingsType {
    settings: Settings
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  }
  type Settings = {
    radius:number,
    color: string
  }
  export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);
  export const BackgroundContext = createContext<CanvasContextType | undefined>(undefined);
  export const CanvasSettingsContext = createContext<CanvasSettingsType | undefined>(undefined);
  // Create a provider to wrap your components with
  
  
  export const CanvasProvider: React.FC = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [settings, setSettings] = useState<Settings>({radius: 5, color:"black"});
    const backgroundCanvasRef  = useRef<HTMLCanvasElement | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    return (
      <CanvasContext.Provider value={{ canvasRef }}>
        <BackgroundContext.Provider value={{ backgroundCanvasRef , backgroundImage, setBackgroundImage}}>
          <CanvasSettingsContext.Provider  value={{ settings, setSettings }}>
           {children}
          </CanvasSettingsContext.Provider>
        </BackgroundContext.Provider>
      </CanvasContext.Provider>
    );
  };
  
  export const useCanvas = () => {
    const context = useContext(CanvasContext);
  
    if (!context) {
      throw new Error('useCanvas must be used within a CanvasProvider');
    }
  
    return context;
  };
  
  export const useBackground = () => {
    const context = useContext(BackgroundContext);
  
    if (!context) {
      throw new Error('useBackground must be used within a CanvasProvider');
    }
  
    return context;
  };
  
  export const useCanvasSettings = () => {
    const context = useContext(CanvasSettingsContext);
  
    if (!context) {
      throw new Error('useBackground must be used within a CanvasProvider');
    }
  
    return context;
  };
  