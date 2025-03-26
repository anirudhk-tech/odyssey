import { useInputClickOut } from "@/lib/common/hooks/useInputClickOut";
import { useEditor } from "@/lib/features/editor/hooks/useEditor";
import { useLoadEditor } from "@/lib/features/editor/hooks/useLoadEditor";
import { useSaveEditor } from "@/lib/features/editor/hooks/useSaveEditor";
import { useRenameSceneFromText } from "@/lib/features/scenes/hooks/useRenameSceneFromText";
import { Editor } from "draft-js";
import { RefObject, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const Title = styled.textarea`
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.md};
  font-weight: 200;
  width: 100%;
  outline: none;
  resize: none;
  height: fit-content;
`;

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 20px;
  padding-left: 2px;
`;

export const TextEditor = () => {
  const {
    editorState,
    setEditorState,
    handleFocusEditor,
    editorRef,
    handleKeyCommand,
    handleTab,
  } = useEditor();
  const { currentScene } = useLoadEditor({ editorState, setEditorState });

  const { handleRenameSceneFromText, sceneName, setSceneName } =
    useRenameSceneFromText({ currentScene });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useInputClickOut({ inputRef, onClickOut: handleRenameSceneFromText });
  useSaveEditor({ editorState });

  return (
    <Container>
      <Title
        ref={inputRef}
        value={sceneName}
        onChange={(e) => setSceneName(e.target.value)}
        rows={1}
      />
      {currentScene && (
        <EditorContainer onClick={handleFocusEditor}>
          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Write your scene here..."
            handleKeyCommand={handleKeyCommand}
            onTab={handleTab}
          />
        </EditorContainer>
      )}
    </Container>
  );
};
