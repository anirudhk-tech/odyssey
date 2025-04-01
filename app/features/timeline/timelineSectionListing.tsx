import { TimelineSection } from "@/app/types/timeline";
import { useTimelineSection } from "@/lib/features/timeline/hooks/useTimelineSection";
import { useTimelineSectionResize } from "@/lib/features/timeline/hooks/useTimelineSectionResize";
import styled from "styled-components";

const Section = styled.div<{ color: string; width: number }>`
  height: 5px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  transition: width 0.3s ease;
`;

const SectionContainer = styled.div`
  width: fit-content;
  height: fit-content;
  transition: width 0.3s ease;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const SectionResizeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
`;

const SectionResizeHandle = styled.div`
  width: 1px;
  height: 20px;
  cursor: ew-resize;
  background-color: black;
`;

const SectionResizeArea = styled.div`
  width: 10px;
  height: 20px;
  cursor: ew-resize;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SectionLabel = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
`;

export const TimelineSectionListing = ({
  timelineSection,
  handleMenuOpen,
}: {
  timelineSection: TimelineSection;
  handleMenuOpen: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  const { handleMouseDown } = useTimelineSectionResize();
  const { handleSetTimelineSectionToBeEdited } = useTimelineSection();

  return (
    <SectionContainer
      key={timelineSection.id}
      onContextMenu={(e) => {
        handleMenuOpen(e);
        handleSetTimelineSectionToBeEdited(timelineSection);
      }}
    >
      <SectionLabel>{timelineSection.title}</SectionLabel>
      <SectionResizeContainer key={timelineSection.id}>
        <Section color={timelineSection.color} width={timelineSection.width} />
        <SectionResizeArea
          onMouseDown={(e) => handleMouseDown(e, timelineSection)}
        >
          <SectionResizeHandle />
        </SectionResizeArea>
      </SectionResizeContainer>
    </SectionContainer>
  );
};
