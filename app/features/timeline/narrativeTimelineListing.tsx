import { useFetchNarrativeTimeline } from "@/lib/features/timeline/hooks/useFetchNarrativeTimeline";
import styled from "styled-components";
import { TimelineSceneListing } from "./timelineSceneListing";
import { TIMELINE_TITLE_MARGIN } from "@/app/GlobalStyles";

const Container = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  height: 80px;
  align-items: center;
  scrollbar-width: none;
  width: fit-content;
  z-index: 3;
`;

const TitleContainer = styled.div<{ scrollleft: number; width: number }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  height: 100%;
  width: ${(props) => props.width}px;
  justify-content: center;
  align-items: flex-end;
  transform: translateX(${(props) => props.scrollleft}px);
  transition: transform 0.3s ease;
  background-color: ${(props) => props.theme.colors.background};
  font-weight: bold;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  font-weight: bold;
  padding-right: 5px;
`;

const ScenesContainer = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  overflow-x: visible;
  position: relative;
`;

const Spacer = styled.div`
  width: 10000px;
  height: 1px;
  flex-shrink: 0;
`;

export const NarrativeTimelineListing = ({
  scrollLeft,
}: {
  scrollLeft: number;
}) => {
  const { narrativeTimeline } = useFetchNarrativeTimeline();

  return (
    <Container>
      <TitleContainer scrollleft={scrollLeft} width={TIMELINE_TITLE_MARGIN}>
        <Title>Narrative</Title>
      </TitleContainer>
      <ScenesContainer>
        {narrativeTimeline &&
          narrativeTimeline.scenes &&
          narrativeTimeline.scenes.map((scene) => (
            <TimelineSceneListing
              key={scene.id}
              scene={scene}
              timeline={"narrativeTimeline"}
            />
          ))}
        <Spacer />
      </ScenesContainer>
    </Container>
  );
};
