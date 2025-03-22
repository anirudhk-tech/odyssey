import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";

const Container = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const SearchContainer = styled.div`
  width: 80%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 5px 0.1px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  border: none;
  &:active {
    opacity: 0.5;
  }
`;

export const ScenesHeader = () => {
  return (
    <Container>
      <SearchContainer>
        <CiSearch style={{ width: "10%" }} />
        <Input placeholder="Search" />
      </SearchContainer>
      <Button>
        <IoAdd style={{ scale: 1.5 }} />
      </Button>
    </Container>
  );
};
