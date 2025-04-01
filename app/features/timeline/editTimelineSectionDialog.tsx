import { Dialog } from "@/app/components/dialog";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { useOutsideClick } from "@/lib/common/hooks/useClickOut";
import { useEditTimelineSection } from "@/lib/features/timeline/hooks/useEditTimelineSection";

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
  text-align: left;
  width: 100%;
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

const ColorPickerCircle = styled.div<{ color: string }>`
  aspect-ratio: 2/1;
  height: 100%;
  border-radius: 100px;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const HexColorPickerWrapper = styled.div`
  position: absolute;
  top: 25%;
  left: 120%;
`;

export const EditTimelineSectionDialog = () => {
  const {
    error,
    setSectionName,
    handleEditTimelineSection,
    toggleDialog,
    editTimelineSectionDialogOpen,
    colorPickerOpen,
    toggleColorPicker,
    colorPickerRef,
    setColor,
    color,
  } = useEditTimelineSection();
  useOutsideClick(colorPickerRef, toggleColorPicker);

  return (
    <Dialog
      isOpen={editTimelineSectionDialogOpen}
      onClose={toggleDialog}
      customsize="400px"
    >
      <Container>
        <ColorPickerContainer>
          <ColorPickerPrompt>Pick a color:</ColorPickerPrompt>
          <ColorPickerCircle onClick={toggleColorPicker} color={color} />
          {colorPickerOpen && (
            <HexColorPickerWrapper ref={colorPickerRef}>
              <HexColorPicker color={color} onChange={setColor} />
            </HexColorPickerWrapper>
          )}
        </ColorPickerContainer>
        <Prompt>What's the new name?</Prompt>
        <InputContainer>
          <Input onChange={(e) => setSectionName(e.target.value)} />
          <Error>{error}</Error>
        </InputContainer>
        <Button onClick={handleEditTimelineSection}>EDIT</Button>
      </Container>
    </Dialog>
  );
};
