import { Signal, signal } from "@preact/signals";
import { Settings } from "@/public/types/OtherTypes";
export const settings:Settings = signal({
    radius: 5,
    color: `#000000`,
    lineType: "squared",
    activeLayer: "draw",
    canvasSize: {x:800,y:600},
    markerSettings: { width: 10, color: `#000000`, textColor: `#ffffff`,topValue: "X", bottomValue: "Y" , imageURL:null, popularMarkerColors: []},
    popularColors: [],
    canvasZindexes: {"marker": 10, "draw": 10, "background":0, "frontLine":10},
    frontLineSettings: {editedPointNum: 0, frontLineColor: "#0000ff", activeFrontLine:null}
  });
  
export const backgroundImage = signal<File | null>(null);
 