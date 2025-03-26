import { useDispatch } from "react-redux";
import { setCurrentBookId } from "../store/currentSlice";
import { useEffect } from "react";

export const useSetCurrent = ({ bookId }: { bookId: string }) => {
  const dispatch = useDispatch();

  const setCurrent = () => dispatch(setCurrentBookId(bookId));

  useEffect(() => {
    setCurrent();
  }, []);
};
