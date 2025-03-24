import { useMenuClickOut } from "@/lib/common/hooks/useMenuClickOut";
import React, { useRef } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

const Container = styled.div<{
  menupos: { x: number | null; y: number | null };
}>`
  position: fixed;
  top: ${(props) => props.menupos.y}px;
  left: ${(props) => props.menupos.x}px;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 0.5rem;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
  z-index: 100;
  width: fit-content;
`;

const Item = styled.div`
  cursor: pointer;
  width: 100%;
  &:hover {
    font-weight: bold;
  }
`;

export const Menu = ({
  menuPos,
  setMenuPos,
  options,
}: {
  menuPos: { x: number | null; y: number | null };
  setMenuPos: React.Dispatch<
    React.SetStateAction<{ x: number | null; y: number | null }>
  >;
  options: { label: string; onClick: () => void }[];
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useMenuClickOut(menuRef, setMenuPos);

  if (!menuPos || menuPos.x === null || menuPos.y === null) return null;

  return ReactDOM.createPortal(
    <Container ref={menuRef} menupos={menuPos}>
      {options.map((option) => (
        <Item key={option.label} onClick={option.onClick}>
          {option.label}
        </Item>
      ))}
    </Container>,
    document.body
  );
};
