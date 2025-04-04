import { Scene } from "@/app/types/scene";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SceneListing } from "./sceneListing";

export const DndSceneListing = ({ scene }: { scene: Scene }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: scene.id, data: { type: "scene" } });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SceneListing scene={scene} />
    </div>
  );
};
