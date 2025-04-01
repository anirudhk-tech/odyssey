import { Dialog } from "@/app/components/dialog";
import { useAddBook } from "@/lib/features/books/hooks/useAddBook";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 50px;
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

export const AddBookDialog = () => {
  const { addBookDialogOpen, toggleDialog, handleAddBook, error, setBookName } =
    useAddBook();
  return (
    <Dialog
      isOpen={addBookDialogOpen}
      onClose={toggleDialog}
      customsize="400px"
    >
      <Container>
        <Prompt>New book. What are you calling it?</Prompt>
        <InputContainer>
          <Input onChange={(e) => setBookName(e.target.value)} />
          <Error>{error}</Error>
        </InputContainer>
        <Button onClick={handleAddBook}>CREATE</Button>
      </Container>
    </Dialog>
  );
};
