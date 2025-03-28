import { Editor, EditorState, RichUtils } from "draft-js";
import { MutableRefObject } from "react";

export const useToolbar = ({
  editorState,
  setEditorState,
  editorRef,
}: {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  editorRef: MutableRefObject<Editor | null>;
}) => {
  const handleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editorState) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
      editorRef.current?.focus();
    }
  };

  const handleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editorState) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
      editorRef.current?.focus();
    }
  };
  const handleUnderline = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editorState) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
      editorRef.current?.focus();
    }
  };

  return { handleBold, handleItalic, handleUnderline };
};
