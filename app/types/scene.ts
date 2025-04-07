export interface Scene {
  title: string;
  id: string;
  textFilePath: string;
  color: string | null;
}

export interface PositionScene {
  id: string;
  x: number;
}
