import { Scene } from "./scene";

export interface Timeline {
  title: string;
  id: string;
  scenes: Scene[];
}

export interface TimelineSection {
  id: string;
  title: string;
  color: string;
  xStart: number;
  xEnd: number;
  width: number;
}

export interface NarrativeTimeline {
  scenes: Scene[];
}
