import { Dialog } from "@/app/components/dialog";
import { useDeleteBook } from "@/lib/features/books/hooks/useDeleteBook";
import { useDeleteScene } from "@/lib/features/scenes/hooks/useDeleteScene";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Prompt = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.md};
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  aspect-ratio: 3/1;
  width: 130px;
  border: none;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontsize.sm};
  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
  cursor: pointer;
`;

const DangerButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.danger};
`;

export const DeleteSceneConfirmDialog = () => {
  const {
    toggleDialog,
    deleteSceneConfirmDialogOpen,
    handleCancel,
    handleDeleteScene,
  } = useDeleteScene();

  return (
    <Dialog
      isOpen={deleteSceneConfirmDialogOpen}
      onClose={toggleDialog}
      customsize="400px"
    >
      <Container>
        <Prompt>
          Deleting a scene is permanent and will erase all text within.
        </Prompt>
        <ButtonContainer>
          <Button onClick={handleCancel}>CANCEL</Button>
          <DangerButton onClick={handleDeleteScene}>DELETE</DangerButton>
        </ButtonContainer>
      </Container>
    </Dialog>
  );
};
