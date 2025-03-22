import { useScenesDrawer } from "@/lib/features/scenes/hooks/useScenesDrawer";
import styled from "styled-components";

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
  height: 20px;
  width: 80px;
  rotate: -90deg;
  border: none;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: 0.6rem;
  transform: translateY(30px);
  margin-top: 50px;
  margin-right: -20px;
  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const ResizeHandle = styled.div`
  width: 20px;
  height: 100%;
  cursor: ew-resize;
`;

const TabContainer = styled.div<{
  open: boolean;
  drawerwidth: number | string;
}>`
  width: ${(props) => (props.open ? `${props.drawerwidth}px` : "0px")};
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  transition: width 0.3s ease;
`;

export const ScenesDrawer = () => {
  const {
    isDrawerOpen,
    handleToggleScenesDrawer,
    scenesDrawerWidth,
    handleMouseResizeDown,
  } = useScenesDrawer();

  return (
    <Container>
      <Button onClick={handleToggleScenesDrawer}>Scenes</Button>
      <ResizeHandle onMouseDown={handleMouseResizeDown} />
      <TabContainer
        open={isDrawerOpen}
        drawerwidth={scenesDrawerWidth}
      ></TabContainer>
    </Container>
  );
};
