import { Dialog } from "@/app/components/dialog";
import { useAddTimelineSection } from "@/lib/features/timeline/hooks/useAddTimelineSection";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";

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

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const ColorPickerPrompt = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.md};
`;

const ColorPickerCircle = styled.div`
  aspect-ratio: 2/1;
  height: 100%;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;
`;

export const AddTimelineSectionDialog = () => {
  const {
    error,
    setSectionName,
    addTimelineSectionDialogOpen,
    toggleDialog,
    handleAddTimelineSection,
    colorPickerOpen,
    toggleColorPicker,
    colorPickerRef,
    handlePickColor,
  } = useAddTimelineSection();

  return (
    <Dialog
      isOpen={addTimelineSectionDialogOpen}
      onClose={toggleDialog}
      customsize="400px"
    >
      <Container>
        <ColorPickerContainer>
          <ColorPickerPrompt>Pick a color:</ColorPickerPrompt>
          <ColorPickerCircle onClick={toggleColorPicker} />
          {colorPickerOpen && (
            <HexColorPicker
              style={{ position: "absolute", top: "5%", left: "25%" }}
            />
          )}
        </ColorPickerContainer>
        <Prompt>What do you want to call this section?</Prompt>
        <InputContainer>
          <Input onChange={(e) => setSectionName(e.target.value)} />
          <Error>{error}</Error>
        </InputContainer>
        <Button onClick={handleAddTimelineSection}>CREATE</Button>
      </Container>
    </Dialog>
  );
};
