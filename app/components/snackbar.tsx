import { useMounted } from "@/lib/common/hooks/useMounted";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import React from "react";
import styled from "styled-components";

const SnackbarContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #323232;
  color: #fff;
  padding: 16px 24px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  &.visible {
    opacity: 1;
  }
  cursor: pointer;
  z-index: 9999;
`;

export const Snackbar = () => {
  const { message, forceClear } = useSnackbar();
  const { mounted } = useMounted();

  if (!message || !mounted) return null;

  return (
    <SnackbarContainer
      onClick={forceClear}
      className={message ? "visible" : ""}
    >
      {message}
    </SnackbarContainer>
  );
};
