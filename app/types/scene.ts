export interface Scene {
  title: string;
  id: string;
  textFilePath: string;
  color: string | null;
  charCount: number;
  wordCount: number;
  imagePath: string | null;
}

export interface TimelineScene {
  id: string;
  x: number;
}

export type AllScene = Scene & TimelineScene;
