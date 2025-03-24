import React, { useState } from "react";

export const useMenu = () => {
  const [menuPos, setMenuPos] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const handleMenuOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setMenuPos({ x: e.pageX, y: e.pageY });
  };

  return { menuPos, setMenuPos, handleMenuOpen };
};
