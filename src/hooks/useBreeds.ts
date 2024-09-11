import { useState, useEffect, useCallback } from "react";
import api from "../api";
import { Breed } from "../api/breeds/types";

const useBreeds = () => {
  const [state, setState] = useState<{
    data: Breed[];
    error: boolean;
    loading: boolean;
  }>({
    data: [],
    error: false,
    loading: false,
  });

  const fetchBreeds = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: false }));
    try {
      const response = await api.breeds.batch.get();

      setState((prevState) => ({
        ...prevState,
        data: response.data,
        loading: false,
      }));
    } catch (e) {
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
    data: state.data,
    error: state.error,
    loading: state.loading,
  };
};

export default useBreeds;
