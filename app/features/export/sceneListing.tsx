import { Scene } from "@/app/types/scene";
import { useExportScene } from "@/lib/features/export/hooks/useExportScene";
import { MainState } from "@/lib/store";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 0 0 150px;
  width: 150px;
  height: 150px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-5px);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
  }
  cursor: pointer;
  position: relative;
  padding: 1rem;
  z-index: 0;
`;

const Title = styled.span<{ $image_active: boolean; $fill_active: boolean }>`
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
  font-weight: ${(props) => (props.$fill_active ? 600 : 300)};
`;

const SceneColor = styled.div<{
  color: string | null;
  $fullheight: boolean;
}>`
  width: 100%;
  height: ${(props) => (props.$fullheight ? "100%" : "3px")};
  background-color: ${(props) => (props.color ? props.color : "transparent")};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: absolute;
  top: 0;
  z-index: 2;
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

const SelectedBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  opacity: 0.8;
  border-radius: 50px;
  z-index: 3;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const SelectedText = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  font-weight: 600;
  text-align: center;
`;

export const SceneListing = ({ scene }: { scene: Scene }) => {
  const { fillSceneBoxesColor, selected, toggleSelected, order } =
    useExportScene(scene);

  return (
    <Container onClick={toggleSelected}>
      {selected && (
        <SelectedBadge>
          <SelectedText>{order || ""}</SelectedText>
        </SelectedBadge>
      )}
      {scene.imagePath ? (
        <>
          <SceneImage
            src={`images:///${scene.imagePath.replace(/\\/g, "/")}`}
          />
          <Overlay />
          <SceneColor color={scene.color} $fullheight={false} />
        </>
      ) : (
        <SceneColor color={scene.color} $fullheight={fillSceneBoxesColor} />
      )}
      <Title
        $fill_active={fillSceneBoxesColor}
        $image_active={scene.imagePath !== null}
      >
        {scene.title}
      </Title>
    </Container>
  );
};
