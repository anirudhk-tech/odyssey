import { Editor, EditorState } from "draft-js";
import styled from "styled-components";
import { GrBold } from "react-icons/gr";
import { useToolbar } from "@/lib/features/editor/hooks/useToolbar";
import { GrItalic } from "react-icons/gr";
import { GrUnderline } from "react-icons/gr";
import { MutableRefObject } from "react";
import { EditorSavingIndicator } from "./editorSavingIndicator";

const Container = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
  align-items: center;
  box-shadow: 0px 0px 5px 1.5px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.secondary};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontsize.sm};
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ToolBar = ({
  editorState,
  setEditorState,
  editorRef,
}: {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  editorRef: MutableRefObject<Editor | null>;
}) => {
  const { handleBold, handleItalic, handleUnderline } = useToolbar({
    editorState,
    setEditorState,
    editorRef,
  });
  return (
    <Container>
      <ButtonContainer>
        <Button
          onMouseDown={handleBold}
          $active={editorState.getCurrentInlineStyle().has("BOLD")}
        >
          <GrBold />
        </Button>
        <Button
          onMouseDown={handleItalic}
          $active={editorState.getCurrentInlineStyle().has("ITALIC")}
        >
          <GrItalic />
        </Button>
        <Button
          onMouseDown={handleUnderline}
          $active={editorState.getCurrentInlineStyle().has("UNDERLINE")}
        >
          <GrUnderline />
        </Button>
      </ButtonContainer>
      <EditorSavingIndicator />
    </Container>
  );
};
