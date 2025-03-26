import React, { useState } from "react";

export const useMenu = () => {
  const [menuPos, setMenuPos] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const handleMenuOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMenuPos({ x: e.pageX, y: e.pageY });
  };

  const handleMenuOpenFromIcon = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setMenuPos({ x: e.pageX, y: e.pageY });
  };

  return { menuPos, setMenuPos, handleMenuOpen, handleMenuOpenFromIcon };
};
