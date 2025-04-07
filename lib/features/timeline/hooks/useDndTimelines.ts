import { MainState } from "@/lib/store";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimelinesOrder } from "../../books/store/dndBooksSlice";

export const useDndTimelines = () => {
  const timelinesOrder = useSelector(
    (state: MainState) => state.dndBooks.timelinesOrder
  );
  const timelines = useSelector((state: MainState) => state.timeline.timelines);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTimelinesOrder(timelines ? timelines : []));
  }, [timelines]);

  const handleTimelineDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = timelinesOrder.findIndex(
        (timeline) => timeline.id === active.id
      );
      const newIndex = timelinesOrder.findIndex(
        (timeline) => timeline.id === over.id
      );

      const newOrder = arrayMove(timelinesOrder, oldIndex, newIndex);
      dispatch(setTimelinesOrder(newOrder));
    }
  };

  return { handleTimelineDragEnd, timelinesOrder };
};
