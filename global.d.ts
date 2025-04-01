import { Response } from "./app/types/electron";

export {};

declare global {
  interface Window {
    odysseyAPI: {
      createBook: (bookName: string) => Promise<Response>;
      createScene: (bookName: string, sceneName: string) => Promise<Response>;
      getBooks: () => Promise<Response>;
      deleteBook: (bookUUID: string) => Promise<Response>;
      renameBook: (bookUUID: string, newBookName: string) => Promise<Response>;
      getScenes: (bookUUID: string) => Promise<Response>;
      createScene: (bookUUID: string, sceneName: string) => Promise<Response>;
      deleteScene: (bookUUID: string, sceneUUID: string) => Promise<Response>;
      renameScene: (
        bookUUID: string,
        sceneUUID: string,
        newSceneName: string
      ) => Promise<Response>;
      getTextFromScene: (
        bookUUID: string,
        sceneUUID: string
      ) => Promise<Response>;
      writeTextIntoScene: (
        bookUUID: string,
        sceneUUID: string,
        rawJsonText: string
      ) => Promise<Response>;
      getTimelines: (bookUUID: string) => Promise<Response>;
      createTimeline: (
        bookUUID: string,
        timelineName: string
      ) => Promise<Response>;
      deleteTimeline: (
        bookUUID: string,
        timelineUUID: string
      ) => Promise<Response>;
      renameTimeline: (
        bookUUID: string,
        timelineUUID: string,
        newTitle: string
      ) => Promise<Response>;
      getTimelineSections: (bookUUID: string) => Promise<Response>;
      createTimelineSection: (
        bookUUID: string,
        sectionName: string,
        sectionColor: string,
        xStart: number
      ) => Promise<Response>;
      getTimelineSections: (bookUUID: string) => Promise<Response>;
      resizeTimelineSection: (
        bookUUID: string,
        sectionUUID: string,
        xStart: number,
        xEnd: number,
        width: number
      ) => Promise<Response>;
      editTimelineSection: (
        bookUUID: string,
        sectionUUID: string,
        sectionName: string,
        sectionColor: string
      ) => Promise<Response>;
      deleteTimelineSection: (
        bookUUID: string,
        sectionUUID: string
      ) => Promise<Response>;
      swapTimelineSections: (
        bookUUID: string,
        sectionUUID1: string,
        sectionUUID2: string
      ) => Promise<Response>;
    };
  }
}
