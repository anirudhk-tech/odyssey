import { PositionScene } from "./scene";

export interface Timeline {
  title: string;
  id: string;
  scenes: PositionScene[];
}
