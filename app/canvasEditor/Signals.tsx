import { Signal, signal } from "@preact/signals";
import { FrontLineSettings, MarkerArraySignal, Settings } from "@/public/types/OtherTypes";
export const settings: Settings = signal({
  radius: 5,
  color: `#000000`,
  lineType: "squared",
  activeLayer: "draw",
  canvasSize: { x: 800, y: 600 },
  markerSettings: {
    width: 10,
    color: `#000000`,
    textColor: `#ffffff`,
    topValue: "X",
    bottomValue: "Y",
    imageURL: null,
    popularMarkerColors: [],
  },
  popularColors: [],
  canvasZindexes: { marker: 10, draw: 10, background: 0, frontLine: 10 },
  // frontLineSettings: {insertionPointIndex: -1, frontLineColor: "#0000ff", activeFrontLine :null, frontLines: []}
});

export const frontLineSettings: FrontLineSettings = signal({
  insertionPointIndex: -1,
  frontLineColor: "#0000ff",
  activeFrontLine: null,
  frontLines: [],
  controlPointRadius: 5
});

export const markers:MarkerArraySignal = signal([])


export const backgroundImage = signal<File | null>(null);
