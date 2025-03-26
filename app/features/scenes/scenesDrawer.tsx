import { useScenesDrawer } from "@/lib/features/scenes/hooks/useScenesDrawer";
import styled from "styled-components";
import { ScenesHeader } from "./scenesHeader";
import { useFetchScenes } from "@/lib/features/scenes/hooks/useFetchScenes";
import { SceneListing } from "./sceneListing";
import { Scene } from "@/app/types/scene";

const Container = styled.div`
  width: fit-content;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 30px;
  width: 100px;
  rotate: -90deg;
  transform-origin: top left;
  border: none;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: ${(props) => props.theme.fontsize.sm};
  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
  position: absolute;
  top: 20%;
  left: -30px;
`;

const ResizeHandle = styled.div`
  width: 20px;
  height: 100%;
  cursor: ew-resize;
  position: absolute;
  left: -20px;
`;

const TabContainer = styled.div<{
  open: boolean;
  drawerwidth: number | string;
}>`
  width: ${(props) => (props.open ? `${props.drawerwidth}px` : "0px")};
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  transition: width 0.3s ease;
  position: relative;
  border-left: 1px solid ${(props) => props.theme.colors.secondary};
  padding-left: ${(props) => (props.open ? "10px" : "0px")};
  padding-right: ${(props) => (props.open ? "10px" : "0px")};
`;

export const ScenesDrawer = () => {
  const {
    isDrawerOpen,
    handleToggleScenesDrawer,
    scenesDrawerWidth,
    handleMouseResizeDown,
  } = useScenesDrawer();

  const { scenes } = useFetchScenes();

  return (
    <Container>
      <TabContainer open={isDrawerOpen} drawerwidth={scenesDrawerWidth}>
        <ResizeHandle onMouseDown={handleMouseResizeDown} />
        <Button onClick={handleToggleScenesDrawer}>Scenes</Button>
        {isDrawerOpen && <ScenesHeader />}
        {scenes?.map((scene: Scene) => (
          <SceneListing key={scene.id} scene={scene} />
        ))}
      </TabContainer>
    </Container>
  );
};
