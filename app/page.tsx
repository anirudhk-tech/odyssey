"use client";

import styled from "styled-components";
import { ScenesDrawer } from "./features/scenes/scenesDrawer";
import { Editor } from "./features/editor/editor";
import { TimelineDrawer } from "./features/timeline/timelineDrawer";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export default function HomePage() {
  return (
    <Container>
      <Editor />
      <ScenesDrawer />
      <TimelineDrawer />
    </Container>
  );
}
