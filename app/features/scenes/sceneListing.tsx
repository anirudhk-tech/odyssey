import { Menu } from "@/app/components/menu";
import { Scene } from "@/app/types/scene";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { useScene } from "@/lib/features/scenes/hooks/useScene";
import { useSceneMenu } from "@/lib/features/scenes/hooks/useSceneMenu";
import styled from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";
import { useRenameScene } from "@/lib/features/scenes/hooks/useRenameScene";
import { useAutoHighlight } from "@/lib/common/hooks/useAutoHighlight";
import { useInputClickOut } from "@/lib/common/hooks/useInputClickOut";

const Container = styled.div<{ scene_active: "true" | "false" }>`
  flex: 0 0 150px;
  width: 150px;
  height: 150px;
  background-color: ${(props) =>
    props.scene_active === "true"
      ? props.theme.colors.secondary
      : props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    transform: ${(props) =>
      props.scene_active === "true" ? "none" : "translateY(-5px)"};
    box-shadow: ${(props) =>
      props.scene_active === "true"
        ? "inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.2)"
        : "0px 10px 15px rgba(0, 0, 0, 0.3)"};
  }
  box-shadow: ${(props) =>
    props.scene_active === "true"
      ? "inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.2)"
      : "none"};
  cursor: pointer;
  position: relative;
  padding: 1rem;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  text-align: center;
`;

const MenuIcon = styled(HiDotsHorizontal)`
  color: ${(props) => props.theme.colors.text};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Input = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  outline: none;
  padding: 0 10px;
  text-align: center;
  resize: none;
  overflow: auto;
  word-wrap: break-word;
  padding-top: 20px;
`;

const SceneColor = styled.div<{ color: string | null }>`
  width: 100%;
  height: 10px;
  background-color: ${(props) => (props.color ? props.color : "transparent")};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: absolute;
  top: 0;
`;

export const SceneListing = ({ scene }: { scene: Scene }) => {
  const {
    currentSceneId,
    handleSetCurrentSceneId,
    handleMouseEnter,
    handleMouseLeave,
    hovering,
    handleSetSceneToBeEdited,
  } = useScene({ scene });
  const { menuPos, setMenuPos, handleMenuOpen, handleMenuOpenFromIcon } =
    useMenu();
  const { options } = useSceneMenu({ setMenuPos });
  const {
    sceneBeingRenamed,
    sceneToBeEdited,
    handleRenameScene,
    sceneName,
    setSceneName,
  } = useRenameScene();
  const { inputRef } = useAutoHighlight();
  useInputClickOut({ inputRef, onClickOut: handleRenameScene });

  return (
    <Container
      onClick={handleSetCurrentSceneId}
      onContextMenu={(e) => {
        handleMenuOpen(e);
        handleSetSceneToBeEdited();
      }}
      scene_active={currentSceneId === scene.id ? "true" : "false"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Menu menuPos={menuPos} setMenuPos={setMenuPos} options={options} />
      {hovering && (
        <MenuIcon
          onClick={(e) => {
            handleMenuOpenFromIcon(e);
            handleSetSceneToBeEdited();
          }}
        />
      )}
      <SceneColor color={scene.color} />
      {sceneBeingRenamed &&
      sceneToBeEdited &&
      sceneToBeEdited.id === scene.id ? (
        <Input
          ref={inputRef}
          value={sceneName}
          onChange={(e) => setSceneName(e.target.value)}
          autoFocus
        />
      ) : (
        <Title>{scene.title}</Title>
      )}
    </Container>
  );
};
