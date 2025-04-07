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
import {
  addSceneToTimeline,
  changeScenePositionOnTimeline,
} from "../store/dndBooksSlice";
import { changeSceneColor } from "../../scenes/store/scenesSlice";

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
  const timelineSections = useSelector(
    (state: MainState) => state.timelineSections.sections
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

    if (
      active.data.current?.type === "scene" &&
      over.data.current?.type === "timeline"
    ) {
      const x = (active.rect.current.translated?.left ?? 0) + 170;

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
              scene: {
                id: active.id,
                x,
              },
              timelineId: over.id,
            })
          );
        }
        console.log(timelineSections);
        console.log(x);
        console.log(
          timelineSections.find(
            (section) => section.xStart <= x && section.xEnd >= x
          )?.color ?? "No color found"
        );

        dispatch(
          changeSceneColor({
            color:
              timelineSections.find(
                (section) => section.xStart <= x && section.xEnd >= x
              )?.color ?? null,
            id: active.id.toString(),
          })
        );
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
