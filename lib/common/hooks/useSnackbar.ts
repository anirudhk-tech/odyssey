import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../store/snackbarSlice";
import { MainState } from "@/lib/store";

export const useSnackbar = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: MainState) => state.snackbar.message);

  const showSnackbar = (message: string) => {
    dispatch(setMessage(message));
    setTimeout(() => dispatch(clearMessage()), 3000);
  };

  const forceClear = () => dispatch(clearMessage());

  return { showSnackbar, message, forceClear };
};
