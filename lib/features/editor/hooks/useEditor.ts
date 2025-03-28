import { DraftModel, Editor, EditorState, Modifier, RichUtils } from "draft-js";
import { useRef, useState } from "react";
import { convertPasted } from "@/lib/utils/editorUtils";

export const useEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const editorRef = useRef<Editor | null>(null);

  const handleFocusEditor = () => {
    if (editorRef.current) editorRef.current.focus();
  };

  const handleKeyCommand = (
    command: DraftModel.Constants.DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleTab = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const tabCharacter = "\t";
    const newContent = Modifier.insertText(
      currentContent,
      selection,
      tabCharacter
    );
    setEditorState(
      EditorState.push(editorState, newContent, "insert-characters")
    );
  };

  const handlePastedText = (
    text: string,
    html: string | undefined,
    editorState: EditorState
  ) => {
    if (html) {
      console.log(html);
      const contentState = convertPasted(html);
      const newState = EditorState.push(
        editorState,
        contentState,
        "insert-fragment"
      );

      if (newState) {
        setEditorState(newState);
        return "handled";
      }
    }
    return "not-handled";
  };

  return {
    editorState,
    setEditorState,
    editorRef,
    handleFocusEditor,
    handleKeyCommand,
    handleTab,
    handlePastedText,
  };
};
