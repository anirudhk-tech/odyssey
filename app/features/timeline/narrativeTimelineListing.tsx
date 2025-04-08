import { useFetchNarrativeTimeline } from "@/lib/features/timeline/hooks/useFetchNarrativeTimeline";
import styled from "styled-components";
import { TimelineSceneListing } from "./timelineSceneListing";

const Container = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  height: 80px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  overflow-x: auto;
`;

const TitleContainer = styled.div<{ scrollleft: number }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 140px;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  left: 10px;
  transform: translateX(${(props) => props.scrollleft}px);
  transition: transform 0.3s ease;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  font-weight: bold;
`;

const ScenesContainer = styled.div`
  width: calc(100% - 150px);
  height: 100%;
`;

export const NarrativeTimelineListing = ({
  scrollLeft,
}: {
  scrollLeft: number;
}) => {
  const { narrativeTimeline } = useFetchNarrativeTimeline();

  return (
    <Container>
      <TitleContainer scrollleft={scrollLeft}>
        <Title>Narrative</Title>
      </TitleContainer>
      <ScenesContainer>
        {narrativeTimeline &&
          narrativeTimeline.scenes &&
          narrativeTimeline.scenes.map((scene) => (
            <TimelineSceneListing key={scene.id} scene={scene} />
          ))}
      </ScenesContainer>
    </Container>
  );
};
