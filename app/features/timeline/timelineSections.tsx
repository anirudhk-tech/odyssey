import { useFetchTimelineSections } from "@/lib/features/timeline/hooks/useFetchTimelineSections";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const Section = styled.div<{ color: string }>`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.color};
  transition: width 0.3s ease;
`;

const SectionContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 10px;
  transition: width 0.3s ease;
  justify-content: center;
  align-items: center;
`;

const SectionLabel = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
`;

export const TimelineSections = () => {
  const { timelineSections } = useFetchTimelineSections();

  return (
    <Container>
      {timelineSections.map((section) => (
        <SectionContainer key={section.id} width={section.width}>
          <SectionLabel>{section.title}</SectionLabel>
          <Section key={section.id} color={section.color} />
        </SectionContainer>
      ))}
    </Container>
  );
};
