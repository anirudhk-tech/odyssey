import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRouting = () => {
  const router = useRouter();

  useEffect(() => {
    window.odysseyAPI.onExportClicked(() => {
      router.push(`/export`);
    });

    window.odysseyAPI.onHomeClicked(() => {
      router.push(`/`);
    });
  }, []);
};
