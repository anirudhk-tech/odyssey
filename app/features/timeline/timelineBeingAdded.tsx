import { useInputClickOut } from "@/lib/common/hooks/useInputClickOut";
import { useAddTimeline } from "@/lib/features/timeline/hooks/useAddTimeline";
import styled from "styled-components";

const Input = styled.textarea`
  height: 30px;
  width: 100%;
  border: none;
  resize: none;
`;

export const TimelineBeingAdded = () => {
  const { setTimelineName, handleAddTimeline, inputRef } = useAddTimeline();
  useInputClickOut({ onClickOut: handleAddTimeline, inputRef });

  return (
    <Input
      ref={inputRef}
      onChange={(e) => setTimelineName(e.target.value)}
      placeholder="Timeline name"
      autoFocus
      rows={1}
    />
  );
};
