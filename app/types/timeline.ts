import { PositionScene } from "./scene";

export interface Timeline {
  title: string;
  id: string;
  scenes: PositionScene[];
}

export interface TimelineSection {
  id: string;
  title: string;
  color: string;
  xStart: number;
  xEnd: number;
  width: number;
}
