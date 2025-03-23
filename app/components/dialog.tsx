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
  z-index: 1000;
`;

const DialogContent = styled.div<{ customwidth?: string }>`
  background: ${(props) => props.theme.colors.primary};
  padding: 2rem;
  border-radius: 8px;
  min-width: ${(props) => props.customwidth || "300px"};
  aspect-ratio: 1/1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customwidth?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  customwidth,
  children,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <DialogOverlay onClick={onClose}>
      <DialogContent
        customwidth={customwidth}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </DialogContent>
    </DialogOverlay>,
    document.body
  );
};
