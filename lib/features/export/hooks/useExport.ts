import { Scene, TimelineScene } from "@/app/types/scene";
import { MainState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedScene, setSelectedScenes } from "../store/exportSlice";

export const useExport = () => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const narrativeScenes = useSelector(
    (state: MainState) => state.timeline.narrativeTimeline?.scenes
  );

  const [bookScenes, setBookScenes] = useState<Scene[]>([]);
  const [bookId, setBookId] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>(null);

  const books = useSelector((state: MainState) => state.books.books);

  const bookOptions =
    books?.map((book) => ({
      label: book.title,
      value: book.id,
    })) || [];

  const sceneOptions = bookScenes || [];

  const formatOptions = [
    {
      label: "PDF",
      value: "pdf",
    },
  ];

  const selectScenesInNarrativeOrder = async () => {
    if (!bookId) return;

    let sortedNarrativeScenes: TimelineScene[] = [];
    if (!narrativeScenes) {
      const response = await window.odysseyAPI.getNarrativeTimeline(bookId);

      if (response.success) {
        sortedNarrativeScenes = response.data.narrativeTimeline.scenes.sort(
          (a: TimelineScene, b: TimelineScene) => a.x - b.x
        );
      } else {
        console.error("Error fetching narrative scenes: ", response.message);
        return;
      }
    } else {
      sortedNarrativeScenes = narrativeScenes.sort((a, b) => a.x - b.x);
    }

    dispatch(setSelectedScenes([]));

    sortedNarrativeScenes.forEach((scene) => {
      const bookScene = bookScenes.find((s) => s.id === scene.id);
      if (!bookScene) return;
      dispatch(addSelectedScene(bookScene));
    });
  };

  const fetchScenes = async (bookId: string) => {
    const response = await window.odysseyAPI.getScenes(bookId);
    if (response.success) {
      setBookScenes(response.data.scenes);
    } else {
      console.error("Error fetching scenes: ", response.message);
    }
  };

  useEffect(() => {
    if (currentBookId) {
      setBookId(currentBookId);
    }
  }, [currentBookId]);

  useEffect(() => {
    if (bookId) {
      fetchScenes(bookId);
    }
  }, [bookId]);

  return {
    bookId,
    bookOptions,
    sceneOptions,
    formatOptions,
    format,
    setFormat,
    setBookId,
    selectScenesInNarrativeOrder,
  };
};
