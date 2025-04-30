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

const Container = styled.div<{ $scene_active: boolean }>`
  flex: 0 0 150px;
  width: 150px;
  height: 150px;
  background-color: ${(props) =>
    props.$scene_active
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
      props.$scene_active ? "none" : "translateY(-5px)"};
    box-shadow: ${(props) =>
      props.$scene_active
        ? "inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.2)"
        : "0px 10px 15px rgba(0, 0, 0, 0.3)"};
  }
  box-shadow: ${(props) =>
    props.$scene_active
      ? "inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.2)"
      : "none"};
  cursor: pointer;
  position: relative;
  padding: 1rem;
`;

const Title = styled.span<{ $image_active: boolean }>`
  color: ${(props) =>
    props.$image_active ? "white" : props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  text-align: center;
  z-index: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-shadow: ${(props) =>
    props.$image_active
      ? "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px  0.5px 0 #000, 0.5px  0.5px 0 #000;"
      : "none"};
`;

const SubText = styled.span<{ $image_active: boolean }>`
  color: ${(props) =>
    props.$image_active ? "white" : props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.xs};
  text-align: center;
  z-index: 2;
  text-shadow: ${(props) =>
    props.$image_active
      ? "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px  0.5px 0 #000, 0.5px  0.5px 0 #000;"
      : "none"};
`;

const MenuIcon = styled(HiDotsHorizontal)`
  color: ${(props) => props.theme.colors.text};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 2;
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
  z-index: 2;
  scrollbar-width: none;
`;

const SceneColor = styled.div<{
  color: string | null;
  $fullheight: boolean;
}>`
  width: 100%;
  height: ${(props) => (props.$fullheight ? "100%" : "10px")};
  background-color: ${(props) => (props.color ? props.color : "transparent")};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const SceneImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const TextContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const CountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  border-radius: 0 0 5px 5px;
  z-index: 1;
`;

export const SceneListing = ({ scene }: { scene: Scene }) => {
  const {
    currentSceneId,
    handleSetCurrentSceneId,
    handleMouseEnter,
    handleMouseLeave,
    hovering,
    handleSetSceneToBeEdited,
    fillSceneBoxesColor,
    showWordCount,
    showCharCount,
  } = useScene({ scene });
  const { menuPos, setMenuPos, handleMenuOpen, handleMenuOpenFromIcon } =
    useMenu();
  const { options, toggleSceneRename } = useSceneMenu({ setMenuPos });
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
      onDoubleClick={() => {
        if (sceneToBeEdited === null || sceneToBeEdited.id !== scene.id) {
          handleSetSceneToBeEdited();
          toggleSceneRename();
        }
      }}
      onClick={handleSetCurrentSceneId}
      onContextMenu={(e) => {
        handleMenuOpen(e);
        handleSetSceneToBeEdited();
      }}
      $scene_active={currentSceneId === scene.id}
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
      {scene.imagePath ? (
        <>
          <SceneImage
            src={`images:///${scene.imagePath.replace(/\\/g, "/")}`}
          />
          <Overlay />
        </>
      ) : (
        <SceneColor color={scene.color} $fullheight={fillSceneBoxesColor} />
      )}
      {sceneBeingRenamed &&
      sceneToBeEdited &&
      sceneToBeEdited.id === scene.id ? (
        <Input
          ref={inputRef}
          value={sceneName}
          onChange={(e) => setSceneName(e.target.value)}
          autoFocus
          onPointerDown={(e) => e.stopPropagation()}
        />
      ) : (
        <TextContainer>
          <Title $image_active={scene.imagePath !== null}>{scene.title}</Title>
          <CountContainer>
            {showWordCount && (
              <SubText $image_active={scene.imagePath !== null}>
                {scene.wordCount ?? 0} words
              </SubText>
            )}
            {showCharCount && showWordCount && (
              <SubText $image_active={scene.imagePath !== null}>:</SubText>
            )}

            {showCharCount && (
              <SubText $image_active={scene.imagePath !== null}>
                {scene.charCount ?? 0} chars
              </SubText>
            )}
          </CountContainer>
        </TextContainer>
      )}
    </Container>
  );
};
