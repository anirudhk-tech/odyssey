import { MainState } from "@/lib/store";
import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { changeMultipleScenesColor } from "../../scenes/store/scenesSlice";
import {
  addSceneToNarrativeTimeline,
  addSceneToTimeline,
  changeScenePositionOnNarrativeTimeline,
  changeScenePositionOnTimeline,
} from "../../timeline/store/timelineSlice";
import { TIMELINE_TITLE_MARGIN } from "@/app/GlobalStyles";

export const useDndBookScenesAndTimelines = ({
  handleSceneDragStart,
  handleSceneDragMove,
  handleTimelineDragEnd,
  handleSceneDragEnd,
  timelineScrollContainerRef,
}: {
  handleSceneDragStart: (e: DragStartEvent) => void;
  handleSceneDragMove: (e: DragMoveEvent) => void;
  handleTimelineDragEnd: (e: DragEndEvent) => void;
  handleSceneDragEnd: (e: DragEndEvent) => void;
  timelineScrollContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );

  const scenesSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const timelinesSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "scene") {
      handleSceneDragStart(e);
    }
  };

  const handleDragMove = (e: DragMoveEvent) => {
    if (e.active.data.current?.type === "scene") {
      handleSceneDragMove(e);
    }
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over || !currentBookId) return;

    let x = active.rect.current.translated?.left ?? 0;

    if (x < TIMELINE_TITLE_MARGIN) return;

    x -= TIMELINE_TITLE_MARGIN;

    const scrollContainer = timelineScrollContainerRef.current;
    if (scrollContainer) {
      const { left: containerLeft } = scrollContainer.getBoundingClientRect();
      const scrollLeft = scrollContainer.scrollLeft;
      x = x - containerLeft + scrollLeft;
    }

    if (over.id === "narrative_timeline") {
      const response = await window.odysseyAPI.addSceneToNarrativeTimeline(
        currentBookId,
        active.id.toString(),
        x
      );

      if (response.success) {
        if (response.data.exists) {
          dispatch(
            changeScenePositionOnNarrativeTimeline({
              sceneId: active.id,
              newPosition: x,
              newColor: response.data.scene.color,
            })
          );
        } else {
          dispatch(
            addSceneToNarrativeTimeline({ id: response.data.scene.id, x })
          );
        }
      } else {
        console.error(
          "Error changing/adding to narrative timeline: ",
          response.message
        );
      }

      dispatch(
        changeMultipleScenesColor([
          {
            color: response.data.scene.color,
            id: active.id.toString(),
          },
        ])
      );
      return;
    }

    if (
      active.data.current?.type === "scene" &&
      over.data.current?.type === "timeline"
    ) {
      const response = await window.odysseyAPI.addSceneToTimeline(
        currentBookId,
        over.id.toString(),
        active.id.toString(),
        x
      );

      if (response.success) {
        if (response.data.exists) {
          dispatch(
            changeScenePositionOnTimeline({
              sceneId: active.id,
              timelineId: over.id,
              newPosition: x,
            })
          );
        } else {
          dispatch(
            addSceneToTimeline({
              scene: { id: active.id, x: x },
              timelineId: over.id,
            })
          );
        }
      } else {
        console.error(
          "Error adding/chaning scene to timeline: ",
          response.message
        );
      }
    } else if (active.data.current?.type === "scene") {
      handleSceneDragEnd(e);
    } else if (active.data.current?.type === "timeline") {
      handleTimelineDragEnd(e);
    }
  };

  const sensors = [...scenesSensors, ...timelinesSensors];

  return {
    handleDragEnd,
    handleDragMove,
    handleDragStart,
    sensors,
  };
};
