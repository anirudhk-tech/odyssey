import { Response } from "./app/types/electron";

export {};

declare global {
  interface Window {
    odysseyAPI: {
      createBookFolder: (bookName: string) => Promise<Response>;
      createScene: (bookName: string, sceneName: string) => Promise<Response>;
      getBooks: () => Promise<Response>;
    };
  }
}
