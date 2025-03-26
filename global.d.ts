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
    };
  }
}
