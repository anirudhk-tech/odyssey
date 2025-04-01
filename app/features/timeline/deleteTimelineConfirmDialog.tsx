import { Dialog } from "@/app/components/dialog";
import { useDeleteTimeline } from "@/lib/features/timeline/hooks/useDeleteTimeline";
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

export const DeleteTimelineConfirmDialog = () => {
  const {
    deleteTimelineConfirmDialogOpen,
    handleCancel,
    handleDelete,
    toggleDialog,
  } = useDeleteTimeline();

  return (
    <Dialog
      isOpen={deleteTimelineConfirmDialogOpen}
      onClose={toggleDialog}
      customsize="400px"
    >
      <Container>
        <Prompt>
          Deleting a timeline is permanent and the sequence of scenes will be
          lost. The scenes themselves will remain.
        </Prompt>
        <ButtonContainer>
          <Button onClick={handleCancel}>CANCEL</Button>
          <DangerButton onClick={handleDelete}>DELETE</DangerButton>
        </ButtonContainer>
      </Container>
    </Dialog>
  );
};
