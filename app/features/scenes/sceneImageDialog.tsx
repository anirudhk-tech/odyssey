import { Dialog } from "@/app/components/dialog";
import { useSceneImage } from "@/lib/features/scenes/hooks/useSceneImage";
import { GrUpload } from "react-icons/gr";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 20px;
`;

const UploadLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  border: 1px dashed ${(props) => props.theme.colors.text};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const UploadIcon = styled(GrUpload)`
  color: ${(props) => props.theme.colors.text};
  width: 50px;
  height: 50px;
`;

const Prompt = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.md};
`;

export const SceneImageDialog = () => {
  const { sceneImageDialogOpen, toggleDialog, handleUpload } = useSceneImage();

  return (
    <Dialog
      isOpen={sceneImageDialogOpen}
      onClose={toggleDialog}
      customsize="500px"
    >
      <Container>
        <Prompt>Upload an image to be used as a background.</Prompt>
        <UploadLabel onClick={handleUpload}>
          <UploadIcon />
          <Prompt>Click to select</Prompt>
        </UploadLabel>
      </Container>
    </Dialog>
  );
};
