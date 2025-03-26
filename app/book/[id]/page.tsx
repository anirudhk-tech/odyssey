"use client";

import styled from "styled-components";
import { ScenesDrawer } from "@/app/features/scenes/scenesDrawer";
import { TextEditor } from "@/app/features/editor/textEditor";
import { TimelineDrawer } from "@/app/features/timeline/timelineDrawer";
import { useMounted } from "@/lib/common/hooks/useMounted";
import { useRouter } from "next/router";
import { useSetCurrent } from "@/lib/common/hooks/useSetCurrent";
import { useParams } from "next/navigation";
import { DeleteSceneConfirmDialog } from "@/app/features/scenes/deleteSceneConfirmDialog";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export default function EditingPage() {
  const { mounted } = useMounted();
  const params = useParams();
  useSetCurrent({ bookId: params.id as string });

  if (!mounted) return null;

  return (
    <Container>
      <DeleteSceneConfirmDialog />
      <TextEditor />
      <ScenesDrawer />
      <TimelineDrawer />
    </Container>
  );
}
