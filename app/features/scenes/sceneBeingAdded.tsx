import { useAutoHighlight } from "@/lib/common/hooks/useAutoHighlight";
import { useInputClickOut } from "@/lib/common/hooks/useInputClickOut";
import { useAddScene } from "@/lib/features/scenes/hooks/useAddScene";
import styled from "styled-components";

const Container = styled.div`
  width: 150px;
  aspect-ratio: 1/1;
  background-color: ${(props) => props.theme.colors.secondary};
  box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const Input = styled.textarea`
  flex: 1;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  outline: none;
  padding: 0 10px;
  text-align: center;
  resize: none;
  overflow: auto;
  word-wrap: break-word;
`;

export const SceneBeingAdded = () => {
  const { inputRef } = useAutoHighlight();
  const { handleAddScene, setSceneName, sceneName } = useAddScene();
  useInputClickOut({ inputRef, onClickOut: handleAddScene });

  return (
    <Container>
      <Input
        ref={inputRef}
        value={sceneName}
        autoFocus
        onChange={(e) => setSceneName(e.target.value)}
      />
    </Container>
  );
};
