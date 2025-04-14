import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../store/booksSlice";
import { useEffect, useState } from "react";
import { MainState } from "@/lib/store";

export const useFetchBooks = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const books = useSelector((state: MainState) => state.books.books);

  const fetchBooks = async () => {
    const response = await window.odysseyAPI.getBooks();
    console.log(response);
    if (response.success) {
      dispatch(setBooks(response.data.books));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading };
};
