import { useState, useEffect, useCallback } from "react";
import api from "../api";
import { Breed } from "../api/breeds/types";
import usePaginatedArray from "./usePaginatedArray";
import useInfiniteScroll from "./useInfiniteScroll";

const useBreeds = () => {
  const { visibleItems, setInitialArray, loadMoreItems, hasMoreItems } =
    usePaginatedArray<Breed>(10);
  const observerRef = useInfiniteScroll(loadMoreItems, hasMoreItems, {});
  const [state, setState] = useState<{
    error: boolean;
    loading: boolean;
  }>({
    error: false,
    loading: false,
  });

  const fetchBreeds = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: false }));
    try {
      const response = await api.breeds.batch.get();

      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      setInitialArray(response.data);
    } catch (e) {
      setInitialArray([]);
      setState((prevState) => ({
        ...prevState,
        error: true,
        loading: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchBreeds();
  }, []);

  return {
    observerRef,
    data: visibleItems,
    error: state.error,
    loading: state.loading,
  };
};

export default useBreeds;
