import { useEffect, useRef } from "react";

export const useAutoHighlight = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  return { inputRef };
};
