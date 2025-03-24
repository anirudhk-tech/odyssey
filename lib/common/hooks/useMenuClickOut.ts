import { useEffect } from "react";

export const useMenuClickOut = (
  menuRef: React.RefObject<HTMLDivElement>,
  setPos: React.Dispatch<
    React.SetStateAction<{ x: number | null; y: number | null }>
  >
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setPos({ x: null, y: null });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
};
