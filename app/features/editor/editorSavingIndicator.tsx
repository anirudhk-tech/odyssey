import { MainState } from "@/lib/store";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const Text = styled.span`
  font-size: ${(props) => props.theme.fontsize.sm};
  color: ${(props) => props.theme.colors.text};
`;

const Indicator = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-top-color: ${(props) => props.theme.colors.secondary};
  border-radius: 50%;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 3s linear infinite;
`;

export const EditorSavingIndicator = () => {
  const editorSaving = useSelector(
    (state: MainState) => state.editor.editorSaving
  );

  if (editorSaving) {
    return (
      <Container>
        <Text>Saving...</Text>
        <Indicator />
      </Container>
    );
  } else {
    return null;
  }
};
