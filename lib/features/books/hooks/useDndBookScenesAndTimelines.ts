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
  changeMultipleSceneColorsOnTimelines,
  changeScenePositionOnNarrativeTimeline,
  changeScenePositionOnTimeline,
} from "../../timeline/store/timelineSlice";

export const useDndBookScenesAndTimelines = ({
  handleSceneDragStart,
  handleSceneDragMove,
  handleTimelineDragEnd,
  handleSceneDragEnd,
}: {
  handleSceneDragStart: (e: DragStartEvent) => void;
  handleSceneDragMove: (e: DragMoveEvent) => void;
  handleTimelineDragEnd: (e: DragEndEvent) => void;
  handleSceneDragEnd: (e: DragEndEvent) => void;
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

    if (over.id === "narrative_timeline") {
      const x = active.rect.current.translated?.left ?? 0;

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
          dispatch(addSceneToNarrativeTimeline(response.data.scene));
        }
      }

      dispatch(
        changeMultipleScenesColor([
          {
            color: response.data.scene.color,
            id: active.id.toString(),
          },
        ])
      );

      dispatch(
        changeMultipleSceneColorsOnTimelines([
          {
            color: response.data.scene.color,
            sceneId: active.id.toString(),
          },
        ])
      );
      return;
    }

    if (
      active.data.current?.type === "scene" &&
      over.data.current?.type === "timeline"
    ) {
      const x = active.rect.current.translated?.left ?? 0;

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
              scene: response.data.scene,
              timelineId: over.id,
            })
          );
        }
      }
    } else if (active.data.current?.type === "scene") {
      handleSceneDragEnd(e);
    } else if (active.data.current?.type === "timeline") {
      handleTimelineDragEnd(e);
    }
  };

  const sensors = [...scenesSensors, ...timelinesSensors];

  return { handleDragEnd, handleDragMove, handleDragStart, sensors };
};
