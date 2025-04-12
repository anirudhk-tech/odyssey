import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export const DndDisabled = ({ children }: { children: ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: "dnd-disabled",
    data: {
      type: "dnd-disabled",
    },
    disabled: true,
  });

  return (
    <div ref={setNodeRef} onPointerDown={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
