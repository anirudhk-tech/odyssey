import { Menu } from "@/app/components/menu";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { useFetchTimelineSections } from "@/lib/features/timeline/hooks/useFetchTimelineSections";
import { useTimelineSection } from "@/lib/features/timeline/hooks/useTimelineSection";
import { useTimelineSectionMenu } from "@/lib/features/timeline/hooks/useTimelineSectionMenu";
import { useTimelineSectionResize } from "@/lib/features/timeline/hooks/useTimelineSectionResize";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  margin-left: 170px;
`;

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

export const TimelineSections = () => {
  const { timelineSections } = useFetchTimelineSections();
  const { handleMouseDown } = useTimelineSectionResize();
  const { handleSetTimelineSectionToBeEdited } = useTimelineSection();
  const { menuPos, setMenuPos, handleMenuOpen } = useMenu();
  const { options } = useTimelineSectionMenu({ setMenuPos });

  return (
    <Container>
      <Menu menuPos={menuPos} setMenuPos={setMenuPos} options={options} />
      {timelineSections.map((section, idx) => (
        <SectionContainer
          key={section.id}
          onContextMenu={(e) => {
            handleMenuOpen(e);
            handleSetTimelineSectionToBeEdited(section);
          }}
        >
          <SectionLabel>{section.title}</SectionLabel>
          <SectionResizeContainer key={section.id}>
            <Section color={section.color} width={section.width} />
            <SectionResizeArea onMouseDown={(e) => handleMouseDown(e, section)}>
              <SectionResizeHandle />
            </SectionResizeArea>
          </SectionResizeContainer>
        </SectionContainer>
      ))}
    </Container>
  );
};
