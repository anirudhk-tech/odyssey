import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const DialogContent = styled.div<{ customsize?: string }>`
  background: ${(props) => props.theme.colors.primary};
  padding: 2rem;
  border-radius: 8px;
  width: ${(props) => props.customsize || "300px"};
  height: ${(props) => props.customsize || "300px"};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customsize?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  customsize,
  children,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <DialogOverlay onClick={onClose}>
      <DialogContent
        customsize={customsize}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </DialogContent>
    </DialogOverlay>,
    document.body
  );
};
