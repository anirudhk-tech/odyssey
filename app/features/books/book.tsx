import styled, { keyframes } from "styled-components";
import { Menu } from "../../components/menu";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { Book } from "@/app/types/book";
import { useBookMenu } from "@/lib/features/books/hooks/useBookMenu";
import { useRouter } from "next/navigation";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 200px;
  aspect-ratio: 1/1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-5px);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
  }
  cursor: pointer;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  text-align: center;
`;

const shimmer = keyframes`
  0% {
  background-position: -200% 0;
  }
  100% {
  background-position: 200% 0;
  }
`;

const Loading = styled(Container)`
  background: linear-gradient(90deg, #ffffff 25%, #f0f0f0 50%, #ffffff 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 3s infinite linear;
`;

export const BookListing = ({
  book,
  loading,
}: {
  book?: Book;
  loading: boolean;
}) => {
  const { menuPos, setMenuPos, handleMenuOpen } = useMenu();
  const { options } = useBookMenu(book);
  const router = useRouter();

  if (loading || !book) {
    return <Loading></Loading>;
  } else {
    return (
      <Container
        onClick={() => router.push(`/book/${book.uuid}`)}
        onContextMenu={handleMenuOpen}
      >
        <Menu menuPos={menuPos} setMenuPos={setMenuPos} options={options} />
        <Title>{book.title}</Title>
      </Container>
    );
  }
};
