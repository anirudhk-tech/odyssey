import { Scene, TimelineScene } from "./scene";

export interface Timeline {
  title: string;
  id: string;
  scenes: TimelineScene[];
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
  scenes: TimelineScene[];
}
