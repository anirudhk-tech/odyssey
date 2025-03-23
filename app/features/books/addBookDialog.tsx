import { Dialog } from "@/app/components/dialog";
import { useAddBook } from "@/lib/features/books/hooks/useAddBook";

export const AddBookDialog = () => {
  const { addBookDialogOpen, toggleDialog } = useAddBook();

  return (
    <Dialog
      isOpen={addBookDialogOpen}
      onClose={toggleDialog}
      customwidth="400px"
    >
      <></>
    </Dialog>
  );
};
