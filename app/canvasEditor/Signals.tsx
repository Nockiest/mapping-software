import { Signal, signal } from "@preact/signals";
import { Settings } from "@/public/types/OtherTypes";
export const settings:Settings = signal({
    radius: 5,
    color: `#000000`,
    lineType: "squared",
    activeLayer: "draw",
    markerSettings: { width: 10, color: `#000000`, topValue: "X", bottomValue: "Y" , image:null},
    popularColors: []
  });
  
export const backgroundImage = signal<File | null>(null);
