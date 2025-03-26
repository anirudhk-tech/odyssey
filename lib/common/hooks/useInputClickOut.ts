import { useEffect } from "react";

export const useInputClickOut = ({
  inputRef,
  onClickOut,
}: {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  onClickOut: () => void;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        onClickOut();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputRef, onClickOut]);

  useEffect(() => {
    const inputElem = inputRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        event.preventDefault();
        onClickOut();
      }
    };

    if (inputElem) {
      inputElem.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElem) inputElem.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClickOut]);
};
