"use client";

import { useMounted } from "@/lib/common/hooks/useMounted";
import { useExport } from "@/lib/features/export/hooks/useExport";
import styled from "styled-components";
import { DropDown } from "../components/dropdown";
import { SceneListing } from "../features/export/sceneListing";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: hidden;
  scrollbar-width: none;
  padding: 20px;
  gap: 20px;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: 2rem;
`;

const Prompt = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: fit-content;
`;

const SceneSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 50%;
`;

const ScenesContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
  scrollbar-width: thin;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  height: 50px;
  width: fit-content;
  padding: 0 20px;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontsize.sm};
  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
  &:hover {
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
  cursor: pointer;
`;

export default function ExportPage() {
  const { mounted } = useMounted();
  const {
    bookOptions,
    sceneOptions,
    formatOptions,
    format,
    setFormat,
    bookId,
    setBookId,
    selectScenesInNarrativeOrder,
  } = useExport();

  if (!mounted) return null;

  return (
    <Container>
      <Title>Let's get your work exported</Title>
      <FormContainer>
        <DropDown
          options={bookOptions}
          value={bookId}
          onChange={(value) => setBookId(value)}
          label="Select a book"
          placeholder="Select a book"
        />
        <DropDown
          options={formatOptions}
          value={format}
          onChange={(value) => setFormat(value)}
          label="Select a format"
          placeholder="Select a format"
        />
      </FormContainer>
      <SceneSelectionContainer>
        <Prompt>Select the order and scenes you want to export</Prompt>
        <Button onClick={selectScenesInNarrativeOrder}>
          Select All in Narrative Order
        </Button>
        <ScenesContainer>
          {sceneOptions.map((scene) => (
            <SceneListing key={scene.id} scene={scene} />
          ))}
        </ScenesContainer>
      </SceneSelectionContainer>
    </Container>
  );
}
