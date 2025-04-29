import { TimelineSection } from "@/app/types/timeline";
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { swapTimelineSections } from "../store/timelineSectionsSlice";
import { MainState } from "@/lib/store";
import { swapTimelineScenesColor } from "../store/timelineSlice";
import { swapScenesColor } from "../../scenes/store/scenesSlice";

export const useDndTimelineSections = ({
  sections,
}: {
  sections: TimelineSection[] | null;
}) => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const [sectionsOrder, setSectionsOrder] = useState<TimelineSection[]>([]);

  useEffect(() => {
    setSectionsOrder(sections ? sections : []);
  }, [sections]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleSwap = async (sectionAId: string, sectionBId: string) => {
    if (!currentBookId) return;

    dispatch(swapTimelineSections({ sectionAId, sectionBId }));
    const response = await window.odysseyAPI.swapTimelineSections(
      currentBookId,
      sectionAId,
      sectionBId
    );

    if (response.success) {
      dispatch(swapTimelineScenesColor(response.data));
      dispatch(swapScenesColor(response.data));
    } else {
      console.error("Error swapping timeline sections: ", response.message);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = sectionsOrder.findIndex(
        (section) => section.id === active.id
      );
      const newIndex = sectionsOrder.findIndex(
        (section) => section.id === over?.id
      );

      const newSectionsOrder = arrayMove(sectionsOrder, oldIndex, newIndex);
      setSectionsOrder(newSectionsOrder);

      handleSwap(newSectionsOrder[oldIndex].id, newSectionsOrder[newIndex].id);
    }
  };

  return {
    sectionsOrder,
    sensors,
    handleDragEnd,
  };
};
