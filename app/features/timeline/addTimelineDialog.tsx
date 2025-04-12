import { Dialog } from "@/app/components/dialog";
import { useAddTimelineSection } from "@/lib/features/timeline/hooks/useAddTimelineSection";
import styled from "styled-components";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useOutsideClick } from "@/lib/common/hooks/useClickOut";
import { useAddTimeline } from "@/lib/features/timeline/hooks/useAddTimeline";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  position: relative;
`;

const Prompt = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.md};
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontsize.md};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.primary};
  outline: none;
`;

const Error = styled.span`
  color: red;
  font-size: ${(props) => props.theme.fontsize.sm};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  gap: 5px;
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

export const AddTimelineDialog = () => {
  const {
    setTimelineName,
    handleAddTimeline,
    addTimelineDialogOpen,
    toggleDialog,
    error,
  } = useAddTimeline();

  return (
    <Dialog
      isOpen={addTimelineDialogOpen}
      onClose={toggleDialog}
      customsize="400px"
    >
      <Container>
        <Prompt>What do you want to call this timeline?</Prompt>
        <InputContainer>
          <Input onChange={(e) => setTimelineName(e.target.value)} />
          <Error>{error}</Error>
        </InputContainer>
        <Button onClick={handleAddTimeline}>CREATE</Button>
      </Container>
    </Dialog>
  );
};
