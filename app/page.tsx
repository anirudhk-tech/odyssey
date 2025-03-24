"use client";

import styled from "styled-components";
import { BookListing } from "./features/books/book";
import { IoAdd } from "react-icons/io5";
import { useFetchBooks } from "@/lib/features/books/hooks/useFetchBooks";
import { AddBookDialog } from "./features/books/addBookDialog";
import { useAddBook } from "@/lib/features/books/hooks/useAddBook";
import { useMounted } from "@/lib/common/hooks/useMounted";
import { DeleteBookConfirmDialog } from "./features/books/deleteBookConfirmDialog";
import { RenameBookDialog } from "./features/books/renameBookDialog";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  minheight: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  padding-top: 50px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 85%;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: 2rem;
`;

const BooksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  margin-top: 50px;
  padding-left: 8%;
  padding-right: 8%;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  border: none;
  &:active {
    opacity: 0.5;
  }
  cursor: pointer;
`;

export default function HomePage() {
  const { mounted } = useMounted();
  const { books, loading } = useFetchBooks();
  const { toggleDialog } = useAddBook();

  if (!mounted) return null;

  return (
    <Container>
      <RenameBookDialog />
      <AddBookDialog />
      <DeleteBookConfirmDialog />
      <Header>
        {loading || !books ? (
          <Title>Fetching your books...</Title>
        ) : (
          <Title>
            {books.length === 0
              ? "Empty shelf! Ready to write?"
              : "What are you planning on writing today?"}
          </Title>
        )}
        <Button onClick={toggleDialog}>
          <IoAdd size={50} />
        </Button>
      </Header>
      <BooksContainer>
        {loading || !books
          ? Array.from({ length: 1 }).map((_, index) => (
              <BookListing loading key={index} />
            ))
          : books.map((book) => (
              <BookListing key={book.uuid} book={book} loading={false} />
            ))}
      </BooksContainer>
    </Container>
  );
}
